import { ContextMenuCommand } from "@ctypes/contextmenu";
import { TextArrayItem } from "@ctypes/text";
import { TextConfig } from "@ctypes/workbench";
import { DEFAULT_STYLE_TEXT, DEFAULT_TYPEFACE } from "@lib/constants";
import { send } from "@lib/ipc";

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


export function groupFont(fonts: Array<Font>): { [key: string]: TextArrayItem } {

    //transform font to ContextMenuCommand structure
    const fontDico: { [key: string]: TextArrayItem } = {};

    //1. Gather all fonts in dictionary along with their font (bold/reg/light...)
    fonts.forEach(font => {
        const { fontName: { family, style } } = font;

        if (!fontDico[family]) {
            fontDico[family] = {
                family,
                loaded: false,
                style: [style]
            };
        } else {
            fontDico[family].style.push(style);
        }
    });


    return fontDico;
}

function setFontFamily(style: TextStyle, family: string) {
    return {
        ...style,
        fontName: { family, style: style.fontName.style || 'Regular' }
    }
}

function loadFont(config: TextConfig) {

    if (config.typeface || config.typeface !== 'Typeface') {
        send({ action: 'LOAD_FONT', payload: { family: config.typeface, style: 'Regular' } });
    }
}

export function cssTextStyle(style: TextStyle) {

    return {
        fontWeight: convertFontWeight(style.fontName.style),
        fontSize: style.fontSize + 'px',
        letterSpacing: String((style.letterSpacing.value || 0) + convertUnit(style.letterSpacing.unit)),
        lineHeight: String(((style.lineHeight as any).value || '') + convertUnit(style.lineHeight.unit)),
        fontFamily: style.fontName.family
    };
}

export function scale(config: TextConfig): Array<Partial<TextStyle>> {

    loadFont(config);

    const ratio = (scaleString: string): number => {
        const REGEX_RATIO = /([\d]+)\:([\d]+)/;
        const ratio = (scaleString || '').match(REGEX_RATIO);
        const [_, q, d] = ratio || [undefined, undefined, undefined];
        return (q && d) ? Number(d) / Number(q) : 1;
    }

    interface GenVariants {
        amount: number;
        base: Partial<TextStyle>;
        ratio: number;
        method: 'MULTIPLY' | 'DIVIDE';
        round: boolean | undefined;
    }

    const genVariants = ({ amount, base, ratio, method, round }: GenVariants): Array<Partial<TextStyle>> => {
        const variants = [];

        for (let i = 1; i < Number(amount) + 1; i++) {
            const size: number =
                method === 'MULTIPLY' ? (base.fontSize || 16) * (i * (ratio)) :
                    method === 'DIVIDE' ? (base.fontSize || 16) / (i * (ratio)) : base.fontSize || 16;

            variants.push({
                ...base,
                fontSize: round ? Math.floor(size) : Number(size.toFixed(2))
            });
        }

        return variants;
    }

    //set default style (font, )
    const baseText = {
        ...DEFAULT_STYLE_TEXT,
        name: config.name || DEFAULT_STYLE_TEXT.name,
        fontSize: config.baseSize || 16,
        fontName: {
            style: DEFAULT_STYLE_TEXT.fontName?.style || 'Regular',
            family: config.typeface || DEFAULT_TYPEFACE
        }
    };


    //get ascendant/ descendant respective ratios   
    const ascRatio = ratio(config.ascendantScale || '');
    const descRatio = ratio(config.descendantScale || '');

    //generate ascendant font
    const ascFont: Array<Partial<TextStyle>> = genVariants({ amount: config.ascendantSteps || 8, base: baseText, ratio: ascRatio, method: 'MULTIPLY', round: config.roundValue }).reverse();

    //generate descendant font
    const descFont: Array<Partial<TextStyle>> = genVariants({ amount: config.descendantSteps || 4, base: baseText, ratio: descRatio, method: 'DIVIDE', round: config.roundValue });

    //generate descendant font
    return [...ascFont, baseText, ...descFont];
}