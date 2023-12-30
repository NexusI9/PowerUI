import { ColorRGB } from "@ctypes/color";
import { ColorConfig, SetMethod, Workbench } from "@ctypes/workbench";
import { Shade } from "@ctypes/shade";
import { concatFolderName } from "./style";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";
import chroma, { InterpolationMode } from 'chroma-js';
import { TonalPalette, argbFromHex, themeFromSourceColor, hexFromArgb } from '@material/material-color-utilities';
import { hexToRgb } from "./color";


export function interpolate({ colorStart, colorEnd = "#CCCCCC", steps = 10, action, mode, name }: { colorStart: string, colorEnd: string, steps: number, action: SetMethod, mode: string, name:string }): Array<Shade> {

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
        for (let s = 1; s < steps + 1; s++) {
            const scale = chroma.scale([colorStart, colorEnd]).mode(mode as InterpolationMode);
            const value = scale(s / steps).rgb();
            colorArray.push({
                name: `${name}-${s}`,
                color: { r: value[0] / 255, g: value[1] / 255, b: value[2] / 255 }
            });
        }
    }

    return colorArray;
}

export function material({ colorStart, steps = 10, name, palette}:ColorConfig): Array<Shade> {
    //https://stackoverflow.com/questions/70323955/how-to-generate-material-3-color-palettes-in-js-scss

    const colorArray: Array<Shade> = [];
    const materialTheme = themeFromSourceColor(argbFromHex(colorStart as string), []);
   // const primary = materialTheme.schemes[theme || 'light'].primary;
    const materialPalette = materialTheme.palettes[palette || 'primary'];

    const keys = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
    for (let k of keys) {
        const value = materialPalette.tone(k);
        const rgb = hexToRgb(hexFromArgb(value), true, 'OBJECT');
        colorArray.push({
            name: `${name}-${k*10}`,
            color: rgb as ColorRGB
        });
    }


    return colorArray;
}


export function createSwatch({ folder, set, config: { name } }: Workbench) {
    const baseName = name;
    if (!set) { return; }
    set.forEach(({ name, color }: Shade) => {
        const newStyle = figma.createPaintStyle();
        newStyle.name = concatFolderName(folder, [baseName, name].join('/'));
        newStyle.paints = DEFAULT_STYLE_COLOR.map(paint => ({ ...paint, color: color }));
    })
}

