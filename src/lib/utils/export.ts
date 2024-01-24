import { Dev } from "@ctypes/dev.template";
import { folderNameFromPath, groupStyles } from "./style";
import { colorSeparator, to255 } from "./color";
import simpleColorConverter from 'simple-color-converter';
import { delay, mapKeys, objectToArray, roundObjectFloat } from "./utils";
import { checkContrast } from "./shade.helper";
import { groupFont } from "./font.back";
import { TextArrayItem } from "@ctypes/text";
import { convertFontWeight, convertUnit } from "./font";
import { DEFAULT_TYPEFACE } from "@lib/constants";


const COLOR_STYLES: Record<string, Paint[]> = {
    transparent: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }],
    black: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
    grey: [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }],
    lightGrey: [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7 } }]
};


class Layout {

    textStyles: any;

    constructor() {}

    async TEXT_STYLES(font: FontName) {

        let mediumFont = { ...font, style: 'Medium' };

        await figma.loadFontAsync(font);
        try { await figma.loadFontAsync(mediumFont); }
        catch { mediumFont = font; }

        return ({
            header: {
                fontName: mediumFont,
                fontSize: 24
            },
            body: {
                fontName: font,
                fontSize: 14
            },
            caption: {
                fontName: font,
                fontSize: 10
            },
            footnote_1: {
                fontName: font,
                fontSize: 8
            },
            footnote_2: {
                fontName: font,
                fontSize: 6
            }
        });
    };

    async loadTextStyles(font: FontName) {
        this.textStyles = await this.TEXT_STYLES(font);
        return this.textStyles;
    }


    header({ text }: { text: string; }) {
        const header = figma.createText();
        header.fontName = this.textStyles.header.fontName;
        header.characters = text;
        header.fontSize = this.textStyles.header.fontSize;
        return header;
    }

    body({ text }: { text: string }) {
        const body = figma.createText();
        body.fontName = this.textStyles.body.fontName;
        body.characters = text;
        body.fontSize = this.textStyles.body.fontSize;
        return body;
    }

    footnote1({ text }: { text: string }) {
        const ft = figma.createText();
        ft.fontName = this.textStyles.footnote_1.fontName;
        ft.characters = text;
        ft.fontSize = this.textStyles.footnote_1.fontSize;
        return ft;
    }

    footnote2({ text }: { text: string }) {
        const ft = figma.createText();
        ft.fontName = this.textStyles.footnote_2.fontName;
        ft.characters = text;
        ft.fontSize = this.textStyles.footnote_2.fontSize;
        return ft;
    }

    caption({ text }: { text: string }) {
        const cp = figma.createText();
        cp.fontName = this.textStyles.caption.fontName;
        cp.characters = text;
        cp.fontSize = this.textStyles.caption.fontSize;
        return cp;
    }

    frame({ layout, name, itemSpacing, center, padding, radius }: { layout: 'HORIZONTAL' | 'VERTICAL'; name: string; center?: boolean; itemSpacing: number; padding?: Array<number>, radius?: Array<number> }) {
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
    color({ color, opacity = 1 }: { color: RGB, opacity?: number }): Paint[] {
        return [{ type: 'SOLID', color, opacity }];
    }

    label(props: Partial<TextSublayerNode>) {
        const label = figma.createText();
        mapKeys(props, label);
        return label;
    }
    underline({ node, layout }: { node: TextNode | FrameNode; layout: 'VERTICAL' | 'HORIZONTAL' }) {

        const box = figma.createFrame();
        box.name = `${node.name}-box`;
        box.layoutMode = layout;
        box.layoutSizingHorizontal = 'HUG';
        box.layoutSizingVertical = 'HUG';
        box.paddingBottom = 6;
        box.counterAxisAlignItems = 'CENTER';

        box.appendChild(node);
        node.layoutSizingHorizontal = 'FILL';
        node.layoutSizingVertical = 'FILL';

        box.strokeWeight = 0;
        box.strokes = COLOR_STYLES.lightGrey;
        box.strokeBottomWeight = 1;

        return box;
    }
};


export async function exportPaintSet({ payload }: { payload: Dev }) {

    const { folder, config } = payload;
    if (!folder) { return; }

    figma.ui.postMessage({ action: 'LOAD_MESSAGE', payload: { message: `Generating swatch...` } });
    await delay(20);

    const layoutFont: FontName = { family: (config?.typeface || DEFAULT_TYPEFACE), style: 'Regular' };

    const layout = new Layout();
    await layout.loadTextStyles(layoutFont);
    const groupedStyles = groupStyles(folder);

    //Generate swatch
    const masterFrame = layout.frame({
        name: 'Palettes',
        layout: (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL',
        itemSpacing: 0
    });

    for (let key in groupedStyles) {

        figma.ui.postMessage({ action: 'LOAD_MESSAGE', payload: { message: `Generating ${key} swatch...` } });
        await delay(40);

        //create parent frame
        const parentFrame = layout.frame({
            name: key,
            itemSpacing: 24,
            layout: 'VERTICAL',
            padding: [24, 24, 24, 24]
        });
        masterFrame.appendChild(parentFrame);


        //create header
        const header = layout.header({ text: key });
        const boxColorName = layout.underline({ node: header, layout: 'HORIZONTAL' });
        parentFrame.appendChild(boxColorName);
        boxColorName.layoutSizingHorizontal = 'FILL';

        //generate swatches
        const swatchGroupFrame = layout.frame({
            name: 'swatch-group-frame',
            layout: (config?.layout === 'Column') && 'VERTICAL' || 'HORIZONTAL',
            itemSpacing: 16
        });


        groupedStyles[key].forEach((style, i) => {

            const styleName = folderNameFromPath(style.name).name || style.name;

            //parent
            const swatchFrame = layout.frame({
                name: `${styleName.replace(' ', '-')}-palette`,
                layout: (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL',
                itemSpacing: 6,
            })

            //child 1
            const colorFrame = figma.createFrame();

            //child 2
            const detailFrame = layout.frame({
                name: `color-detail-${styleName}-${i}`,
                layout: 'VERTICAL',
                itemSpacing: 6
            });

            const contrastFrame = layout.frame({
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
            colorFrame.fills = layout.color({ color: styleColor });
            colorFrame.strokes = layout.color({ color: { r: 0.9, g: 0.9, b: 0.9 }, opacity: 0.5 });

            colorFrame.appendChild(contrastFrame);

            //1.1 set contrast
            contrastFrame.fills = layout.color({ color: { r: 0, g: 0, b: 0 }, opacity: 0 });

            const contrastBubble = ({ color, ratio, large, regular }: { color: RGB, ratio: number; large: string | undefined; regular: string | undefined; }) => {
                const contrastFrame = layout.frame({
                    name: 'contrast-frame',
                    layout: 'HORIZONTAL',
                    center: true,
                    itemSpacing: 3,
                    padding: [2, 4, 2, 4],
                    radius: [30, 30, 30, 30]
                });

                contrastFrame.fills = layout.color({ color: { r: 1, g: 1, b: 1 }, opacity: 0.8 });


                const swatch = figma.createEllipse();
                swatch.resize(10, 10);
                swatch.fills = layout.color({ color });
                swatch.strokes = layout.color({ color: { r: 0.9, g: 0.9, b: 0.9 } });

                const ratioText = layout.footnote1({ text: String(ratio) });

                contrastFrame.appendChild(swatch);
                contrastFrame.appendChild(ratioText);

                if (large) {
                    const AAA = layout.footnote1({ text: 'AAA' });
                    contrastFrame.appendChild(AAA);
                }

                if (regular) {
                    const AA = layout.footnote1({ text: 'AA' });
                    contrastFrame.appendChild(AA);
                }


                return contrastFrame;
            }

            const hexColor = `#${new simpleColorConverter({ rgb: to255(styleColor), to: 'hex' }).color}`
            const { black, white } = checkContrast(hexColor);

            contrastFrame.appendChild(contrastBubble({ color: { r: 0, g: 0, b: 0 }, ...black }));
            contrastFrame.appendChild(contrastBubble({ color: { r: 1, g: 1, b: 1 }, ...white }));

            //2. set details
            const colorName = layout.body({ text: styleName });

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
            const colorDetailGroup = layout.frame({
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
                    const colorName = layout.footnote1({ text: (format === 'pantone') ? 'Pantone' : format.toUpperCase() });
                    colorName.fills = COLOR_STYLES.grey;

                    //color value
                    const colorCode = layout.footnote1({ text: arrayColor });
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
                    detailFrame.resize(120,90);
                    detailFrame.layoutSizingVertical= 'HUG';
            }

 
            //add up to group
            swatchGroupFrame.appendChild(swatchFrame);

        });

        parentFrame.appendChild(swatchGroupFrame);
        swatchGroupFrame.layoutSizingHorizontal = 'FIXED';
        parentFrame.layoutSizingHorizontal = 'HUG';

    }

    figma.viewport.scrollAndZoomIntoView([masterFrame]);
    figma.closePlugin();

}



export async function exportTextSet({ payload }: { payload: Dev }) {

    const { folder, config } = payload;
    if (!folder) { return; }

    const groupedStyles = groupStyles(folder);
    const layoutFont: FontName = { family: (config?.typeface || DEFAULT_TYPEFACE), style: 'Regular' };
    const layout = new Layout();
    await layout.loadTextStyles(layoutFont);

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

    //preload styles fonts
    const fontsLoad: Array<Promise<any>> = [];
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
    const masterFrame = layout.frame({
        name: 'Font sets',
        layout: 'HORIZONTAL',
        itemSpacing: 32,
    });

    const fontFamilyHierarchy = ['Primary', 'Secondary', 'Tertiary'];
    Object.keys(uniqueFonts).forEach((uniqueFont, i) => {

        const fontGroup = layout.frame({
            name: 'font-group-frame',
            padding: [24, 24, 24, 24],
            itemSpacing: 32,
            layout: 'VERTICAL'
        });
        masterFrame.appendChild(fontGroup);


        //----------Set font families
        if (config?.fontFamily) {
            const fontFamilyFrame = layout.frame({
                name: 'font-family-frame',
                layout: 'VERTICAL',
                itemSpacing: 12
            });

            const fontFamilyHeader = layout.header({ text: 'Font Family' });
            const boxFontFamily = layout.underline({ node: fontFamilyHeader, layout: 'HORIZONTAL' });
            fontFamilyFrame.appendChild(boxFontFamily);
            boxFontFamily.layoutSizingHorizontal = 'FILL';


            const fontFrame = layout.frame({
                layout: 'HORIZONTAL',
                itemSpacing: 0,
                name: 'font-frame',
                center: true
            });

            //Set font label
            const fontLabel = layout.label({
                fontSize: 32,
                fontName: { family: uniqueFont, style: 'Regular' },
                characters: uniqueFont
            });


            //Set font detail
            const fontDetail = layout.frame({
                name: 'font-detail',
                itemSpacing: 3,
                layout: 'VERTICAL'
            });

            fontDetail.resize(DETAILS_WIDTH, 30);

            const fontDetailTop = layout.footnote1({ text: `Font Family ${(fontFamilyHierarchy[i] || '')}` });
            const fontDetailBottom = layout.footnote1({ text: uniqueFont });
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
            const fontWeightFrame = layout.frame({
                name: 'font-weight-frame',
                itemSpacing: 12,
                layout: 'VERTICAL'
            });

            const fontWeightHeader = layout.header({ text: 'Font Weight' });
            const boxFontWeight = layout.underline({ node: fontWeightHeader, layout: 'HORIZONTAL' });
            fontWeightFrame.appendChild(boxFontWeight);
            boxFontWeight.layoutSizingHorizontal = 'FILL';


            uniqueFonts[uniqueFont].style.forEach(style => {

                const styleFrame = layout.frame({
                    name: 'style-frame',
                    itemSpacing: 0,
                    layout: 'HORIZONTAL',
                    center: true
                });

                const styleLabel = layout.label({
                    fontSize: 32,
                    fontName: { family: uniqueFont, style: style },
                    characters: style
                });

                const styleDetailFrame = layout.frame({
                    name: 'style-detail-frame',
                    itemSpacing: 3,
                    layout: 'VERTICAL'
                });
                styleDetailFrame.resize(DETAILS_WIDTH, 30);

                const styleDetailTop = layout.footnote1({ text: `Font Weight ${style}` });
                styleDetailTop.fills = COLOR_STYLES.grey;

                const styleDetailBottom = layout.footnote1({ text: convertFontWeight(style) });
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
        const fontSizeFrame = layout.frame({
            name: 'font-size-frame',
            itemSpacing: 24,
            layout: 'VERTICAL'
        });

        //Set header + underline
        const fontSizeHeader = layout.header({ text: 'Font Size' });
        const boxFontSize = layout.underline({ node: fontSizeHeader, layout: 'HORIZONTAL' });
        fontSizeFrame.appendChild(boxFontSize);
        boxFontSize.layoutSizingHorizontal = 'FILL';

        fontGroup.appendChild(fontSizeFrame);
        fontSizeFrame.layoutSizingHorizontal = 'FILL';

        function generateSizeSection(style: TextStyle) {

            const { fontName, fontSize } = style as TextStyle;
            const letterSpacing = roundObjectFloat((style as TextStyle).letterSpacing);
            const lineHeight = roundObjectFloat((style as TextStyle).lineHeight);

            const styleFrame = layout.frame({
                name: 'style-frame',
                layout: 'HORIZONTAL',
                itemSpacing: 0,
                center: true
            });

            const styleLabel = layout.label({
                fontSize: fontSize,
                fontName: fontName,
                letterSpacing: letterSpacing,
                lineHeight: lineHeight,
                characters: folderNameFromPath(style.name).name
            });

            const styleDetailFrame = layout.frame({
                name: 'style-detail-frame',
                layout: 'VERTICAL',
                itemSpacing: 3
            });
            styleDetailFrame.resize(DETAILS_WIDTH, 30);

            const styleDetailTop = layout.footnote1({ text: `${fontSize} px (${Number(style.fontSize / (config?.baseSize || 16)).toFixed(2)} em)` });
            styleDetailTop.fills = COLOR_STYLES.grey;

            const styleDetailBottomFrame = layout.frame({
                name: 'style-detail-bottom-frame',
                layout: 'HORIZONTAL',
                itemSpacing: 12
            });

            const lineHeightText = layout.footnote1({ text: `↕ ${((lineHeight as any).value && (lineHeight as any).value + ' ') || ''}${convertUnit(lineHeight.unit)}` });
            lineHeightText.fills = COLOR_STYLES.grey;

            const letterSpacingText = layout.footnote1({ text: `↔ ${letterSpacing.value} ${convertUnit(letterSpacing.unit)}` });
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
                const groupStyleFrame = layout.frame({
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