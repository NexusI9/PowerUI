import { DEFAULT_TYPEFACE } from "@lib/constants";
import { ContextMenuCommand } from "src/types/contextmenu";
import { Workbench } from "@ctypes/workbench.template";
import { SidepanelOption, TemplateInput } from '@ctypes/template';

const SCALES_COMMAND: Array<ContextMenuCommand> = [
    { value: 'minor second (15:16)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'major second (8:9)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'minor third (5:6)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'major third (4:5)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'perfect fourth (3:4)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'aug. fourth / dim. fifth (1:√2)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'perfect fifth (2:3)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'minor sixth (5:8)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'golden ratio (1:1.618)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'major sixth (3:5)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'minor seventh (9:16)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'major seventh (8:15)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'octave (1:2)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'major tenth (2:5)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'major eleventh (3:8)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'major twelfth (1:3)', action: 'UPDATE_SCALE', receiver: 'STORE' },
    { value: 'double octave (1:4)', action: 'UPDATE_SCALE', receiver: 'STORE' },
]

const scaleSidepanelContent: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Settings' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: 'Typeface',
                list: [{ value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
                appearance: { label: true },
                value: DEFAULT_TYPEFACE
            },
            configKey: 'typeface'
        },
        {
            type: 'INPUT',
            attributes: {
                type: 'AMOUNT',
                value: 16,
                placeholder: 'Base size',
                range: [1, 1000],
                appearance: { label: true }
            },
            configKey: 'baseSize'
        }
    ],
    [
        {
            type: 'HEADING',
            attributes: { value: 'Ascendant' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: '↑ Scale',
                list: SCALES_COMMAND,
                appearance: { label: true },
                value: 'Minor second (15:16)'
            },
            configKey: 'ascendantScale'
        },
        {
            type: 'INPUT',
            attributes: {
                type: 'AMOUNT',
                value: 8,
                placeholder: '↑ Steps',
                range: [0, 100],
                appearance: { label: true }
            },
            configKey: 'ascendantSteps'
        }
    ],
    [
        {
            type: 'HEADING',
            attributes: { value: 'Descendant' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: '↓ Scale',
                list: SCALES_COMMAND,
                appearance: { label: true },
                value: 'Minor second (15:16)'
            },
            configKey: 'descendantScale'
        },
        {
            type: 'INPUT',
            attributes: {
                type: 'AMOUNT',
                value: 3,
                placeholder: '↓ Steps',
                range: [0, 100],
                appearance: { label: true }
            },
            configKey: 'descendantSteps'
        },
    ],
    [
        {
            type: 'CHECKBOX',
            attributes: {
                label: 'Round values',
                value: true,
            },
            configKey: 'roundValue'
        }
    ]
];


const materialSidepanelContent: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Settings' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: 'Typeface',
                list: [{ value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
                appearance: { label: true },
                value: DEFAULT_TYPEFACE
            },
            configKey: 'typeface'
        }
    ]
];

const appleSidepanelContent: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Settings' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: 'Typeface',
                list: [{ value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
                appearance: { label: true },
                value: DEFAULT_TYPEFACE
            },
            configKey: 'typeface'
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: 'Device',
                list: [
                    { value: 'desktop', receiver: 'STORE' },
                    { value: 'mobile', receiver: 'STORE' },
                ],
                appearance: { label: true },
                value: 'desktop'
            },
            configKey: 'device'
        },
    ]
];


const flutterSidepanelContent: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Settings' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: 'Typeface',
                list: [{ value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
                appearance: { label: true },
                value: DEFAULT_TYPEFACE
            },
            configKey: 'typeface'
        }
    ]
];


const carbonSidepanelContent: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Settings' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: 'Typeface',
                list: [{ value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
                appearance: { label: true },
                value: DEFAULT_TYPEFACE
            },
            configKey: 'typeface'
        },
        {
            type: 'INPUT',
            attributes: {
                type: 'AMOUNT',
                value: 16,
                placeholder: 'Base size',
                range: [1, 1000],
                appearance: { label: true }
            },
            configKey: 'baseSize'
        },
        {
            type: 'INPUT',
            attributes: {
                type: 'AMOUNT',
                value: 8,
                placeholder: '↑ Ascendant steps',
                range: [0, 100],
                appearance: { label: true }
            },
            configKey: 'ascendantSteps'
        },
        {
            type: 'INPUT',
            attributes: {
                type: 'AMOUNT',
                value: 8,
                placeholder: '↓ Descendant steps',
                range: [0, 100],
                appearance: { label: true }
            },
            configKey: 'descendantSteps'
        }
    ]
];

const adjustSidepanelContent: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Typeface' }
        },
        {
            type: 'DROPDOWN',
            attributes: {
                placeholder: 'Replace typeface',
                list: [{ value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
                appearance: { label: true },
                value: DEFAULT_TYPEFACE
            },
            configKey: 'typeface'
        },
    ], [
        {
            type: 'HEADING',
            attributes: { value: 'Scale' }
        },
        {
            type: 'SLIDER',
            attributes: {
                background: 'var(--figma-color-bg-hover)',
                placeholder: 'Scale adjustement',
                range: [-100, 100],
                value: 0
            },
            configKey: 'fontScale'
        },
        {
            type: 'CHECKBOX',
            attributes: {
                label: 'Round values',
                value: true,
            },
            configKey: 'roundValue'
        }
    ]
];


export const CREATE_FONT_SET_CONFIG: Workbench = {
    reducer: 'workbench',
    title: 'Generate a new font set',
    type: 'TEXT',
    sidepanel: {
        options: [
            [
                { value: 'Scale', content: scaleSidepanelContent, action: 'SCALE', icon: "line-height", receiver: 'STORE', heading: 'Template type' }
            ],
            [
                { value: 'Material Design', content: materialSidepanelContent, action: 'MATERIAL', icon: "material design", receiver: 'STORE', heading: 'Template type' },
                { value: 'Apple', content: appleSidepanelContent, action: 'APPLE', icon: "apple", receiver: 'STORE', heading: 'Template type' },
                { value: 'Flutter', content: flutterSidepanelContent, action: 'FLUTTER', icon: "flutter", receiver: 'STORE', heading: 'Template type' },
                { value: 'Carbon Design', content: carbonSidepanelContent, action: 'CARBON', icon: "carbon", receiver: 'STORE', heading: 'Template type' },
                { value: 'Primer Design', content: materialSidepanelContent, action: 'PRIMER', icon: "github", receiver: 'STORE', heading: 'Template type' },
                { value: 'Clarity Design', content: materialSidepanelContent, action: 'CLARITY', icon: "clarity", receiver: 'STORE', heading: 'Template type' },
            ]
        ]
    },
    footer: {
        primaryAction: { value: 'Add', action: 'CREATE_SET', destroy: true }
    }
}

export const EDIT_FONT_CONFIG: Workbench = {
    reducer: 'workbench',
    title: 'Global font edit',
    type: 'TEXT',
    sidepanel: {
        options: [
            { value: 'Adjustments', content: adjustSidepanelContent, action: 'TEXTADJUST', receiver: 'STORE' }
        ]
    },
    footer: {
        primaryAction: { value: 'Edit', action: 'EDIT_FONT_SET', destroy: true }
    }
}