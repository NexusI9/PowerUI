import { Dev } from "@ctypes/dev.template";
import { folderNameFromPath, groupStyles } from "./style";
import { colorSeparator, to255 } from "./color";
import simpleColorConverter from 'simple-color-converter';
import { mapKeys, objectToArray, roundObjectFloat } from "./utils";
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
    grey: [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }],
    lightGrey: [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7 } }]
};


const Layout = {
    header: ({ text }: { text: string; }) => {
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
    },
    color: ({ color, opacity = 1 }: { color: RGB, opacity?: number }): Paint[] => {
        return [{ type: 'SOLID', color, opacity }];
    },
    label: (props: Partial<TextSublayerNode>) => {
        const label = figma.createText();
        mapKeys(props, label);
        return label;
    },
    underline({ node, layout }: { node: TextNode | FrameNode; layout: 'VERTICAL' | 'HORIZONTAL' }) {

        const box = Layout.frame({
            name: `${node.name}-box`,
            layout,
            itemSpacing: 0,
            padding: [0, 0, 6, 0],
            center: true
        });
        box.appendChild(node);
        node.layoutSizingHorizontal = 'FILL';
        node.layoutSizingVertical = 'FILL';

        box.strokeWeight = 0;
        box.strokes = COLOR_STYLES.lightGrey;
        box.strokeBottomWeight = 1;

        return box;
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
        masterFrame.appendChild(parentFrame);


        //create header
        const header = Layout.header({ text: key });
        const boxColorName = Layout.underline({ node: header, layout: 'HORIZONTAL' });
        parentFrame.appendChild(boxColorName);
        boxColorName.layoutSizingHorizontal = 'FILL';

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
                name: `${styleName.replace(' ', '-')}-palette`,
                layout: (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL',
                itemSpacing: 6,
            })

            //child 1
            const colorFrame = figma.createFrame();

            //child 2
            const detailFrame = Layout.frame({
                name: `color-detail-${styleName}-${i}`,
                layout: 'VERTICAL',
                itemSpacing: 6
            });

            const contrastFrame = Layout.frame({
                name: `color-contrast-${styleName}-${i}`,
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

            colorFrame.name = `color-${styleName}-detail-frame-${i}`
            colorFrame.fills = Layout.color({ color: styleColor });
            colorFrame.strokes = Layout.color({ color: { r: 0.9, g: 0.9, b: 0.9 }, opacity: 0.5 });

            colorFrame.appendChild(contrastFrame);

            //1.1 set contrast
            contrastFrame.fills = Layout.color({ color: { r: 0, g: 0, b: 0 }, opacity: 0 });

            const contrastBubble = ({ color, ratio, large, regular }: { color: RGB, ratio: number; large: string | undefined; regular: string | undefined; }) => {
                const contrastFrame = Layout.frame({
                    name: 'contrast-frame',
                    layout: 'HORIZONTAL',
                    center: true,
                    itemSpacing: 3,
                    padding: [2, 4, 2, 4],
                    radius: [30, 30, 30, 30]
                });

                contrastFrame.fills = Layout.color({ color: { r: 1, g: 1, b: 1 }, opacity: 0.8 });


                const swatch = figma.createEllipse();
                swatch.resize(10, 10);
                swatch.fills = Layout.color({ color });
                swatch.strokes = Layout.color({ color: { r: 0.9, g: 0.9, b: 0.9 } });

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
                    colorFrame.resize(120, 90);
                    detailFrame.layoutSizingHorizontal = 'FILL';
                    break;
                case 'Column':
                default:
                    colorFrame.resize(120, 30);
                    colorFrame.layoutSizingVertical = 'FILL';
            }


            //add up to group
            swatchGroupFrame.appendChild(swatchFrame);

        });


        parentFrame.appendChild(swatchGroupFrame);
        swatchGroupFrame.layoutSizingHorizontal = 'FIXED';
        parentFrame.layoutSizingHorizontal = 'HUG';

    });

    figma.viewport.scrollAndZoomIntoView([masterFrame]);
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
        itemSpacing: 32,
    });

    const fontFamilyHierarchy = ['Primary', 'Secondary', 'Tertiary'];
    Object.keys(uniqueFonts).forEach((uniqueFont, i) => {

        const fontGroup = Layout.frame({
            name: 'font-group-frame',
            padding: [24, 24, 24, 24],
            itemSpacing: 32,
            layout: 'VERTICAL'
        });
        masterFrame.appendChild(fontGroup);


        //----------Set font families
        if (config?.fontFamily) {
            const fontFamilyFrame = Layout.frame({
                name: 'font-family-frame',
                layout: 'VERTICAL',
                itemSpacing: 12
            });

            const fontFamilyHeader = Layout.header({ text: 'Font Family' });
            const boxFontFamily = Layout.underline({ node: fontFamilyHeader, layout: 'HORIZONTAL' });
            fontFamilyFrame.appendChild(boxFontFamily);
            boxFontFamily.layoutSizingHorizontal = 'FILL';


            const fontFrame = Layout.frame({
                layout: 'HORIZONTAL',
                itemSpacing: 0,
                name: 'font-frame',
                center: true
            });

            //Set font label
            const fontLabel = Layout.label({
                fontSize: 32,
                fontName: { family: uniqueFont, style: 'Regular' },
                characters: uniqueFont
            });


            //Set font detail
            const fontDetail = Layout.frame({
                name: 'font-detail',
                itemSpacing: 3,
                layout: 'VERTICAL'
            });

            fontDetail.resize(DETAILS_WIDTH, 30);

            const fontDetailTop = Layout.footnote1({ text: `Font Family ${(fontFamilyHierarchy[i] || '')}` });
            const fontDetailBottom = Layout.footnote1({ text: uniqueFont });
            fontDetailTop.fills = COLOR_STYLES.grey;
            fontDetailBottom.fills = COLOR_STYLES.grey;

            fontDetail.appendChild(fontDetailTop);
            fontDetail.appendChild(fontDetailBottom);

            fontFrame.appendChild(fontDetail);
            fontFrame.appendChild(fontLabel);

            fontFamilyFrame.appendChild(fontFrame);
            fontGroup.appendChild(fontFamilyFrame);
            fontFamilyFrame.layoutSizingHorizontal = 'FILL';

        }

        //----------Set font Weight
        if (config?.fontWeight) {
            const fontWeightFrame = Layout.frame({
                name: 'font-weight-frame',
                itemSpacing: 12,
                layout: 'VERTICAL'
            });

            const fontWeightHeader = Layout.header({ text: 'Font Weight' });
            const boxFontWeight = Layout.underline({ node: fontWeightHeader, layout: 'HORIZONTAL' });
            fontWeightFrame.appendChild(boxFontWeight);
            boxFontWeight.layoutSizingHorizontal = 'FILL';


            uniqueFonts[uniqueFont].style.forEach(style => {

                const styleFrame = Layout.frame({
                    name: 'style-frame',
                    itemSpacing: 0,
                    layout: 'HORIZONTAL',
                    center: true
                });

                const styleLabel = Layout.label({
                    fontSize: 32,
                    fontName: { family: uniqueFont, style: style },
                    characters: style
                });

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
            fontWeightFrame.layoutSizingHorizontal = 'FILL';
        }



        //----------Set font size
        const fontSizeFrame = Layout.frame({
            name: 'font-size-frame',
            itemSpacing: 24,
            layout: 'VERTICAL'
        });

        //Set header + underline
        const fontSizeHeader = Layout.header({ text: 'Font Size' });
        const boxFontSize = Layout.underline({ node: fontSizeHeader, layout: 'HORIZONTAL' });
        fontSizeFrame.appendChild(boxFontSize);
        boxFontSize.layoutSizingHorizontal = 'FILL';

        fontGroup.appendChild(fontSizeFrame);
        fontSizeFrame.layoutSizingHorizontal = 'FILL';

        function generateSizeSection(style: TextStyle) {

            const { fontName, fontSize } = style as TextStyle;
            const letterSpacing = roundObjectFloat((style as TextStyle).letterSpacing);
            const lineHeight = roundObjectFloat((style as TextStyle).lineHeight);

            const styleFrame = Layout.frame({
                name: 'style-frame',
                layout: 'HORIZONTAL',
                itemSpacing: 0,
                center: true
            });

            const styleLabel = Layout.label({
                fontSize: fontSize,
                fontName: fontName,
                letterSpacing: letterSpacing,
                lineHeight: lineHeight,
                characters: folderNameFromPath(style.name).name
            });

            const styleDetailFrame = Layout.frame({
                name: 'style-detail-frame',
                layout: 'VERTICAL',
                itemSpacing: 3
            });
            styleDetailFrame.resize(DETAILS_WIDTH, 30);

            const styleDetailTop = Layout.footnote1({ text: `${fontSize} px (${Number(style.fontSize / (config?.baseSize || 16)).toFixed(2)} em)` });
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
            let sections = groupedStyles[fam].map(style => (style as TextStyle).fontName.family === uniqueFont && generateSizeSection(style as TextStyle) || null).filter(e => e !== null);
            if (sections.length) {
                const groupStyleFrame = Layout.frame({
                    name: `group-font-${fam}-${i}`,
                    layout: 'VERTICAL',
                    itemSpacing: 6
                });
                fontSizeFrame.appendChild(groupStyleFrame);
                sections.map(sec => sec && groupStyleFrame.appendChild(sec));
            }
        });


    });

    figma.viewport.scrollAndZoomIntoView([masterFrame]);
    figma.closePlugin();

}