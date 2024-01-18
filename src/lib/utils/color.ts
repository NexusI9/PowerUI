import { ColorOutput, ColorHSL } from 'src/types/color';
import { replaceStyle } from './style';
import { DEFAULT_STYLE_PAINT } from '@lib/constants';

function to255(color: RGB | RGBA): RGB | RGBA {
    const alpha = (color as RGBA).a;

    let converted: RGB | RGBA = {
        r: Math.floor(color.r * 255) || 0,
        g: Math.floor(color.g * 255) || 0,
        b: Math.floor(color.b * 255) || 0,
    };

    if (alpha && alpha < 1) {
        converted = { ...converted, a: Math.floor(alpha * 255) || 0 }
    }

    return converted;
}

function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgb(color: RGB | RGBA, output: ColorOutput = 'STRING'): string | RGB | RGBA {
    const newColor = to255(color);
    const alpha = (newColor as RGBA).a;

    switch (output) {
        case 'OBJECT':
            return newColor;
        case 'STRING':
            return (alpha && alpha < 1) ? `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${alpha})` : `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    }

}


export function rgbToHex(color: RGB | RGBA): string {
    const newColor = to255(color);
    const alpha = (newColor as RGBA).a;

    return "#"
        + componentToHex(newColor.r)
        + componentToHex(newColor.g)
        + componentToHex(newColor.b)
        + ((alpha && alpha < 255) ? componentToHex(alpha) : '');
}


export function hexToRgb(hex: string, normalize: boolean = false, output: ColorOutput = 'OBJECT'): RGB | RGBA | string {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

    let rgb: RGB | RGBA = { r: 0, g: 0, b: 0 };

    if (result) {
        rgb = {
            r: parseInt(result[1], 16) / (normalize ? 255 : 1),
            g: parseInt(result[2], 16) / (normalize ? 255 : 1),
            b: parseInt(result[3], 16) / (normalize ? 255 : 1)
        }

        if (result[4] && result[4].toLowerCase() !== "ff") { //alpha match
            rgb = {
                ...rgb,
                a: parseInt(result[4], 16) / (normalize ? 255 : 1)
            }
        }

    }
    switch (output) {
        case 'OBJECT':
            return rgb;
        case 'STRING':
            return (rgb as RGBA).a ? `rgb(${rgb.r},${rgb.g},${rgb.b},${(rgb as RGBA).a})` : `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    }

}


export function rgbToHsl({ r, g, b, a }: { r: number, g: number, b: number, a?: number }, output: ColorOutput = 'STRING', round: boolean = false): string | ColorHSL {


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
            return (a && a < 1) ? `hsla(${h},  ${s}%, ${l}%, ${a})` : `hsl(${h},  ${s}%, ${l}%)`;;

        case 'OBJECT':
            return (a && a < 1) ? { h, s, l, a } : { h, s, l };
    }

};



export function hslToRgb(hsl: ColorHSL, normalize: boolean = false, ouput: 'STRING' | 'OBJECT' = 'OBJECT'): RGB | RGBA | string {

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
            return (hsl.a && hsl.a < 1) ? { r, g, b, a: hsl.a } : { r, g, b };

        case 'STRING':
            return (hsl.a && hsl.a < 1) ? `rgb(${r},${g},${b},${hsl.a})` : `rgb(${r},${g},${b})`;
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


export function colorToPaint(color: RGB): Array<SolidPaint> {
    return [{ ...DEFAULT_STYLE_PAINT, color: color }];
}