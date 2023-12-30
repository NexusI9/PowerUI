import { ColorRGB } from "@ctypes/color";
import { SetMethod, Workbench } from "@ctypes/workbench";
import { clamp } from "./utils";
import { Shade } from "@ctypes/shade";
import { concatFolderName } from "./style";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";

export function interpolate({ colorStart, colorEnd = { r: 0, g: 0, b: 0 }, steps, action }: { colorStart: ColorRGB, colorEnd: ColorRGB, steps: number, action: SetMethod }): Array<ColorRGB> {

    const valueAt = (channelA: number, channelB: number, step: number) => channelA + (channelB - channelA) * step / steps;
    const colorArray: Array<ColorRGB> = [];

    switch (action) {
        case 'SHADE':
            colorEnd = { r: 0, g: 0, b: 0 };
            break;
        case 'TINT':
            colorEnd = { r: 1, g: 1, b: 1 };
            break;
        case 'TONE':
            const average = (colorStart.r+colorStart.g+colorStart.b)/3;
            colorEnd = { r: average, g: average, b: average };
            break;
    }


    for (let s = 1; s < steps + 1; s++) {
        colorArray.push({
            r: clamp(0, valueAt(colorStart.r, colorEnd.r, s), 1),
            g: clamp(0, valueAt(colorStart.g, colorEnd.g, s), 1),
            b: clamp(0, valueAt(colorStart.b, colorEnd.b, s), 1)
        });
    }

    return colorArray;
}


export function createSwatch({folder, set, config:{name}}:Workbench){
    const baseName = name;

    set?.forEach( ({name, color}:Shade) => {
        const newStyle = figma.createPaintStyle();
        newStyle.name = concatFolderName(folder, [baseName,name].join('/'));
        newStyle.paints = DEFAULT_STYLE_COLOR.map( paint => ({...paint, color: color}) );
    })
}