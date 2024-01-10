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

function convertTemplate(template: Array<Partial<TextStyle>>, config: TextConfig): Array<Partial<TextStyle>> {

    const typeface = config.typeface || DEFAULT_TYPEFACE;
    loadFont(config);

    return template.map(style => ({
        ...DEFAULT_STYLE_TEXT,
        ...style,
        fontName: {
            family: typeface,
            style: style.fontName?.style || 'Regular'
        }
    }));

}

interface GenVariants {
    amount: number;
    base: Partial<TextStyle>;
    method(base: number, index: number): number;
    round: boolean | undefined;
}

const genVariants = ({ amount, base, method, round }: GenVariants): Array<Partial<TextStyle>> => {
    const variants = [];
    let lastSize: number = Number(base.fontSize) || 16;

    for (let i = 2; i < Number(amount) + 2; i++) {
        lastSize = method(lastSize, i);
        if (lastSize > 0) {
            variants.push({
                ...base,
                fontSize: round ? Math.floor(lastSize) : Number(lastSize.toFixed(2))
            });
        }

    }

    return variants;
}

function configToBase(config: TextConfig): Partial<TextStyle> {
    //Assign config custom values to Default style text, and set default value if no values in config
    return {
        ...DEFAULT_STYLE_TEXT,
        name: config.name || DEFAULT_STYLE_TEXT.name,
        fontSize: config.baseSize || 16,
        fontName: {
            style: DEFAULT_STYLE_TEXT.fontName?.style || 'Regular',
            family: config.typeface || DEFAULT_TYPEFACE
        }
    };
}

/**
** SCALE METHOD
**/
export function scale(config: TextConfig): Array<Partial<TextStyle>> {



    loadFont(config);

    const ratio = (scaleString: string): number => {
        const REGEX_RATIO = /([\d]+)\:([\d]+)/;
        const ratio = (scaleString || '').match(REGEX_RATIO);
        const [_, q, d] = ratio || [undefined, undefined, undefined];
        return (q && d) ? Number(d) / Number(q) : 1;
    }


    //set default style (font, )
    const baseText = configToBase(config);


    //get ascendant/ descendant respective ratios   
    const ascRatio = ratio(config.ascendantScale || '');
    const descRatio = ratio(config.descendantScale || '');

    //generate ascendant font
    const ascFont: Array<Partial<TextStyle>> = genVariants({
        amount: config.ascendantSteps || 8,
        base: baseText,
        method: (size) => size * ascRatio,
        round: config.roundValue
    }).reverse();

    //generate descendant font
    const descFont: Array<Partial<TextStyle>> = genVariants({
        amount: config.descendantSteps || 4,
        base: baseText,
        method: (size) => size / descRatio,
        round: config.roundValue
    });

    //generate descendant font
    return [...ascFont, baseText, ...descFont];
}

/**
** MATERIAL METHOD
**/
export function material(config: TextConfig): Array<Partial<TextStyle>> {

    const fontTemplate: Array<Partial<TextStyle>> = [
        //Heading
        {
            name: 'Heading/Heading 1',
            fontName: { family: '', style: 'Light' },
            fontSize: 96,
            letterSpacing: { value: -1.5, unit: 'PIXELS' }
        },
        {
            name: 'Heading/Heading 2',
            fontName: { family: '', style: 'Light' },
            fontSize: 60,
            letterSpacing: { value: -0.5, unit: 'PIXELS' }
        },
        {
            name: 'Heading/Heading 3',
            fontName: { family: '', style: 'Regular' },
            fontSize: 48,
            letterSpacing: { value: 0, unit: 'PIXELS' }
        },
        {
            name: 'Heading/Heading 4',
            fontName: { family: '', style: 'Regular' },
            fontSize: 34,
            letterSpacing: { value: 0.25, unit: 'PIXELS' }
        },
        {
            name: 'Heading/Heading 5',
            fontName: { family: '', style: 'Regular' },
            fontSize: 24,
            letterSpacing: { value: 0, unit: 'PIXELS' }
        },
        {
            name: 'Heading/Heading 6',
            fontName: { family: '', style: 'Medium' },
            fontSize: 20,
            letterSpacing: { value: 0.15, unit: 'PIXELS' }
        },
        {
            name: 'Heading/Subtitle 1',
            fontName: { family: '', style: 'Regular' },
            fontSize: 16,
            letterSpacing: { value: 0.15, unit: 'PIXELS' }
        },
        {
            name: 'Heading/Subtitle 2',
            fontName: { family: '', style: 'Medium' },
            fontSize: 14,
            letterSpacing: { value: 0.1, unit: 'PIXELS' }
        },
        //Body
        {
            name: 'Body/Body 1',
            fontName: { family: '', style: 'Regular' },
            fontSize: 16,
            letterSpacing: { value: 0.5, unit: 'PIXELS' }
        },
        {
            name: 'Body/Body 2',
            fontName: { family: '', style: 'Regular' },
            fontSize: 14,
            letterSpacing: { value: 0.25, unit: 'PIXELS' }
        },
        {
            name: 'Body/Button',
            fontName: { family: '', style: 'Medium' },
            fontSize: 14,
            letterSpacing: { value: 1.25, unit: 'PIXELS' },
            textCase: 'UPPER'
        },
        {
            name: 'Body/Caption',
            fontName: { family: '', style: 'Medium' },
            fontSize: 12,
            letterSpacing: { value: 0.4, unit: 'PIXELS' },
        },
        {
            name: 'Body/Overline',
            fontName: { family: '', style: 'Medium' },
            fontSize: 10,
            letterSpacing: { value: 1.5, unit: 'PIXELS' },
            textCase: 'UPPER'
        },

    ]

    return convertTemplate(fontTemplate, config);
}

/**
** FLUTTER METHOD
**/
export function flutter(config: TextConfig): Array<Partial<TextStyle>> {

    const fontTemplate: Array<Partial<TextStyle>> = [
        //Display
        {
            name: 'Display/Display Large',
            fontSize: 57,
            lineHeight: { value: 64, unit: 'PIXELS' },
        },
        {
            name: 'Display/Display Medium',
            fontSize: 45,
            lineHeight: { value: 52, unit: 'PIXELS' },
        },
        {
            name: 'Display/Display Small',
            fontSize: 36,
            lineHeight: { value: 44, unit: 'PIXELS' },
        },
        //Headline
        {
            name: 'Headline/Headline Large',
            fontSize: 32,
            lineHeight: { value: 40, unit: 'PIXELS' },
        },
        {
            name: 'Headline/Headline Medium',
            fontSize: 28,
            lineHeight: { value: 36, unit: 'PIXELS' },
        },
        {
            name: 'Headline/Headline Small',
            fontSize: 28,
            lineHeight: { value: 36, unit: 'PIXELS' },
        },
        //Title
        {
            name: 'Title/Title Large',
            fontSize: 22,
            lineHeight: { value: 28, unit: 'PIXELS' },
            fontName: { family: '', style: 'Medium' },
        },
        {
            name: 'Title/Title Medium',
            fontSize: 16,
            lineHeight: { value: 24, unit: 'PIXELS' },
            fontName: { family: '', style: 'Medium' },
            letterSpacing: { value: 0.15, unit: 'PIXELS' }
        },
        {
            name: 'Title/Title Small',
            fontSize: 14,
            lineHeight: { value: 20, unit: 'PIXELS' },
            fontName: { family: '', style: 'Medium' },
            letterSpacing: { value: 0.1, unit: 'PIXELS' }
        },
        //Label
        {
            name: 'Label/Label Large',
            fontSize: 14,
            lineHeight: { value: 20, unit: 'PIXELS' },
            fontName: { family: '', style: 'Medium' },
            letterSpacing: { value: 0.1, unit: 'PIXELS' }
        },
        {
            name: 'Label/Label Medium',
            fontSize: 12,
            lineHeight: { value: 16, unit: 'PIXELS' },
            fontName: { family: '', style: 'Medium' },
            letterSpacing: { value: 0.5, unit: 'PIXELS' }
        },
        {
            name: 'Label/Label Small',
            fontSize: 11,
            lineHeight: { value: 16, unit: 'PIXELS' },
            fontName: { family: '', style: 'Medium' },
            letterSpacing: { value: 0.5, unit: 'PIXELS' }
        },
        //Body
        {
            name: 'Body/Body Large',
            fontSize: 16,
            lineHeight: { value: 24, unit: 'PIXELS' },
            letterSpacing: { value: 0.15, unit: 'PIXELS' }
        },
        {
            name: 'Body/Body Medium',
            fontSize: 14,
            lineHeight: { value: 20, unit: 'PIXELS' },
            letterSpacing: { value: 0.25, unit: 'PIXELS' }
        },
        {
            name: 'Body/Body Small',
            fontSize: 12,
            lineHeight: { value: 16, unit: 'PIXELS' },
            letterSpacing: { value: 0.4, unit: 'PIXELS' }
        }
    ]

    return convertTemplate(fontTemplate, config);

}


/**
** APPLE METHOD
**/
export function apple(config: TextConfig): Array<Partial<TextStyle>> {

    const fontTemplate: { [key: string]: Array<Partial<TextStyle>> } = {
        //DESKTOP
        'desktop': [
            //Title
            {
                name: 'Title/Large Title',
                fontSize: 26,
                lineHeight: { value: 32, unit: 'PIXELS' }
            },
            {
                name: 'Title/Title 1',
                fontSize: 22,
                lineHeight: { value: 26, unit: 'PIXELS' }
            },
            {
                name: 'Title/Title 2',
                fontSize: 17,
                lineHeight: { value: 22, unit: 'PIXELS' }
            },
            {
                name: 'Title/Title 3',
                fontSize: 15,
                lineHeight: { value: 20, unit: 'PIXELS' }
            },
            {
                name: 'Title/Headline',
                fontSize: 13,
                lineHeight: { value: 16, unit: 'PIXELS' },
                fontName: { family: '', style: 'Bold' }
            },
            //Body
            {
                name: 'Body/Body',
                fontSize: 13,
                lineHeight: { value: 16, unit: 'PIXELS' }
            },
            {
                name: 'Body/Callout',
                fontSize: 12,
                lineHeight: { value: 15, unit: 'PIXELS' }
            },
            {
                name: 'Body/Subheadline',
                fontSize: 11,
                lineHeight: { value: 14, unit: 'PIXELS' }
            },
            {
                name: 'Body/Footnote',
                fontSize: 10,
                lineHeight: { value: 13, unit: 'PIXELS' }
            },
            {
                name: 'Body/Caption 1',
                fontSize: 10,
                lineHeight: { value: 13, unit: 'PIXELS' }
            },
            {
                name: 'Body/Caption 2',
                fontSize: 10,
                lineHeight: { value: 13, unit: 'PIXELS' },
                fontName: { family: '', style: 'Medium' }
            },

        ],
        //MOBILE
        'mobile': [
            //Title
            {
                name: 'Title/Large Title',
                fontSize: 34,
            },
            {
                name: 'Title/Title 1',
                fontSize: 28,
            },
            {
                name: 'Title/Title 1',
                fontSize: 22,
            },
            {
                name: 'Title/Title 1',
                fontSize: 20,
            },
            {
                name: 'Title/Headline',
                fontSize: 17,
                fontName: { family: '', style: 'Semi Bold' }
            },
            {
                name: 'Body/Body',
                fontSize: 17,
            },
            {
                name: 'Body/Callout',
                fontSize: 16,
            },
            {
                name: 'Body/Subhead',
                fontSize: 15,
            },
            {
                name: 'Body/Footnote',
                fontSize: 13,
            },
            {
                name: 'Body/Caption 1',
                fontSize: 12,
            },
            {
                name: 'Body/Caption 2',
                fontSize: 11,
            }
        ]

    }

    return convertTemplate(fontTemplate[config.device || 'desktop'], config);

}


/**
** CARBON METHOD
**/
export function carbon(config: TextConfig): Array<Partial<TextStyle>> {

    const baseText = configToBase(config);

    const ascendant = genVariants({
        amount: config.ascendantSteps || 8,
        base: baseText,
        method: (size, index) => size + (Math.floor((index - 2) / 4) + 1) * 2,
        round: true
    }).reverse();

    const descendant = genVariants({
        amount: config.descendantSteps || 4,
        base: baseText,
        method: (size, index) => Math.max(0, size - (Math.floor((index - 2) / 4) + 1) * 2),
        round: true
    });

    //generate ascendant
    /*for (let i = 2; i < (config.ascendantSteps || 8) + 2; i++) {
        lastSize = lastSize + (Math.floor((i - 2) / 4) + 1) * 2;
        console.log({ i, lastSize });
    }*/

    //generate descendant;

    return [...ascendant, baseText, ...descendant];
}