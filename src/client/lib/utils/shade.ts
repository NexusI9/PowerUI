import { ColorRGB } from "@ctypes/color";
import { ColorConfig, SetMethod, Workbench } from "@ctypes/workbench";
import { clamp } from "./utils";
import { Shade } from "@ctypes/shade";
import { concatFolderName } from "./style";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";
import chroma, { InterpolationMode } from 'chroma-js';
import { hexToRgb } from "./color";


export function interpolate({ colorStart, colorEnd = "#CCCCCC", steps = 10, action, mode }: { colorStart: string, colorEnd: string, steps: number, action: SetMethod, mode: string }): Array<ColorRGB> {

    const valueAt = (channelA: number, channelB: number, step: number) => channelA + (channelB - channelA) * step / steps;
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
            //const average = (colorStart.r+colorStart.g+colorStart.b)/3;
            //colorEnd = { r: average, g: average, b: average };
            break;
    }


    if (mode) {
        for (let s = 1; s < steps + 1; s++) {
            const scale = chroma.scale([colorStart, colorEnd]).mode(mode as InterpolationMode);
            const value = scale(s / steps).rgb();
            colorArray.push({ r: value[0] / 255, g: value[1] / 255, b: value[2] / 255 });
            console.log();
        }
    }

    return colorArray;
}


export function createSwatch({ folder, set, config: { name } }: Workbench) {
    const baseName = name;

    set?.forEach(({ name, color }: Shade) => {
        const newStyle = figma.createPaintStyle();
        newStyle.name = concatFolderName(folder, [baseName, name].join('/'));
        newStyle.paints = DEFAULT_STYLE_COLOR.map(paint => ({ ...paint, color: color }));
    })
}