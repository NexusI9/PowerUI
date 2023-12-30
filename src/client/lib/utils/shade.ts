import { ColorRGB } from "@ctypes/color";
import { SetMethod, Workbench } from "@ctypes/workbench";
import { Shade } from "@ctypes/shade";
import { concatFolderName } from "./style";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";
import chroma, { InterpolationMode } from 'chroma-js';
import {argbFromHex} from '@material/material-color-utilities';


export function interpolate({ colorStart, colorEnd = "#CCCCCC", steps = 10, action, mode }: { colorStart: string, colorEnd: string, steps: number, action: SetMethod, mode: string }): Array<ColorRGB> {

    const colorArray: Array<ColorRGB> = [];

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
            colorArray.push({ r: value[0] / 255, g: value[1] / 255, b: value[2] / 255 });
        }
    }

    return colorArray;
}

export function material({colorStart}:{colorStart:string;}):Array<ColorRGB>{
    //https://stackoverflow.com/questions/70323955/how-to-generate-material-3-color-palettes-in-js-scss

    //const m3ThemeColorsJSON = themeFromSourceColor(argbFromHex(colorStart), []);
    //const argb = argbFromHex("#330000");
    //console.log(null ?? 'a');

    return [];
}


export function createSwatch({ folder, set, config: { name } }: Workbench) {
    const baseName = name;
    if(!set){ return; }
    set.forEach(({ name, color }: Shade) => {
        const newStyle = figma.createPaintStyle();
        newStyle.name = concatFolderName(folder, [baseName, name].join('/'));
        newStyle.paints = DEFAULT_STYLE_COLOR.map(paint => ({ ...paint, color: color }));
    })
}

