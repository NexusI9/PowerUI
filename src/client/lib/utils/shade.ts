import { ColorRGB } from "@ctypes/color";
import { SetMethod } from "@ctypes/workbench";

export function declination({ color, steps, action }: { color: ColorRGB, steps: number, action:SetMethod }): Array<ColorRGB> {

    const colorFunctions:Partial<{[key in SetMethod]:any}> = {
        SHADE: (channel: number, step: number):number => channel /  step,
        TINT: (channel: number, step: number):number => step * channel,
        TONE: (channel: number, step: number):number => 20 * channel / step
    }

    let colorArray: Array<ColorRGB> = [];
    for (let s = 1; s < steps+1; s++) {
        colorArray.push({
            r: colorFunctions[action as keyof typeof colorFunctions](color.r, s),
            g: colorFunctions[action as keyof typeof colorFunctions](color.g, s),
            b: colorFunctions[action as keyof typeof colorFunctions](color.b, s)
        });
    }

    return colorArray;
}

export function interpolate({colorStart, colorEnd, steps}:{colorStart:ColorRGB, colorEnd:ColorRGB, steps:number}): Array<ColorRGB>{

    return[];
}