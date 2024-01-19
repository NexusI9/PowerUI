import { Dev } from "@ctypes/dev.template";
import { folderNameFromPath, groupStyles } from "./style";
import { colorSeparator, rgb, rgbToHex, rgbToHsl, to255 } from "./color";
import simpleColorConverter from 'simple-color-converter';
import { objectToArray, roundObjectFloat } from "./utils";
import { checkContrast } from "./shade.helper";

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

export async function exportPaintSet({ payload }: { payload: Dev }) {

    const { folder, config } = payload;

    if (!folder) { return; }

    const groupedStyles = groupStyles(folder);

    //preload needed fonts;
    const fontsLoad: Array<Promise<void>> = [];
    Object.keys(TEXT_STYLES).forEach((key: string) => fontsLoad.push(figma.loadFontAsync(TEXT_STYLES[key].fontName)))
    await Promise.all(fontsLoad);


    //Generate swatch
    const masterFrame = figma.createFrame();
    masterFrame.name = 'Palettes'
    
    Object.keys(groupedStyles).forEach(async (key: string) => {

        //create parent frame
        const parentFrame = figma.createFrame();

        //create header
        const header = figma.createText();
        header.characters = key;
        header.fontSize = TEXT_STYLES.header.fontSize;
        header.fontName = TEXT_STYLES.header.fontName

        //generate swatches
        const swatchGroupFrame = figma.createFrame();
        groupedStyles[key].forEach((style, i) => {

            const styleName = folderNameFromPath(style.name).name || style.name;

            const swatchFrame = figma.createFrame(); //parent
            const colorFrame = figma.createFrame(); //child 1
            const detailFrame = figma.createFrame(); //child 2
            const contrastFrame = figma.createFrame();

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
            colorFrame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 }, opacity: 0.5 }]

            colorFrame.appendChild(contrastFrame);

            //1.1 set contrast
            contrastFrame.name = `powerui-contrast-${styleName}-${i}`;
            contrastFrame.layoutMode = 'VERTICAL';
            contrastFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];
            contrastFrame.layoutSizingHorizontal = 'HUG';
            contrastFrame.layoutSizingVertical = 'HUG';
            contrastFrame.itemSpacing = 3;
            contrastFrame.paddingBottom = 6;
            contrastFrame.paddingLeft = 6;
            contrastFrame.paddingRight = 6;
            contrastFrame.paddingTop = 6;

            const contrastBubble = ({ color, ratio, large, regular }: { color: RGB, ratio: number; large: string | undefined; regular: string | undefined; }) => {
                const contrastFrame = figma.createFrame();
                contrastFrame.layoutMode = 'HORIZONTAL';
                contrastFrame.layoutSizingHorizontal = 'HUG';
                contrastFrame.layoutSizingVertical = 'HUG';
                contrastFrame.itemSpacing = 3;
                contrastFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.8 }];
                contrastFrame.bottomLeftRadius = 30;
                contrastFrame.bottomRightRadius = 30;
                contrastFrame.topLeftRadius = 30;
                contrastFrame.topRightRadius = 30;
                contrastFrame.paddingLeft = 4;
                contrastFrame.paddingRight = 4;
                contrastFrame.paddingTop = 2;
                contrastFrame.paddingBottom = 2;

                const swatch = figma.createEllipse();
                swatch.resize(10, 10);
                swatch.fills = [{ type: 'SOLID', color }];
                swatch.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];

                const ratioText = figma.createText();
                ratioText.fontSize = TEXT_STYLES.footnote_1.fontSize;
                ratioText.fontName = TEXT_STYLES.footnote_1.fontName;
                ratioText.characters = String(ratio);

                contrastFrame.appendChild(swatch);
                contrastFrame.appendChild(ratioText);

                if (large) {
                    const AAA = figma.createText();
                    AAA.fontSize = TEXT_STYLES.footnote_1.fontSize;
                    AAA.fontName = TEXT_STYLES.footnote_1.fontName;
                    AAA.characters = 'AAA';
                    contrastFrame.appendChild(AAA);
                }

                if (regular) {
                    const AA = figma.createText();
                    AA.fontSize = TEXT_STYLES.footnote_2.fontSize;
                    AA.fontName = TEXT_STYLES.footnote_2.fontName;
                    AA.characters = 'AA';
                    contrastFrame.appendChild(AA);
                }




                return contrastFrame;
            }

            const hexColor = `#${new simpleColorConverter({ rgb: to255(styleColor), to: 'hex' }).color}`
            const { black, white } = checkContrast(hexColor);

            contrastFrame.appendChild(contrastBubble({ color: { r: 0, g: 0, b: 0 }, ...black }));
            contrastFrame.appendChild(contrastBubble({ color: { r: 1, g: 1, b: 1 }, ...white }));

            //2. set details
            const colorName = figma.createText();
            colorName.characters = styleName;
            colorName.fontSize = TEXT_STYLES.body.fontSize;
            colorName.fontName = TEXT_STYLES.body.fontName;
            detailFrame.name = `powerui-detail-${styleName}-${i}`;

            detailFrame.appendChild(colorName);
            detailFrame.layoutMode = 'VERTICAL';
            detailFrame.itemSpacing = 6;
            detailFrame.layoutSizingHorizontal = 'HUG';
            detailFrame.layoutSizingVertical = 'HUG';

            //set color values detail
            const colorFormat = {
                'rgb': (color: any) => objectToArray(roundObjectFloat(color)),
                'hsl': (color: any) => objectToArray(roundObjectFloat(color)),
                'cmyk': (color: any) => objectToArray(roundObjectFloat(color)),
                'hex': (color: any) => `#${color}`,
                'pantone': (color: any) => color
            };

            //2.1 set color details
            const colorDetailGroup = figma.createFrame();
            colorDetailGroup.layoutMode = 'VERTICAL';
            colorDetailGroup.itemSpacing = 3;

            Object.keys(colorFormat).forEach(format => {
                if (config && !!config[format as keyof typeof config]) {

                    const colorFormatFrame = figma.createFrame();
                    colorFormatFrame.layoutMode = 'HORIZONTAL';

                    const { color } = new simpleColorConverter({ rgb: to255(styleColor), to: format });

                    //convert object {r,g,b} to array
                    let arrayColor = colorFormat[format as keyof typeof colorFormat](color);
                    //add separator
                    arrayColor = colorSeparator(arrayColor, (config.colorSeparator || 'White space'), format);

                    //color name (hex/rgb...)
                    const colorName = figma.createText();
                    colorName.fontName = TEXT_STYLES.footnote_1.fontName;
                    colorName.fontSize = TEXT_STYLES.footnote_1.fontSize;
                    colorName.characters = (format === 'pantone') ? 'Pantone' : format.toUpperCase();
                    colorName.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];

                    //color value
                    const colorCode = figma.createText();
                    colorCode.fontName = TEXT_STYLES.footnote_1.fontName;
                    colorCode.fontSize = TEXT_STYLES.footnote_1.fontSize;
                    colorCode.characters = arrayColor;
                    colorCode.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];

                    //Render color format frame
                    colorFormatFrame.appendChild(colorName);
                    colorFormatFrame.appendChild(colorCode);

                    //Add detail to detail
                    colorDetailGroup.appendChild(colorFormatFrame);
                    colorFormatFrame.layoutSizingHorizontal = 'FILL';
                    colorFormatFrame.layoutSizingVertical = 'HUG';
                    colorFormatFrame.primaryAxisAlignItems = 'SPACE_BETWEEN'

                }
            });

            detailFrame.appendChild(colorDetailGroup);

            //3. append and set layout
            swatchFrame.appendChild(colorFrame);
            swatchFrame.appendChild(detailFrame);
            swatchFrame.layoutMode = (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL';
            swatchFrame.itemSpacing = 16;
            swatchFrame.layoutSizingHorizontal = 'HUG';
            swatchFrame.layoutSizingVertical = 'HUG';

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
            swatchFrame.name = `powerui-${styleName.replace(' ', '-')}-palette`;
            swatchGroupFrame.appendChild(swatchFrame);
        });

        swatchGroupFrame.layoutMode = (config?.layout === 'Column') && 'VERTICAL' || 'HORIZONTAL';
        swatchGroupFrame.itemSpacing = 16;
        swatchGroupFrame.layoutSizingHorizontal = 'HUG';
        swatchGroupFrame.layoutSizingVertical = 'HUG';

        parentFrame.name = key;
        parentFrame.appendChild(header);
        parentFrame.appendChild(swatchGroupFrame);
        parentFrame.paddingLeft = 24;
        parentFrame.paddingBottom = 24;
        parentFrame.paddingTop = 24;
        parentFrame.paddingRight = 24;

        parentFrame.layoutMode = 'VERTICAL';
        parentFrame.itemSpacing = 24;
        parentFrame.layoutSizingHorizontal = 'HUG';

        masterFrame.appendChild(parentFrame);

    });

    masterFrame.layoutMode = (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL';
    masterFrame.layoutSizingHorizontal = 'HUG';
    masterFrame.layoutSizingVertical = 'HUG';

    //figma.closePlugin();

}