import { Dev } from "@ctypes/dev.template";
import { folderNameFromPath, groupStyles } from "./style";
import { colorSeparator, to255 } from "./color";
import simpleColorConverter from 'simple-color-converter';
import { objectToArray, roundObjectFloat } from "./utils";
import { checkContrast } from "./shade.helper";
import { groupFont } from "./font.back";
import { TextArrayItem } from "@ctypes/text";
import { convertFontWeight, convertUnit } from "./font";

const TEXT_STYLES: Record<string, { fontName: FontName, fontSize: number }> = {
    header: {
        fontName: { family: 'Inter', style: 'Medium' },
        fontSize: 24
    },
    body: {
        fontName: { family: 'Inter', style: 'Regular' },
        fontSize: 14
    },
    caption: {
        fontName: { family: 'Inter', style: 'Regular' },
        fontSize: 10
    },
    footnote_1: {
        fontName: { family: 'Inter', style: 'Regular' },
        fontSize: 8
    },
    footnote_2: {
        fontName: { family: 'Inter', style: 'Regular' },
        fontSize: 6
    }
};

const COLOR_STYLES: Record<string, Paint[]> = {
    transparent: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }],
    black: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
    grey: [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }]
};


const Layout = {
    header: ({ text }: { text: string }) => {
        const header = figma.createText();
        header.characters = text;
        header.fontSize = TEXT_STYLES.header.fontSize;
        header.fontName = TEXT_STYLES.header.fontName;
        return header;
    },
    body: ({ text }: { text: string }) => {
        const body = figma.createText();
        body.characters = text;
        body.fontSize = TEXT_STYLES.body.fontSize;
        body.fontName = TEXT_STYLES.body.fontName;
        return body;
    },
    footnote1: ({ text }: { text: string }) => {
        const ft = figma.createText();
        ft.characters = text;
        ft.fontSize = TEXT_STYLES.footnote_1.fontSize;
        ft.fontName = TEXT_STYLES.footnote_1.fontName;
        return ft;
    },
    footnote2: ({ text }: { text: string }) => {
        const ft = figma.createText();
        ft.characters = text;
        ft.fontSize = TEXT_STYLES.footnote_2.fontSize;
        ft.fontName = TEXT_STYLES.footnote_2.fontName;
        return ft;
    },
    caption: ({ text }: { text: string }) => {
        const cp = figma.createText();
        cp.characters = text;
        cp.fontSize = TEXT_STYLES.caption.fontSize;
        cp.fontName = TEXT_STYLES.caption.fontName;
        return cp;
    },
    frame: ({ layout, name, itemSpacing, center, padding, radius }: { layout: 'HORIZONTAL' | 'VERTICAL'; name: string; center?: boolean; itemSpacing: number; padding?: Array<number>, radius?: Array<number> }) => {
        const frame = figma.createFrame();
        frame.layoutMode = layout;
        frame.layoutSizingHorizontal = 'HUG';
        frame.layoutSizingVertical = 'HUG';
        frame.name = name;
        frame.itemSpacing = itemSpacing;
        if (center) {
            frame.counterAxisAlignItems = 'CENTER';
        }
        if (padding) {
            frame.paddingTop = padding[0];
            frame.paddingRight = padding[1];
            frame.paddingBottom = padding[2];
            frame.paddingLeft = padding[3];
        }
        if (radius) {
            frame.topLeftRadius = radius[0];
            frame.topRightRadius = radius[1];
            frame.bottomRightRadius = radius[2];
            frame.bottomLeftRadius = radius[3];
        }
        return frame;
    }

}

export async function exportPaintSet({ payload }: { payload: Dev }) {

    const { folder, config } = payload;
    if (!folder) { return; }

    const groupedStyles = groupStyles(folder);

    //preload needed fonts;
    const fontsLoad: Array<Promise<void>> = [];
    Object.keys(TEXT_STYLES).forEach((key: string) => fontsLoad.push(figma.loadFontAsync(TEXT_STYLES[key].fontName)));
    await Promise.all(fontsLoad);


    //Generate swatch
    const masterFrame = Layout.frame({
        name: 'Palettes',
        layout: (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL',
        itemSpacing: 0
    });


    Object.keys(groupedStyles).forEach(async (key: string) => {

        console.log(`Generating ${key} swatch...`);

        //create parent frame
        const parentFrame = Layout.frame({
            name: key,
            itemSpacing: 24,
            layout: 'VERTICAL',
            padding: [24, 24, 24, 24]
        });

        //create header
        const header = Layout.header({ text: key });

        //generate swatches
        const swatchGroupFrame = Layout.frame({
            name: 'swatch-group-frame',
            layout: (config?.layout === 'Column') && 'VERTICAL' || 'HORIZONTAL',
            itemSpacing: 16
        });

        groupedStyles[key].forEach((style, i) => {

            const styleName = folderNameFromPath(style.name).name || style.name;

            //parent
            const swatchFrame = Layout.frame({
                name: `powerui-${styleName.replace(' ', '-')}-palette`,
                layout: (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL',
                itemSpacing: 16,
            })

            //child 1
            const colorFrame = figma.createFrame();

            //child 2
            const detailFrame = Layout.frame({
                name: `powerui-detail-${styleName}-${i}`,
                layout: 'VERTICAL',
                itemSpacing: 6
            });

            const contrastFrame = Layout.frame({
                name: `powerui-contrast-${styleName}-${i}`,
                layout: 'VERTICAL',
                itemSpacing: 3,
                padding: [6, 6, 6, 6]
            });

            //1. set Color Frame
            //apply border radius to color
            if (config?.swatchBorderRadius) {
                const border = Number(config?.swatchBorderRadius);
                colorFrame.bottomRightRadius = border;
                colorFrame.bottomLeftRadius = border;
                colorFrame.topLeftRadius = border;
                colorFrame.topRightRadius = border;
            }

            //apply color background
            const styleColor = ((style as PaintStyle).paints[0] as SolidPaint).color || { r: 0, g: 0, b: 0 };

            colorFrame.name = `powerui-color-${styleName}-${i}`
            colorFrame.fills = [{ type: 'SOLID', color: styleColor }];
            colorFrame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 }, opacity: 0.5 }];

            colorFrame.appendChild(contrastFrame);

            //1.1 set contrast
            contrastFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];

            const contrastBubble = ({ color, ratio, large, regular }: { color: RGB, ratio: number; large: string | undefined; regular: string | undefined; }) => {
                const contrastFrame = Layout.frame({
                    name: 'contrast-frame',
                    layout: 'HORIZONTAL',
                    center: true,
                    itemSpacing: 3,
                    padding: [2, 4, 2, 4],
                    radius: [30, 30, 30, 30]
                });

                contrastFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.8 }];


                const swatch = figma.createEllipse();
                swatch.resize(10, 10);
                swatch.fills = [{ type: 'SOLID', color }];
                swatch.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];

                const ratioText = Layout.footnote1({ text: String(ratio) });

                contrastFrame.appendChild(swatch);
                contrastFrame.appendChild(ratioText);

                if (large) {
                    const AAA = Layout.footnote1({ text: 'AAA' });
                    contrastFrame.appendChild(AAA);
                }

                if (regular) {
                    const AA = Layout.footnote1({ text: 'AA' });
                    contrastFrame.appendChild(AA);
                }


                return contrastFrame;
            }

            const hexColor = `#${new simpleColorConverter({ rgb: to255(styleColor), to: 'hex' }).color}`
            const { black, white } = checkContrast(hexColor);

            contrastFrame.appendChild(contrastBubble({ color: { r: 0, g: 0, b: 0 }, ...black }));
            contrastFrame.appendChild(contrastBubble({ color: { r: 1, g: 1, b: 1 }, ...white }));

            //2. set details
            const colorName = Layout.body({ text: styleName });

            detailFrame.appendChild(colorName);

            //set color values detail
            const colorFormat = {
                'rgb': (color: any) => objectToArray(roundObjectFloat(color)),
                'hsl': (color: any) => objectToArray(roundObjectFloat(color)),
                'cmyk': (color: any) => objectToArray(roundObjectFloat(color)),
                'hex': (color: any) => `#${color}`,
                'pantone': (color: any) => color
            };

            //2.1 set color details
            const colorDetailGroup = Layout.frame({
                name: 'color-detail-frame',
                layout: 'VERTICAL',
                itemSpacing: 3
            });

            detailFrame.appendChild(colorDetailGroup);
            colorDetailGroup.layoutSizingHorizontal = 'FILL';

            Object.keys(colorFormat).forEach(format => {
                if (config && !!config[format as keyof typeof config]) {

                    const colorFormatFrame = figma.createFrame();
                    //Add detail to detail
                    colorDetailGroup.appendChild(colorFormatFrame);
                    colorFormatFrame.layoutMode = 'HORIZONTAL';
                    colorFormatFrame.layoutSizingVertical = 'HUG';
                    colorFormatFrame.primaryAxisAlignItems = 'SPACE_BETWEEN';
                    colorFormatFrame.layoutSizingHorizontal = 'FILL';

                    const { color } = new simpleColorConverter({ rgb: to255(styleColor), to: format });

                    //convert object {r,g,b} to array
                    let arrayColor = colorFormat[format as keyof typeof colorFormat](color);
                    //add separator
                    arrayColor = colorSeparator(arrayColor, (config.colorSeparator || 'White space'), format);

                    //color name (hex/rgb...)
                    const colorName = Layout.footnote1({ text: (format === 'pantone') ? 'Pantone' : format.toUpperCase() });
                    colorName.fills = COLOR_STYLES.grey;

                    //color value
                    const colorCode = Layout.footnote1({ text: arrayColor });
                    colorCode.fills = COLOR_STYLES.grey;

                    //Render color format frame
                    colorFormatFrame.appendChild(colorName);
                    colorFormatFrame.appendChild(colorCode);




                }
            });


            //3. append and set layout
            swatchFrame.appendChild(colorFrame);
            swatchFrame.appendChild(detailFrame);


            //adjust colo frame size depending on direction
            switch (config?.layout) {
                case 'Row':
                    colorFrame.resize(160, 90);
                    colorFrame.layoutSizingHorizontal = 'FILL';
                    break;
                case 'Column':
                default:
                    colorFrame.resize(160, 30);
                    colorFrame.layoutSizingVertical = 'FILL';
            }


            //add up to group
            swatchGroupFrame.appendChild(swatchFrame);
        });

        parentFrame.appendChild(header);
        parentFrame.appendChild(swatchGroupFrame);
        masterFrame.appendChild(parentFrame);

    });

    figma.closePlugin();

}



export async function exportTextSet({ payload }: { payload: Dev }) {

    const { folder, config } = payload;
    if (!folder) { return; }

    const groupedStyles = groupStyles(folder);

    //Get unique fonts families and unique weight
    let uniqueFonts: { [key: string]: TextArrayItem } = {};
    Object.keys(groupedStyles).forEach(key => {
        const fontNames = groupedStyles[key as keyof typeof groupedStyles].map((item) => ({ fontName: (item as TextStyle).fontName }));
        const group = groupFont(fontNames);
        for (let g in group) {
            if (uniqueFonts[g]) {
                //append styles to existing object
                uniqueFonts[g].style = [...new Set([...uniqueFonts[g].style, ...group[g].style])];
            } else {
                //create new entry
                uniqueFonts = { ...uniqueFonts, ...group };
            }
        }
    });

    //preload fonts
    const fontsLoad: Array<Promise<void>> = [];
    //load default layout fonts
    Object.keys(TEXT_STYLES).forEach((key: string) => fontsLoad.push(figma.loadFontAsync(TEXT_STYLES[key].fontName)));
    //load styles custom fonts
    Object.keys(uniqueFonts).forEach((key: string) => {
        const currentFont = uniqueFonts[key as keyof typeof uniqueFonts];
        //load styles one by one
        currentFont.style.forEach(style => fontsLoad.push(figma.loadFontAsync({ family: currentFont.family, style })));
    });
    await Promise.all(fontsLoad);


    /* 
    * Draw
    */
    const DETAILS_WIDTH = 135;
    const masterFrame = Layout.frame({
        name: 'Font sets',
        layout: 'HORIZONTAL',
        itemSpacing: 0,
    });

    const fontFamilyHierarchy = ['Primary', 'Secondary', 'Tertiary'];
    Object.keys(uniqueFonts).forEach((uniqueFont, i) => {

        const fontGroup = Layout.frame({
            name: 'font-group-frame',
            padding: [24, 24, 24, 24],
            itemSpacing: 32,
            layout: 'VERTICAL'
        });

        //----------Set font families
        if (config?.fontFamily) {
            const fontFamilyFrame = Layout.frame({
                layout: 'VERTICAL',
                itemSpacing: 12,
                name: 'font-family-frame'
            });

            const fontFamilyHeader = Layout.header({ text: 'Font Family' });
            fontFamilyFrame.appendChild(fontFamilyHeader);

            const fontFrame = Layout.frame({
                layout: 'HORIZONTAL',
                itemSpacing: 0,
                name: 'font-frame',
                center: true
            });

            //Set font label
            const fontLabel = figma.createText();
            fontLabel.fontSize = 32;
            fontLabel.fontName = { family: uniqueFont, style: 'Regular' };
            fontLabel.characters = uniqueFont;

            //Set font detail
            const fontDetail = Layout.frame({
                name: 'font-detail',
                itemSpacing: 3,
                layout: 'VERTICAL'
            });

            fontDetail.resize(DETAILS_WIDTH, 30);

            const fontDetailTop = figma.createText();
            const fontDetailBottom = figma.createText();

            fontDetailTop.fontSize = TEXT_STYLES.footnote_1.fontSize;
            fontDetailTop.fontName = TEXT_STYLES.footnote_1.fontName;
            fontDetailTop.characters = `Font Family ${(fontFamilyHierarchy[i] || '')}`;
            fontDetailTop.fills = COLOR_STYLES.grey;

            fontDetailBottom.fontSize = TEXT_STYLES.footnote_1.fontSize;
            fontDetailBottom.fontName = TEXT_STYLES.footnote_1.fontName;
            fontDetailBottom.characters = uniqueFont;
            fontDetailBottom.fills = COLOR_STYLES.grey;

            fontDetail.appendChild(fontDetailTop);
            fontDetail.appendChild(fontDetailBottom);

            fontFrame.appendChild(fontDetail);
            fontFrame.appendChild(fontLabel);

            fontFamilyFrame.appendChild(fontFrame);
            fontGroup.appendChild(fontFamilyFrame);

        }

        //----------Set font Weight
        if (config?.fontWeight) {
            const fontWeightFrame = Layout.frame({
                name: 'font-weight-frame',
                itemSpacing: 12,
                layout: 'VERTICAL'
            });

            const fontWeightHeader = Layout.header({ text: 'Font Weight' });
            fontWeightFrame.appendChild(fontWeightHeader);

            uniqueFonts[uniqueFont].style.forEach(style => {

                const styleFrame = Layout.frame({
                    name: 'style-frame',
                    itemSpacing: 0,
                    layout: 'HORIZONTAL',
                    center: true
                });

                const styleLabel = figma.createText();
                styleLabel.fontSize = 32;
                styleLabel.fontName = { family: uniqueFont, style: style };
                styleLabel.characters = style;

                const styleDetailFrame = Layout.frame({
                    name: 'style-detail-frame',
                    itemSpacing: 3,
                    layout: 'VERTICAL'
                });
                styleDetailFrame.resize(DETAILS_WIDTH, 30);

                const styleDetailTop = Layout.footnote1({ text: `Font Weight ${style}` });
                styleDetailTop.fills = COLOR_STYLES.grey;

                const styleDetailBottom = Layout.footnote1({ text: convertFontWeight(style) });
                styleDetailBottom.fills = COLOR_STYLES.grey;

                //add details
                styleDetailFrame.appendChild(styleDetailTop);
                styleDetailFrame.appendChild(styleDetailBottom);

                styleFrame.appendChild(styleDetailFrame);
                styleFrame.appendChild(styleLabel);

                fontWeightFrame.appendChild(styleFrame);
            });

            fontGroup.appendChild(fontWeightFrame);
        }



        //----------Set font size
        const fontSizeFrame = Layout.frame({
            name: 'font-size-frame',
            itemSpacing: 24,
            layout: 'VERTICAL'
        });

        const fontSizeHeader = Layout.header({ text: 'Font Size' });
        fontSizeFrame.appendChild(fontSizeHeader);

        fontGroup.appendChild(fontSizeFrame);

        console.log(uniqueFont, uniqueFonts[uniqueFont], groupedStyles);

        function generateStyleFrame(style: TextStyle) {

            const { fontName, fontSize } = style as TextStyle;
            const letterSpacing = roundObjectFloat((style as TextStyle).letterSpacing);
            const lineHeight = roundObjectFloat((style as TextStyle).lineHeight);

            const styleFrame = Layout.frame({
                name:'style-frame',
                layout:'HORIZONTAL',
                itemSpacing:0,
                center:true
            });

            const styleLabel = figma.createText();
            styleLabel.fontSize = fontSize;
            styleLabel.fontName = fontName;
            styleLabel.letterSpacing = letterSpacing;
            styleLabel.lineHeight = lineHeight;
            styleLabel.characters = folderNameFromPath(style.name).name;

            const styleDetailFrame = Layout.frame({
                name:'style-detail-frame',
                layout:'VERTICAL',
                itemSpacing:3
            })
            styleDetailFrame.resize(DETAILS_WIDTH, 30);

            const styleDetailTop = Layout.footnote1({ text: `${fontSize} px` });
            styleDetailTop.fills = COLOR_STYLES.grey;


            const styleDetailBottomFrame = Layout.frame({
                name: 'style-detail-bottom-frame',
                layout: 'HORIZONTAL',
                itemSpacing: 12
            });

            const lineHeightText = Layout.footnote1({ text: `↕ ${((lineHeight as any).value && (lineHeight as any).value + ' ') || ''}${convertUnit(lineHeight.unit)}` });
            lineHeightText.fills = COLOR_STYLES.grey;

            const letterSpacingText = Layout.footnote1({ text: `↔ ${letterSpacing.value} ${convertUnit(letterSpacing.unit)}` });
            letterSpacingText.fills = COLOR_STYLES.grey;

            styleDetailBottomFrame.appendChild(lineHeightText);
            styleDetailBottomFrame.appendChild(letterSpacingText);
            //add details
            styleDetailFrame.appendChild(styleDetailTop);
            styleDetailFrame.appendChild(styleDetailBottomFrame);

            styleFrame.appendChild(styleDetailFrame);
            styleFrame.appendChild(styleLabel);

            return styleFrame;

        }

        Object.keys(groupedStyles).forEach((fam, i) => {

            const groupStyleFrame = Layout.frame({
                name: `group-font-${fam}-${i}`,
                layout: 'VERTICAL',
                itemSpacing: 6
            });

            groupedStyles[fam].forEach(style => {


            });

            //groupStyleFrame.appendChild(styleFrame);

            fontSizeFrame.appendChild(groupStyleFrame);
        });


        masterFrame.appendChild(fontGroup);
    });






    //Set font sizes



    //Draw



}