import { TextSet } from "@ctypes/text";
import { roundObjectFloat } from "./utils";

export function convertUnit(unit: string): string {
    return {
        'PIXELS': 'px',
        'PERCENT': '%',
        'POINTS': 'pt',
        'PICAS': 'pc',
        'AUTO': 'auto'
    }[unit] || unit;
}

export function convertFontWeight(font: string): string {
    return {
        'Thin': '100',
        'Extra Light': '200',
        'Light': '300',
        'Regular': '400',
        'Semi Bold': '600',
        'Bold': '700',
        'Extra Bold': '800',
        'Black': '900'
    }[font] || font
}

export function cssTextStyle(style: TextSet, output: 'OBJECT' | 'STRING' = 'OBJECT') {

    const lineHeight = roundObjectFloat((style.lineHeight as any)).value;
    const letterSpacing = roundObjectFloat((style.letterSpacing as any)).value;
    const attributes = [
        {
            'OBJECT': 'fontWeight',
            'STRING': 'font-weight',
            'VALUE': convertFontWeight(style.fontName?.style || 'Regular')
        },
        {
            'OBJECT': 'fontSize',
            'STRING': 'font-size',
            'VALUE': style.fontSize + 'px'
        },
        {
            'OBJECT': 'letterSpacing',
            'STRING': 'letter-spacing',
            'VALUE': String((letterSpacing || 0) + convertUnit(style.letterSpacing?.unit || "PERCENT"))
        },
        {
            'OBJECT': 'lineHeight',
            'STRING': 'line-height',
            'VALUE': String((lineHeight || '') + convertUnit(style.lineHeight?.unit || "PERCENT"))
        },
        {
            'OBJECT': 'fontFamily',
            'STRING': 'font-family',
            'VALUE': style.fontName?.family || { family: 'Inter', style: 'Regular' }
        }
    ];


    return attributes.map(item => ({ [item[output]]: item['VALUE'] })).reduce((curr, prec) => ({ ...prec, ...curr }));
}

export function valueUnitFrom(value: string): { value: number; unit: string; } {
    const split = value.match(/^([\-|\+]?\d+\.?\d*)(\D*|\%)$/);

    const val = split && split[1] || 0;
    const unit = split && split[2] || '';

    const converUnit = {
        '%': 'PERCENT',
        'px': 'PIXELS'
    }[unit] || '';

    return {
        value: Number(val),
        unit: converUnit
    };
}
