import { Color, Color as ColorInterface } from '@lib/interfaces';

function to255(color: ColorInterface) {
    const newColor: ColorInterface = { r: 0, g: 0, b: 0 };
    Object.keys(newColor).map((key) => {
        newColor[key as keyof typeof newColor] = Math.floor(color[key as keyof typeof color] * 255);
    });
    return newColor;
}

function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgb(color: ColorInterface): string {
    const newColor = to255(color);
    return `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
}


export function rgbToHex(color: ColorInterface): string {
    const newColor = to255(color);

    return "#" + componentToHex(newColor.r) + componentToHex(newColor.g) + componentToHex(newColor.b);
}


export function hexToRgb(hex:string, normalize:boolean=false): ColorInterface{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16) / (normalize ? 255 : 1),
        g: parseInt(result[2], 16) / (normalize ? 255 : 1),
        b: parseInt(result[3], 16) / (normalize ? 255 : 1)
      } : {r:0,g:0,b:0};
}


export function rgbToHsl({r, g, b}:{r:number, g:number, b:number}){

    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return `hsl(
        ${Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h)}, 
        ${Math.floor(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0))}%,
        ${Math.floor( (100 * (2 * l - s)) / 2)}%)`;

  }; 