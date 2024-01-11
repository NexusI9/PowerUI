import { ColorRGB, ColorOutput, ColorHSL } from 'src/types/color';
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


export function rgbToHsl({ r, g, b }: { r: number, g: number, b: number }, output: ColorOutput = 'STRING', round: boolean = false): string | ColorHSL {


    const vmax = Math.max(r, g, b), vmin = Math.min(r, g, b);
    let h = (vmax + vmin) / 2;
    let s = (vmax + vmin) / 2;
    let l = (vmax + vmin) / 2;

    if (vmax === vmin) {
        h = 0;
        s = 0; // achromatic
    } else {
        const d = vmax - vmin;
        s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
        if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
        if (vmax === g) h = (b - r) / d + 2;
        if (vmax === b) h = (r - g) / d + 4;
        h /= 6;
    }

    if (round) {
        h = Math.floor(h * 360);
        s = Math.floor(s * 100);
        l = Math.floor(l * 100);
    }

    switch (output) {

        case 'STRING':
            return `hsl(${h},  ${s}%, ${l}%)`;
        case 'OBJECT':
            return { h, s, l };
    }

};



export function hslToRgb(hsl: ColorHSL, normalize: boolean = false, ouput: 'STRING' | 'OBJECT' = 'OBJECT'): ColorRGB | string {

    function hueToRgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    const { h, s, l } = hsl;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3) || 0;
        g = hueToRgb(p, q, h) || 0;
        b = hueToRgb(p, q, h - 1 / 3) || 0;
    }

    switch (ouput) {
        case 'OBJECT':
            return { r, g, b };

        case 'STRING':
            return `rgb(${r},${g},${b})`;
    }


}




export function sort_by_hsl(styles: Array<PaintStyle>, proprety: 'HUE' | 'BRIGHTNESS' | 'SATURATION' = 'BRIGHTNESS') {

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