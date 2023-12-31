import { ColorRGB, ColorOutput, ColorHSL } from '@ctypes/color';
import { StyleColor, StyleText } from '@ctypes/style';
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


export function hexToRgb(hex: string, normalize: boolean = false, output: ColorOutput = 'OBJECT'): ColorRGB | string {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    let rgb = result ? {
        r: parseInt(result[1], 16) / (normalize ? 255 : 1),
        g: parseInt(result[2], 16) / (normalize ? 255 : 1),
        b: parseInt(result[3], 16) / (normalize ? 255 : 1)
    } : { r: 0, g: 0, b: 0 };

    switch (output) {
        case 'OBJECT':
            return rgb;
        case 'STRING':
            return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    }


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



export function hslToRgb(hsl: ColorHSL, normalize: boolean = false, ouput: 'STRING' | 'OBJECT' = 'OBJECT'): ColorRGB | string {

    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    const hueToRgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    const result = {
        r: Math.max(0, Math.min(r, 1)) * (!normalize ? 255 : 1),
        g: Math.max(0, Math.min(g, 1)) * (!normalize ? 255 : 1),
        b: Math.max(0, Math.min(b, 1)) * (!normalize ? 255 : 1)
    };

    switch (ouput) {
        case 'OBJECT':
            return result;

        case 'STRING':
            return `rgb(${result.r},${result.g},${result.b})`;
    }


}




export function sort_by_hsl(styles: Array<StyleColor>, proprety: 'HUE' | 'BRIGHTNESS' | 'SATURATION' = 'BRIGHTNESS') {

    styles.sort((a, b) => {

        const paint: { a: SolidPaint, b: SolidPaint } = {
            a: a.paints[0] as SolidPaint,
            b: b.paints[0] as SolidPaint
        };

        const lightValues = {
            a: rgbToHsl(paint.a.color, 'OBJECT') as ColorHSL,
            b: rgbToHsl(paint.b.color, 'OBJECT') as ColorHSL
        }

        switch (proprety) {
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