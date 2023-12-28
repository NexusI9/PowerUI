import { ColorRGB } from "@ctypes/color";

export function shades({ color, steps }: { color: ColorRGB, steps: number }): Array<ColorRGB> {

    let shadesArray: Array<ColorRGB> = [];
    for (let s = 0; s < steps; s++) {
        shadesArray.push({
            r: 2 * color.r / (255 / steps),
            g: 2 * color.g / (255 / steps),
            b: 2 * color.b / (255 / steps)
        });
    }
    
    console.log(shadesArray);
    return shadesArray;
}