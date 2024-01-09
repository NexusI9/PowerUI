import { SidepanelInput, Workbench } from "@ctypes/workbench";
import { MATERIAL_DEFAULT_KEYS } from "@lib/constants";

const scaleSidepanelContent: Array<SidepanelInput> = [
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Typeface',
            list: [{ text: 'Typeface', fetch: { action: 'FONT_LIST' }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
            appearance: { label: true }
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
            placeholder: 'Ascendant scale',
            list: [{ text: 'Typeface', fetch: { action: 'FONT_LIST' }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
            appearance: { label: true }
        },
        configKey: 'ascendantScale'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'AMOUNT',
            value: 8,
            placeholder: 'Ascendant steps',
            range: [0, 100],
            appearance: { label: true }
        },
        configKey: 'ascendantSteps'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Descendant scale',
            list: [{ text: 'Typeface', fetch: { action: 'FONT_LIST' }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
            appearance: { label: true }
        },
        configKey: 'descendantScale'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'AMOUNT',
            value: 8,
            placeholder: 'Descendant steps',
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


const materialSidepanelContent: Array<SidepanelInput> = [
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Typeface',
            list: [{ text: 'Typeface', fetch: { action: 'FONT_LIST' }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
            appearance: { label: true }
        },
        configKey: 'typeface'
    }
];

const appleSidepanelContent: Array<SidepanelInput> = [
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Typeface',
            list: [{ text: 'Typeface', fetch: { action: 'FONT_LIST' }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
            appearance: { label: true }
        },
        configKey: 'typeface'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Device',
            list: [
                { text: 'desktop', receiver: 'STORE' },
                { text: 'mobile', receiver: 'STORE' },
            ],
            appearance: { label: true }
        },
        configKey: 'device'
    },
];


const flutterSidepanelContent: Array<SidepanelInput> = [
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Typeface',
            list: [{ text: 'Typeface', fetch: { action: 'FONT_LIST' }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
            appearance: { label: true }
        },
        configKey: 'typeface'
    }
];


const carbonSidepanelContent: Array<SidepanelInput> = [
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Typeface',
            list: [{ text: 'Typeface', fetch: { action: 'FONT_LIST' }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
            appearance: { label: true }
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
            placeholder: 'Ascendant steps',
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
            placeholder: 'Descendant steps',
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

const adjustSidepanelContent: Array<SidepanelInput> = [
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


export const CREATE_SWATCH_CONFIG: Workbench = {
    folder: null,
    title: 'Generate a new font set',
    type: 'TEXT',
    sidepanel: {
        options: [
            [
                { text: 'Scale', content: scaleSidepanelContent, action: 'SCALE', icon: "line-height", receiver: 'STORE' }
            ],
            [
                { text: 'Material Design', content: materialSidepanelContent, action: 'MATERIAL', icon: "material design", receiver: 'STORE' },
                { text: 'Apple', content: appleSidepanelContent, action: 'APPLE', icon: "apple", receiver: 'STORE' },
                { text: 'Flutter', content: flutterSidepanelContent, action: 'FLUTTER', icon: "flutter", receiver: 'STORE' },
                { text: 'Carbon Design', content: carbonSidepanelContent, action: 'CARBON', icon: "carbon", receiver: 'STORE' }
            ]
        ]
    },
    footer: {
        primaryAction: { text: 'Add', action: 'CREATE_SWATCH' }
    },
    config: {}
}

export const EDIT_SWATCH_CONFIG: Workbench = {
    folder: null,
    title: 'Edit current font set',
    type: 'TEXT',
    sidepanel: {
        options: [
            { text: 'Adjustments', content: adjustSidepanelContent, action: 'COLORADJUST', receiver: 'STORE' }
        ]
    },
    footer: {
        primaryAction: { text: 'Edit', action: 'EDIT_FONT_SET' }
    },
    config: {}
}