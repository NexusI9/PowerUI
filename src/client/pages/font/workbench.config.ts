import { DEFAULT_TYPEFACE } from "@lib/constants";
import { ContextMenuCommand } from "src/types/contextmenu";
import { Workbench } from "src/types/workbench";
import { SidepanelOption, TemplateInput } from '@ctypes/templates';

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
    {
        type: 'HEADING',
        attributes: { value: 'Settings' }
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Typeface',
            list: [
                { value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }
            ],
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
        type: 'DROPDOWN',
        attributes: {
            placeholder: '↑ Ascendant scale',
            list: SCALES_COMMAND,
            appearance: { label: true },
            value: DEFAULT_TYPEFACE
        },
        configKey: 'ascendantScale'
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
        type: 'DROPDOWN',
        attributes: {
            placeholder: '↓ Descendant scale',
            list: SCALES_COMMAND,
            appearance: { label: true },
            value: DEFAULT_TYPEFACE
        },
        configKey: 'descendantScale'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'AMOUNT',
            value: 3,
            placeholder: '↓ Descendant steps',
            range: [0, 100],
            appearance: { label: true }
        },
        configKey: 'descendantSteps'
    },
    {
        type: 'CHECKBOX',
        attributes: {
            label: 'Round values',
            value: true,
        },
        configKey: 'roundValue'
    }

];


const materialSidepanelContent: Array<TemplateInput> = [
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
];

const appleSidepanelContent: Array<TemplateInput> = [
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
];


const flutterSidepanelContent: Array<TemplateInput> = [
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
];


const carbonSidepanelContent: Array<TemplateInput> = [
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
];

const adjustSidepanelContent: Array<TemplateInput> = [
    {
        type: 'SLIDER',
        attributes: {
            background: 'linear-gradient( 89.7deg, rgba(223,0,0,1) 2.7%, rgba(214,91,0,1) 15.1%, rgba(233,245,0,1) 29.5%, rgba(23,255,17,1) 45.8%, rgba(29,255,255,1) 61.5%, rgba(5,17,255,1) 76.4%, rgba(202,0,253,1) 92.4% )',
            placeholder: 'Hue',
            range: [-1, 1],
            value: 0
        },
        configKey: 'hue'
    },
    {
        type: 'SLIDER',
        attributes: {
            background: 'linear-gradient(90deg, #979797 0%, #F00 100%)',
            placeholder: 'Saturation',
            range: [-1, 1],
            value: 0
        },
        configKey: 'saturation'
    },
    {
        type: 'SLIDER',
        attributes: {
            background: 'linear-gradient(90deg, #BDBDBD 0%, #2F2F2F 100%)',
            placeholder: 'Contrast',
            range: [-1, 1],
            value: 0
        },
        configKey: 'contrast'
    },
    {
        type: 'SLIDER',
        attributes: {
            background: 'linear-gradient(90deg, #000 0%, #FFF 100%)',
            placeholder: 'Brightness',
            range: [-1, 1],
            value: 0
        },
        configKey: 'brightness'
    },
    {
        type: 'SLIDER',
        attributes: {
            background: 'linear-gradient(90deg, #0075FF 0%, #F90 100%)',
            placeholder: 'Temperature',
            range: [-1, 1],
            value: 0
        },
        configKey: 'temperature'
    },
    /*{
        type: 'SLIDER',
        attributes: {
            background:'linear-gradient(90deg, #3F0 0%, #FF00E5 100%)',
            placeholder: 'Tint'
        },
        configKey:'tint'
    },*/
];


export const CREATE_FONT_SET_CONFIG: Workbench = {
    reducer:'workbench',
    folder: null,
    title: 'Generate a new font set',
    type: 'TEXT',
    sidepanel: {
        options: [
            [
                { value: 'Scale', content: [scaleSidepanelContent], action: 'SCALE', icon: "line-height", receiver: 'STORE', heading: 'Template type' }
            ],
            [
                { value: 'Material Design', content: [materialSidepanelContent], action: 'MATERIAL', icon: "material design", receiver: 'STORE', heading: 'Template type' },
                { value: 'Apple', content: [appleSidepanelContent], action: 'APPLE', icon: "apple", receiver: 'STORE', heading: 'Template type' },
                { value: 'Flutter', content: [flutterSidepanelContent], action: 'FLUTTER', icon: "flutter", receiver: 'STORE', heading: 'Template type' },
                { value: 'Carbon Design', content: [carbonSidepanelContent], action: 'CARBON', icon: "carbon", receiver: 'STORE', heading: 'Template type' }
            ]
        ]
    },
    footer: {
        primaryAction: { value: 'Add', action: 'CREATE_SET' }
    }
}

export const EDIT_SWATCH_CONFIG: Workbench = {
    reducer:'workbench',
    folder: null,
    title: 'Edit current font set',
    type: 'TEXT',
    sidepanel: {
        options: [
            { value: 'Adjustments', content: adjustSidepanelContent, action: 'COLORADJUST', receiver: 'STORE' }
        ]
    },
    footer: {
        primaryAction: { value: 'Edit', action: 'EDIT_FONT_SET' }
    }
}