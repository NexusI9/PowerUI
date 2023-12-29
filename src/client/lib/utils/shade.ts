import { ColorRGB } from "@ctypes/color";
import { SetMethod } from "@ctypes/workbench";

export function declination({ color, steps, method }: { color: ColorRGB, steps: number, method:SetMethod }): Array<ColorRGB> {

    const colorFunctions = {
        SHADE: (channel: number, step: number):number => 2 * channel / (255 / step),
        TINT: (channel: number, step: number):number => 20 * channel / (255 / step),
        TONE: (channel: number, step: number):number => 20 * channel / (255 / step),
    }

    let colorArray: Array<ColorRGB> = [];
    for (let s = 0; s < steps; s++) {
        colorArray.push({
            r: colorFunctions[method as keyof typeof colorFunctions](color.r, s),
            g: colorFunctions[method as keyof typeof colorFunctions](color.g, s),
            b: colorFunctions[method as keyof typeof colorFunctions](color.b, s)
        });
    }

    console.log(colorArray);
    return colorArray;
}

export function interpolate({colorStart, colorEnd, steps}:{colorStart:ColorRGB, colorEnd:ColorRGB, steps:number}): Array<ColorRGB>{

    return[];
}