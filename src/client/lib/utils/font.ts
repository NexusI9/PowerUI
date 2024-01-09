import { ContextMenuCommand } from "@ctypes/contextmenu";
import { TextConfig } from "@ctypes/workbench";
import { DEFAULT_STYLE_TEXT, DEFAULT_TYPEFACE } from "@lib/constants";

export function convertUnit(unit: string): string {
    return {
        'PIXELS': 'px',
        'PERCENT': '%',
        'POINTS': 'pt',
        'PICAS': 'pc',
        'AUTO': 'auto'
    }[unit] || unit;
}

export function convertFont(font: string): string {
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


export function groupFont(fonts: Array<Font>): Array<ContextMenuCommand> {

    //transform font to ContextMenuCommand structure
    const fontArray: Array<ContextMenuCommand> = [];
    const fontDico: { [key: string]: Array<string> } = {};

    //1. Gather all fonts in dictionary along with their font (bold/reg/light...)
    fonts.forEach(font => {
        const { fontName: { family, style } } = font;
        if (!fontDico[family]) {
            fontDico[family] = [style];
        } else {
            fontDico[family].push(style);
        }
    });

    //2. Convert dico to array compatible with context menu
    for (let key in fontDico) {
        fontArray.push({
            text: key,
            receiver: 'STORE'
        })
    }

    return fontArray;

}

export function cssTextStyle(style: TextStyle) {

    return {
        fontWeight: convertFont(style.fontName.style),
        fontSize: style.fontSize + 'px',
        letterSpacing: String((style.letterSpacing.value || 0) + convertUnit(style.letterSpacing.unit)),
        lineHeight: String(((style.lineHeight as any).value || '') + convertUnit(style.lineHeight.unit)),
    };
}

export function scale(config: TextConfig): Array<Partial<TextStyle>> {

    const ratio = (scaleString: string): number => {
        const REGEX_RATIO = /([\d]+)\:([\d]+)/;
        const ratio = (scaleString || '').match(REGEX_RATIO);
        const [_, q, d] = ratio || [undefined, undefined, undefined];
        return (q && d) ? Number(q) / Number(d) : 1;
    }

    const genVariants = (amount: number, base: Partial<TextStyle>, ratio: number): Array<Partial<TextStyle>> => {
        const variants = [];
        for (let i = 1; i < Number(amount) + 1; i++) {
            variants.push({
                ...base,
                fontSize: (base.fontSize || 16) * i * ratio
            });
        }
        return variants;
    }

    //set default style (font, )
    const baseText = {
        ...DEFAULT_STYLE_TEXT,
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
    const ascFont: Array<Partial<TextStyle>> = genVariants(config.ascendantSteps || 8, baseText, ascRatio).reverse();

    //generate descendant font
    const descFont: Array<Partial<TextStyle>> = genVariants(config.descendantSteps || 4, baseText, descRatio);

    //generate descendant font
    return [...ascFont, baseText, ...descFont];
}