import { Dev } from "@ctypes/dev.template";
import { folderNameFromPath, groupStyles } from "./style";
import { colorSeparator, rgb, rgbToHex, rgbToHsl } from "./color";
import simpleColorConverter from 'simple-color-converter';
import { objectToArray, roundObjectFloat } from "./utils";

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
    console.log(payload);

    const groupedStyles = groupStyles(folder);

    //preload needed fonts;
    const fontsLoad: Array<Promise<void>> = [];
    Object.keys(TEXT_STYLES).forEach((key: string) => fontsLoad.push(figma.loadFontAsync(TEXT_STYLES[key].fontName)))
    await Promise.all(fontsLoad);


    //Generate swatch
    const masterFrame = figma.createFrame();

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
            colorFrame.resize(160, 30);

            contrastFrame.name = `powerui-contrast-${styleName}-${i}`;
            colorFrame.appendChild(contrastFrame);

            //2. set details
            const colorName = figma.createText();
            colorName.characters = styleName;;
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

                    const { color } = new simpleColorConverter({ rgb: styleColor, to: format });

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
                    colorName.layoutAlign = 'STRETCH';

                    //color value
                    const colorCode = figma.createText();
                    colorCode.fontName = TEXT_STYLES.footnote_1.fontName;
                    colorCode.fontSize = TEXT_STYLES.footnote_1.fontSize;
                    colorCode.characters = arrayColor;
                    colorCode.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
                    colorCode.layoutAlign = 'STRETCH';

                    //Render color format frame
                    colorFormatFrame.appendChild(colorName);
                    colorFormatFrame.appendChild(colorCode);

                    //Add detail to detail
                    colorDetailGroup.appendChild(colorFormatFrame);
                    colorFormatFrame.layoutSizingHorizontal = 'FILL';
                    colorFormatFrame.layoutSizingVertical = 'HUG';


                }
            });

            detailFrame.appendChild(colorDetailGroup);

            //3. append and set layout
            swatchFrame.appendChild(colorFrame);
            swatchFrame.appendChild(detailFrame);
            swatchFrame.layoutMode = (config?.layout === 'Column') && 'HORIZONTAL' || 'VERTICAL';
            swatchFrame.itemSpacing = 16;

            colorFrame.layoutSizingVertical = 'FILL';

            //add up to group
            swatchFrame.name = `powerui-${styleName.replace(' ', '-')}-palette`;
            swatchGroupFrame.appendChild(swatchFrame);
        });

        swatchGroupFrame.layoutMode = 'VERTICAL';
        swatchGroupFrame.itemSpacing = 16;
        swatchGroupFrame.layoutSizingHorizontal = 'HUG';

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