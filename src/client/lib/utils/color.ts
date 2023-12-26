import { ColorRGB, ColorOutput, StyleColor, StyleText, ColorHSL } from '@ctypes/contextmenu';
import { replaceStyle } from './style';

function to255(color: ColorRGB) {
    const newColor: ColorRGB = { r: 0, g: 0, b: 0 };
    Object.keys(newColor).map((key) => {
        newColor[key as keyof typeof newColor] = Math.floor(color[key as keyof typeof color] * 255);
    });
    return newColor;
}

function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgb(color: ColorRGB, output: ColorOutput = 'STRING'): string | ColorRGB {
    const newColor = to255(color);
    switch (output) {
        case 'OBJECT':
            return { r: newColor.r, g: newColor.g, b: newColor.b };
        case 'STRING':
            return `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    }

}


export function rgbToHex(color: ColorRGB): string {
    const newColor = to255(color);

    return "#" + componentToHex(newColor.r) + componentToHex(newColor.g) + componentToHex(newColor.b);
}


export function hexToRgb(hex: string, normalize: boolean = false): ColorRGB {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16) / (normalize ? 255 : 1),
        g: parseInt(result[2], 16) / (normalize ? 255 : 1),
        b: parseInt(result[3], 16) / (normalize ? 255 : 1)
    } : { r: 0, g: 0, b: 0 };
}


export function rgbToHsl({ r, g, b }: { r: number, g: number, b: number }, output: ColorOutput = 'STRING'): string | ColorHSL {

    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;

    const result: ColorHSL = {
        h: Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h),
        s: Math.floor(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
        l: Math.floor((100 * (2 * l - s)) / 2)
    };

    switch (output) {

        case 'STRING':
            return `hsl(${result.h},  ${result.s}%, ${result.l}%)`;
        case 'OBJECT':
            return result;
    }


};




export function sort_by_hsl(styles: Array<StyleColor>, proprety:'HUE'|'BRIGHTNESS'|'SATURATION'='BRIGHTNESS') {

    styles.sort((a, b) => {

        const paint:{a:SolidPaint, b: SolidPaint} = { 
            a: a.paints[0] as SolidPaint, 
            b: b.paints[0] as SolidPaint
        };

        const lightValues = { 
            a: rgbToHsl(paint.a.color, 'OBJECT') as ColorHSL,
            b: rgbToHsl(paint.b.color, 'OBJECT') as ColorHSL
        }

        switch(proprety){
            case 'HUE':
                return lightValues.a.h > lightValues.b.h ? 1 : -1
            case 'BRIGHTNESS':
                return lightValues.a.l > lightValues.b.l ? 1 : -1
            case 'SATURATION':
                return lightValues.a.s > lightValues.b.s ? 1 : -1
        }


    });

    replaceStyle(styles);


}