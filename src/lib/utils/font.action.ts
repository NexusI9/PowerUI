import { TextSet } from "@ctypes/text";
import { TextConfig } from "@ctypes/workbench.template";
import { DEFAULT_STYLE_TEXT, DEFAULT_TYPEFACE } from "@lib/constants";
import { get } from "@lib/ipc";
import { Set } from "@ctypes/workbench.template";
import WebFont from "webfontloader";

export async function loadFont(typeface: FontName | undefined): Promise<string> {
    console.log({typeface});
    return new Promise((resolve, reject) => {
        if (typeface !== undefined) {
            //Google Font Loading
            try {
                console.log('load web');
                WebFont.load({
                    google: {
                        families: [typeface.family]
                    },
                    active: () => resolve(typeface.family || DEFAULT_TYPEFACE),
                    inactive: () => {
                        console.log('load local');
                        //Load Local Font from server
                        get({ action: 'LOAD_FONT', payload: typeface }).then(e => resolve(e));
                    }
                });
            } catch (_) {
                //console.log(`Coudln\'t load ${typeface.family} (${typeface.style})`);
                resolve(typeface.family || DEFAULT_TYPEFACE);
            }

        } else {
            resolve(DEFAULT_TYPEFACE);
        }

    });
}

async function convertTemplate(template: Array<TextSet>, config: TextConfig): Promise<Set> {

    const typeface = await loadFont({ family: config.typeface || DEFAULT_TYPEFACE, style: 'Regular' });

    return template.map((style, i) => ({
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
    base: TextSet;
    method(base: number, index: number): number;
    round: boolean | undefined;
    indexSuffix?: string;
}

const genVariants = ({ amount, base, method, round, indexSuffix = '' }: GenVariants): Set => {
    const variants: Set = [];
    let lastSize: number = Number(base.fontSize) || 16;
    let realIndex: number = 0;

    for (let i = 2; i < Number(amount) + 2; i++) {
        lastSize = method(lastSize, i);
        realIndex++;
        if (lastSize > 0) {
            variants.push({
                ...base,
                fontSize: round ? Math.floor(lastSize) : Number(lastSize.toFixed(2)),
                index: indexSuffix + realIndex
            });
        }

    }

    return variants;
}

function configToBase(config: TextConfig): TextSet {
    //Assign config custom values to Default style text, and set default value if no values in config
    return {
        ...DEFAULT_STYLE_TEXT,
        name: config.name || DEFAULT_STYLE_TEXT.name as string,
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
export async function scale(config: TextConfig): Promise<Set> {

    await loadFont({ family: config.typeface || DEFAULT_TYPEFACE, style: 'Regular' });

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
    const ascFont: Set = genVariants({
        amount: config.ascendantSteps || 8,
        base: baseText,
        method: (size) => size * ascRatio,
        round: config.roundValue,
        indexSuffix: '+'
    }).reverse();

    //generate descendant font
    const descFont: Set = genVariants({
        amount: config.descendantSteps || 4,
        base: baseText,
        method: (size) => size / descRatio,
        round: config.roundValue,
        indexSuffix: '-'
    });

    //generate descendant font
    return [
        ...ascFont,
        { ...baseText, index: 0 },
        ...descFont
    ];
}

/**
** MATERIAL METHOD
**/
export async function material(config: TextConfig): Promise<Set> {

    const fontTemplate: Array<TextSet> = [
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
            letterSpacing: { value: 0.10, unit: 'PIXELS' }
        },
        //Body
        {
            name: 'Body/Body 1',
            fontName: { family: '', style: 'Regular' },
            fontSize: 16,
            letterSpacing: { value: 0.50, unit: 'PIXELS' }
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
            letterSpacing: { value: 0.40, unit: 'PIXELS' },
        },
        {
            name: 'Body/Overline',
            fontName: { family: '', style: 'Medium' },
            fontSize: 10,
            letterSpacing: { value: 1.5, unit: 'PIXELS' },
            textCase: 'UPPER'
        },

    ]

    return await convertTemplate(fontTemplate, config);
}

/**
** FLUTTER METHOD
**/
export async function flutter(config: TextConfig): Promise<Set> {

    const fontTemplate: Array<TextSet> = [
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

    return await convertTemplate(fontTemplate, config);

}


/**
** APPLE METHOD
**/
export async function apple(config: TextConfig): Promise<Set> {

    const fontTemplate: { [key: string]: Array<TextSet> } = {
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

    return await convertTemplate(fontTemplate[config.device || 'desktop'], config);

}


/**
** CARBON METHOD
**/
export async function carbon(config: TextConfig): Promise<Set> {

    await loadFont({ family: config.typeface || DEFAULT_TYPEFACE, style: 'Regular' });

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

    return [
        ...ascendant,
        { ...baseText, index: 0 },
        ...descendant
    ];
}


