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
    //since 'italic' is included in fontName style, need to remove it
    const rawFont = font.replace(/(\s+)?(italic|oblique)/i, '');

    return {
        'Thin': '100',
        'Extra Light': '200',
        'Light': '300',
        'Regular': '400',
        'Medium': '500',
        'Semi Bold': '600',
        'Bold': '700',
        'Extra Bold': '800',
        'Black': '900'
    }[!!rawFont && rawFont || 'Regular'] || font
}

function pxToEm(value: number, baseSize: number = 1): string {
    const emValue = value / baseSize;
    return (emValue % 1 == 0) ? String(emValue) : Number(emValue).toFixed(2);
}

export function cssTextStyle(style: TextSet, output: 'OBJECT' | 'STRING' = 'OBJECT', config?: DevTextConfig): Array<String> | Record<string, any> {

    const lineHeight = roundObjectFloat((style.lineHeight as any)).value || 'auto';
    const letterSpacing = roundObjectFloat((style.letterSpacing as any)).value || 0;
    const percentToPixels = (value: number | string | undefined, unit: string | undefined) => {
        return typeof value === 'number' && (String(unit === 'PERCENT' ? (style.fontSize || 0) * value / 100 : value) + 'px') || value;
    }

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
            'VALUE': percentToPixels(letterSpacing, style.letterSpacing?.unit)
        },
        {
            'OBJECT': 'lineHeight',
            'STRING': 'line-height',
            'VALUE': percentToPixels(lineHeight, style.lineHeight?.unit) //css doen't take % as LineHeight so need to convert % => px
        },
        {
            'OBJECT': 'fontFamily',
            'STRING': 'font-family',
            'VALUE': style.fontName?.family || { family: 'Inter', style: 'Regular' }
        },
        {
            'OBJECT': 'fontStyle',
            'STRING': 'font-style',
            'VALUE': String(style.fontName?.style).match(/italic/i) ? 'italic' : String(style.fontName?.style).match(/oblique/i) ? 'oblique' : 'normal'
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
