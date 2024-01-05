import { ColorHSL, ColorRGB } from "@ctypes/color";
import { ColorAdjustConfig, ColorConfig, SetMethod, Workbench } from "@ctypes/workbench";
import { Shade } from "@ctypes/shade";
import { concatFolderName, folderAtLevel, folderNameFromPath, get_styles_of_folder, setCopyNumber } from "./style";
import { DEFAULT_STYLE_COLOR, MATERIAL_DEFAULT_KEYS } from "@lib/constants";
import chroma, { InterpolationMode } from 'chroma-js';
import { argbFromHex, themeFromSourceColor, hexFromArgb } from '@material/material-color-utilities';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgb } from "./color";
import { generate } from '@ant-design/colors';
import { StyleColor } from "@ctypes/style";
import { clamp, envelop, mix } from "./utils";
import { checkContrast, convertTemperature } from "./shade.helper";
import TailwindPalette, { Palette } from '@lib/vendor/tailwind-swatch';
import { generateColors } from "@lib/vendor/mantine-swatch";
/*
** CLASSIC INTERPOLATIONS 
*/
export function interpolate({ colorStart, colorEnd, steps = 10, action, mode, name }: { colorStart: string, colorEnd: string, steps: number, action: SetMethod, mode: string, name: string }): Array<Shade> {

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
        for (let s = 0; s <= Number(steps); s++) {
            const scale = chroma.scale([colorStart, colorEnd]).mode(mode as InterpolationMode);
            const value = scale(s / Number(steps));
            const rgb = value.rgb();
            const hex = value.hex();

            colorArray.push({
                name: `${name}-${s}`,
                color: { r: rgb[0] / 255, g: rgb[1] / 255, b: rgb[2] / 255 },
                contrast: checkContrast(hex),
                primary: hex.toLowerCase() === colorStart.toLowerCase() || (action === 'INTERPOLATION' && hex.toLowerCase() === colorEnd.toLowerCase())
            });
        }
    }
    return colorArray;
}

/*
** MATERIAL DESIGN 
*/
export function material({ colorStart, steps = 10, name, palette, keys, preserve }: ColorConfig): Array<Shade> {
    const colorArray: Array<Shade> = [];
    const argbColorStart = argbFromHex(colorStart as string);
    const materialTheme = themeFromSourceColor(argbColorStart, []);
    const materialPalette = materialTheme.palettes[palette || 'primary'];

    //define shade keys (use fallback o)
    keys = (keys && keys.length) ? keys : MATERIAL_DEFAULT_KEYS;
    const tones = keys.map(key => materialPalette.tone(key / 10));

 
    //find closest tone to primary (colorStart) depending on light intensity
    const closestKeyToPrimary = preserve && tones.reduce((curr, prev) => {
        const primaryL = chroma(colorStart as string).get('hsl.l');
        const currentToneL = chroma(hexFromArgb(curr)).get('hsl.l');
        const prevToneL = chroma(hexFromArgb(prev)).get('hsl.l');
        return Math.abs(primaryL - currentToneL) < Math.abs(primaryL - prevToneL) ? curr : prev;
    });

    console.log(preserve);

    //apply
    tones.forEach((value, i) => {
        //replace closest tone for primary 
        const isPrimary = (value === closestKeyToPrimary) && palette === 'primary';
        value = isPrimary ? closestKeyToPrimary : value;
        const hex = isPrimary ? (colorStart as string) : hexFromArgb(value);
        const rgb = hexToRgb(hex, true, 'OBJECT') as ColorRGB;

        colorArray.push({
            name: `${name}-${(keys || MATERIAL_DEFAULT_KEYS)[i]}`,
            color: rgb,
            contrast: checkContrast(hex),
            primary: isPrimary
        });
    });


    return colorArray;
}


/*
** MANTINE DESIGN 
*/
export function mantine({ colorStart, name, theme }: ColorConfig): Array<Shade> {
    return generateColors(colorStart as string).map((color, i) => ({
        name: `${name}-${i + 1}`,
        color: hexToRgb(color, true, 'OBJECT') as ColorRGB,
        contrast: checkContrast(color),
        primary: (colorStart as string).toLowerCase() === color.toLowerCase()
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
        contrast: checkContrast(color),
        primary: (colorStart as string).toLowerCase() === color.toLowerCase()
    }));
}


/*
** TAILWIND SWATCH
*/
export function tailwind({ colorStart, name }: ColorConfig): Array<Shade> {

    const { colors } = TailwindPalette(colorStart as string) as Palette;

    const result: Array<Shade> = [];
    if (colors) {
        Object.keys(colors).forEach((key) => {
            const nkey = Number(key);
            const hex = colors[nkey as keyof typeof colors];
            const rgb = hexToRgb(hex, true, 'OBJECT') as ColorRGB;
            result.push({
                name: `${name}-${key}`,
                color: rgb,
                contrast: checkContrast(hex),
                primary: (colorStart as string).toLowerCase() === hex.toLowerCase()
            })
        });
    }

    return result;
}



/*
** COLOR ADJUSTMENTS 
*/
export function colorAdjust(props: ColorAdjustConfig): Array<Shade> {


    return props.styles.map((style: StyleColor, i: number) => {

        const { color } = style.paints[0] as SolidPaint;
        const { hue, saturation, brightness, contrast, temperature, tint } = props;

        //convert to HSL
        const hslColor = rgbToHsl(color, 'OBJECT') as ColorHSL;
        //apply correction for basic adjustments
        if (hue) {
            hslColor.h += Math.abs(Number(hue)) * 0.4;
            hslColor.h = clamp(0, hslColor.h, 1);
        }
        if (saturation) {
            hslColor.s += Number(saturation);
            hslColor.s = clamp(0, hslColor.s, 1);
        }
        if (brightness) {
            hslColor.l += Number(brightness);
            hslColor.l = clamp(0, hslColor.l, 1);
        }


        //console.log({ brightness, light:hslColor.l, average: (hslColor.l + Number(brightness)) / 2, i })
        //convert back to RGB for more complex adjustments
        const rgbColor = hslToRgb(hslColor, true, 'OBJECT') as ColorRGB;

        if (contrast) {

            //bright / dark end point values
            let bright: number = 0.5; // 0 < x < 0.5
            let dark: number = 0; // 0 < x < 0.5

            //bright/dark easing function
            const dbEase = (val: number) => 0.5 - 0.3 * val ** 2;

            //sigmoid function
            const s = (alpha: number, teta: number) => 1 / (1 + Math.exp(-1 * alpha * teta)) - 0.5;
            const f = (teta: number, strength: number, bright: number = 0.5, dark: number = 0) => dark + (bright / (s(1, strength))) * s(2 * teta - 1, strength) + bright;

            let factor = Math.abs(Number(contrast) * 10);

            if (Number(contrast) < 0) {
                //If less contrast: Reduce bright/black value
                bright = dbEase(envelop(0, contrast, 1));
                dark = 0.5 - bright;
                factor = 0.1;
            }

            rgbColor.r = clamp(0, f(rgbColor.r, factor, bright, dark), 1) || rgbColor.r;
            rgbColor.g = clamp(0, f(rgbColor.g, factor, bright, dark), 1) || rgbColor.g;
            rgbColor.b = clamp(0, f(rgbColor.b, factor, bright, dark), 1) || rgbColor.b;
        }
        if (temperature) {
            const tempColor = convertTemperature(envelop(40000, temperature, 1000));
            const factor = Math.abs(Number(temperature));

            rgbColor.r = mix(rgbColor.r, tempColor.r, factor);
            rgbColor.g = mix(rgbColor.g, tempColor.g, factor);
            rgbColor.b = mix(rgbColor.b, tempColor.b, factor);
        }


        //console.log(rgbColor);


        return ({
            name: folderNameFromPath(style.name).name,
            color: rgbColor,
            contrast: checkContrast(rgbToHex(rgbColor))
        });
    });

}



/*
** CREATE FIGMA PALELTTE FROM SET 
*/
export function createSwatch({ folder, set, config }: Workbench) {
    if (!folder) { return; }
    const baseName = (config as ColorConfig).name || '';
    const { level } = folder;
    const styleFolders = (get_styles_of_folder(folder) ?? []).map(style => folderAtLevel(style.name, level));

    set?.forEach(({ name, color }: Shade) => {
        const newStyle = figma.createPaintStyle();
        const copyName = setCopyNumber(baseName, styleFolders) || '';
        newStyle.name = concatFolderName([folder.fullpath, copyName, name]);
        newStyle.paints = DEFAULT_STYLE_COLOR.map(paint => ({ ...paint, color: color }));
    })
}

