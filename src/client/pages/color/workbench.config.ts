import { Workbench } from "src/types/workbench";
import { TemplateInput } from '@ctypes/templates';
import { MATERIAL_DEFAULT_KEYS } from "@lib/constants";

const basicSidepanelContent: Array<TemplateInput> = [
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            appearance: { label: true },
            portal: {
                key: 'colorname',
                override: false
            }
        },
        configKey: 'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'COLOR',
            value: '#0c8ce9',
            placeholder: 'Color value',
            appearance: { label: true },
            portal: {
                target: 'colorname',
                colorformat: 'NAME'
            }
        },
        configKey: 'colorStart'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'AMOUNT',
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 100],
            appearance: { label: true }
        },
        configKey: 'steps'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Color mode',
            list: [
                { value: 'rgb', receiver: 'STORE' },
                { value: 'hsl', receiver: 'STORE' },
                { value: 'lab', receiver: 'STORE' },
                { value: 'lch', receiver: 'STORE' }
            ],
            appearance: { label: true },
            value:'rgb'
        },
        configKey: 'mode'
    }

];


const materialSidepanelContent: Array<TemplateInput> = [
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Palette',
            list: [
                { value: 'primary', receiver: 'STORE' },
                { value: 'secondary', receiver: 'STORE' },
                { value: 'tertiary', receiver: 'STORE' },
                { value: 'neutral', receiver: 'STORE' },
                { value: 'neutralVariant', receiver: 'STORE' },
                { value: 'error', receiver: 'STORE' }
            ],
            appearance: { label: true },
            value:'primary'
        },
        configKey: 'palette'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            appearance: { label: true },
            portal: {
                key: 'colorname',
                override: false
            }
        },
        configKey: 'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'COLOR',
            value: '#0c8ce9',
            placeholder: 'Color value',
            appearance: { label: true },
            portal: {
                target: 'colorname',
                colorformat: 'NAME'
            }
        },
        configKey: 'colorStart'
    },
    {
        type: 'CHECKBOX',
        attributes: {
            label: 'Preserve primary',
            value: true,
        },
        configKey: 'preserve'
    },
    {
        type: 'INPUT_ARRAY',
        attributes: {
            type: 'NUMBER',
            value: MATERIAL_DEFAULT_KEYS,
            min: 0,
            max: 1000,
            placeholder: 'Shade keys',
            appearance: { label: true }
        },
        configKey: 'keys'
    }
];

const antSidepanelContent: Array<TemplateInput> = [
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            appearance: { label: true },
            portal: {
                key: 'colorname',
                override: false
            }
        },
        configKey: 'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'COLOR',
            value: '#0c8ce9',
            placeholder: 'Color value',
            appearance: { label: true },
            portal: {
                target: 'colorname',
                colorformat: 'NAME'
            }
        },
        configKey: 'colorStart'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Theme',
            list: [
                { value: 'default', receiver: 'STORE' },
                { value: 'dark', receiver: 'STORE' },
            ],
            appearance: { label: true },
            value:'default'
        },
        configKey: 'theme'
    }
];


const mantineSidepanelContent: Array<TemplateInput> = [
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            appearance: { label: true },
            portal: {
                key: 'colorname',
                override: false
            }
        },
        configKey: 'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'COLOR',
            value: '#0c8ce9',
            placeholder: 'Color value',
            appearance: { label: true },
            portal: {
                target: 'colorname',
                colorformat: 'NAME'
            }
        },
        configKey: 'colorStart'
    }
];


const interpolationSidepanelContent: Array<TemplateInput> = [
    {
        type: 'INPUT',
        attributes: {
            value: 'sky',
            placeholder: 'Swatch name',
            appearance: { label: true },
            portal: {
                key: 'colorname',
                override: false
            }
        },
        configKey: 'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'COLOR',
            value: '#0c8ce9',
            placeholder: 'Start value',
            appearance: { label: true },
            portal: {
                target: 'colorname',
                colorformat: 'NAME'
            }
        },
        configKey: 'colorStart'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'COLOR',
            value: '#FFFFFF',
            placeholder: 'End value',
            appearance: { label: true }
        },
        configKey: 'colorEnd'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'AMOUNT',
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 100],
            appearance: { label: true }
        },
        configKey: 'steps'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Color mode',
            list: [
                { value: 'rgb', receiver: 'STORE' },
                { value: 'hsl', receiver: 'STORE' },
                { value: 'lab', receiver: 'STORE' },
                { value: 'lch', receiver: 'STORE' }
            ],
            appearance: { label: true },
            value:'rgb'
        },
        configKey: 'mode'
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


export const CREATE_SWATCH_CONFIG: Workbench = {
    folder: null,
    title: 'Generate a new palette',
    type: 'PAINT',
    sidepanel: {
        options: [
            [
                { value: 'Shades', content: basicSidepanelContent, action: 'SHADE', icon: "shade", receiver: 'STORE' },
                { value: 'Tones', content: basicSidepanelContent, action: 'TONE', icon: "drop", receiver: 'STORE' },
                { value: 'Tints', content: basicSidepanelContent, action: 'TINT', icon: "sun", receiver: 'STORE' },
                { value: 'Interpolation', content: interpolationSidepanelContent, action: 'INTERPOLATION', icon: "interpolation", receiver: 'STORE' }
            ],
            [
                { value: 'Material Design', content: materialSidepanelContent, action: 'MATERIAL', icon: "material design", receiver: 'STORE' },
                { value: 'Ant Design', content: antSidepanelContent, action: 'ANT', icon: "ant", receiver: 'STORE' },
                { value: 'Mantine', content: mantineSidepanelContent, action: 'MANTINE', icon: "mantine", receiver: 'STORE' },
                { value: 'Tailwind', content: mantineSidepanelContent, action: 'TAILWIND', icon: "tailwind", receiver: 'STORE' }
            ]
        ]
    },
    footer: {
        primaryAction: { value: 'Add', action: 'CREATE_SET' }
    },
    config: {}
}

export const EDIT_SWATCH_CONFIG: Workbench = {
    folder: null,
    title: 'Edit current palette',
    type: 'PAINT',
    sidepanel: {
        options: [
            { value: 'Adjustments', content: adjustSidepanelContent, action: 'COLORADJUST', receiver: 'STORE' }
        ]
    },
    footer: {
        primaryAction: { value: 'Edit', action: 'EDIT_SWATCH' }
    },
    config: {}
}