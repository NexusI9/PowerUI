import { TextSet } from "@ctypes/text";
import { roundObjectFloat } from "./utils";
import { DevTextConfig } from "@ctypes/dev.template";

export function convertUnit(unit: string): string {
    return {
        'PIXELS': 'px',
        'PERCENT': '%',
        'POINTS': 'pt',
        'PICAS': 'pc',
        'AUTO': 'auto',
        'EM': 'em'
    }[unit] || unit;
}

export function convertFontWeight(font: string): string {
    return {
        'Thin': '100',
        'Extra Light': '200',
        'Light': '300',
        'Regular': '400',
        'Italic':'400',
        'Medium': '500',
        'Semi Bold': '600',
        'Bold': '700',
        'Extra Bold': '800',
        'Black': '900'
    }[font] || font
}

function pxToEm(value: number, baseSize: number = 1): string {
    const emValue = value / baseSize;
    return (emValue % 1 == 0) ? String(emValue) : Number(emValue).toFixed(2);
}

export function cssTextStyle(style: TextSet, output: 'OBJECT' | 'STRING' = 'OBJECT', config?: DevTextConfig): Array<String> | Record<string, any> {

    const lineHeight = roundObjectFloat((style.lineHeight as any)).value || 'auto';
    const letterSpacing = roundObjectFloat((style.letterSpacing as any)).value || 0;

    const attributes = [
        {
            'OBJECT': 'fontWeight',
            'STRING': 'font-weight',
            'VALUE': convertFontWeight(style.fontName?.style || 'Regular')
        },
        {
            'OBJECT': 'fontSize',
            'STRING': 'font-size',
            'VALUE': (config?.unit == 'em') ? `${pxToEm(style.fontSize || 0, config?.basesize || 16)}em` : `${style.fontSize}px`
        },
        {
            'OBJECT': 'letterSpacing',
            'STRING': 'letter-spacing',
            'VALUE': String((letterSpacing || 0) + convertUnit(style.letterSpacing?.unit || "PERCENT"))
        },
        {
            'OBJECT': 'lineHeight',
            'STRING': 'line-height',
            'VALUE': typeof lineHeight === 'number' && (String(style.lineHeight?.unit === 'PERCENT' ? (style.fontSize || 0) * lineHeight / 100 : lineHeight) + 'px') || lineHeight //css doen't take % as LineHeight so need to convert % => px
        },
        {
            'OBJECT': 'fontFamily',
            'STRING': 'font-family',
            'VALUE': style.fontName?.family || { family: 'Inter', style: 'Regular' }
        }
    ];


    const result = {
        'OBJECT': attributes.map(item => ({ [item[output]]: item['VALUE'] })).reduce((prec, curr) => ({ ...prec, ...curr })),
        'STRING': attributes.map(item => `${item[output]}: ${item['VALUE']}`)
    }

    return result[output]
}

export function valueUnitFrom(value: string): { value: number; unit: string; } {
    const split = value.match(/^([\-|\+]?\d+\.?\d*)(\D*|\%)$/);

    const val = split && split[1] || 0;
    const unit = split && split[2] || '';

    const converUnit = {
        '%': 'PERCENT',
        'px': 'PIXELS'
    }[unit] || unit;

    return {
        value: Number(val),
        unit: converUnit
    };
}
