import { ColorHSL, ColorRGB } from "@ctypes/color";
import { ColorAdjustConfig, ColorConfig, SetMethod, Workbench } from "@ctypes/workbench";
import { Contrast, ContrastPropreties, Shade } from "@ctypes/shade";
import { concatFolderName, folderNameFromPath } from "./style";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";
import chroma, { InterpolationMode } from 'chroma-js';
import { argbFromHex, themeFromSourceColor, hexFromArgb } from '@material/material-color-utilities';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "./color";
import { generate } from '@ant-design/colors';
import { generateColors } from "@mantine/colors-generator";
import { ratio } from "wcag-color";
import { wcagContrastChecker } from "@mdhnpm/wcag-contrast-checker";
import { StyleColor } from "@ctypes/style";
import { envelop } from "./utils";


function checkContrast(target: string): Contrast {

    function calculate(target: string, comparator: string): ContrastPropreties {
        const { largeText, regularText } = wcagContrastChecker(target, comparator);
        return {
            ratio: ratio(target, comparator),
            large: largeText.aaa ? 'AAA' : largeText.aa ? 'AA' : undefined,
            regular: regularText.aaa ? 'AAA' : regularText.aa ? 'AA' : undefined
        };
    };


    return {
        black: calculate(target, "#000000"),
        white: calculate(target, "#FFFFFF")
    };
}

/*
** CLASSIC INTERPOLATIONS 
*/
export function interpolate({ colorStart, colorEnd = "#CCCCCC", steps = 10, action, mode, name }: { colorStart: string, colorEnd: string, steps: number, action: SetMethod, mode: string, name: string }): Array<Shade> {

    const colorArray: Array<Shade> = [];

    //Set color end depending
    switch (action) {
        case 'SHADE':
            colorEnd = "#000000";
            break;
        case 'TINT':
            colorEnd = "#FFFFFF";
            break;
        case 'TONE':
            colorEnd = chroma(colorStart).desaturate(steps).hex();
            break;
    }


    if (mode) {
        for (let s = 1; s < Number(steps) + 1; s++) {
            const scale = chroma.scale([colorStart, colorEnd]).mode(mode as InterpolationMode);
            const value = scale(s / Number(steps));
            const rgb = value.rgb();
            const hex = value.hex();

            colorArray.push({
                name: `${name}-${s}`,
                color: { r: rgb[0] / 255, g: rgb[1] / 255, b: rgb[2] / 255 },
                contrast: checkContrast(hex)
            });
        }
    }
    return colorArray;
}

/*
** MATERIAL DESIGN 
*/
export function material({ colorStart, steps = 10, name, palette }: ColorConfig): Array<Shade> {
    const colorArray: Array<Shade> = [];
    const materialTheme = themeFromSourceColor(argbFromHex(colorStart as string), []);
    const materialPalette = materialTheme.palettes[palette || 'primary'];

    const keys = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
    for (let k of keys) {
        const value = materialPalette.tone(k);
        const hex = hexFromArgb(value);
        const rgb = hexToRgb(hex, true, 'OBJECT');
        colorArray.push({
            name: `${name}-${k * 10}`,
            color: rgb as ColorRGB,
            contrast: checkContrast(hex)
        });
    }

    return colorArray;
}


/*
** MANTINE DESIGN 
*/
export function mantine({ colorStart, name, theme }: ColorConfig): Array<Shade> {
    return generateColors(colorStart as string).map((color, i) => ({
        name: `${name}-${i + 1}`,
        color: hexToRgb(color, true, 'OBJECT') as ColorRGB,
        contrast: checkContrast(color)
    }));
}

/*
** ANT DESIGN 
*/
export function ant({ colorStart, name, theme }: ColorConfig): Array<Shade> {
    const palette = generate(colorStart as string, { theme: theme || 'default' });
    return palette.map((color, i) => ({
        name: `${name}-${i + 1}`,
        color: hexToRgb(color, true, 'OBJECT') as ColorRGB,
        contrast: checkContrast(color)
    }));
}

/*
** COLOR ADJUSTMENTS 
*/
export function colorAdjust(props: ColorAdjustConfig): Array<Shade> {


    return props.styles.map((style: StyleColor, i:number) => {
        
        const { color } = style.paints[0] as SolidPaint;
        const { hue, saturation, brightness, contrast, temperature } = props;
        
        //convert to HSL
        const hslColor = rgbToHsl(color, 'OBJECT') as ColorHSL;

        //apply correction
        if(hue) hslColor.h += envelop(-180,hue,180);
        if(saturation) hslColor.s += envelop(-100,saturation,100);
        if(brightness) hslColor.l += envelop(-100,brightness,100);

        console.log(hslColor);

        //convert back to RGB
        const newColor = hslToRgb(hslColor, true, 'OBJECT') as ColorRGB;

        return ({
            name: folderNameFromPath(style.name).name,
            color: newColor,
            contrast: checkContrast(rgbToHex(color) )
        })
    });

}

/*
** CREATE FIGMA PALELTTE FROM SET 
*/
export function createSwatch({ folder, set, config }: Workbench) {
    const baseName = (config as ColorConfig).name;
    if (!set) { return; }
    set.forEach(({ name, color }: Shade) => {
        const newStyle = figma.createPaintStyle();
        newStyle.name = concatFolderName(folder, [baseName, name].join('/'));
        newStyle.paints = DEFAULT_STYLE_COLOR.map(paint => ({ ...paint, color: color }));
    })
}

