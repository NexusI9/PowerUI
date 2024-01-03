import { SidepanelList, Workbench } from "@ctypes/workbench";
import { MATERIAL_DEFAULT_KEYS } from "@lib/constants";

const basicSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            style: { label: true },
            portal: {
                key: 'colorname',
                override:false
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
            style: { label: true },
            portal: {
                target: 'colorname',
                colorformat:'NAME'
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
            style: { label: true }
        },
        configKey: 'steps'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Color mode',
            list: [
                { text: 'rgb' },
                { text: 'hsl' },
                { text: 'lab' },
                { text: 'lch' }
            ],
            style: { label: true }
        },
        configKey: 'mode'
    }

];


const materialSidepanelContent: Array<SidepanelList> = [
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Palette',
            list: [
                { text: 'primary' },
                { text: 'secondary' },
                { text: 'tertiary' },
                { text: 'neutral' },
                { text: 'neutralVariant' },
                { text: 'error' }
            ],
            style: { label: true }
        },
        configKey: 'palette'
    },
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            style: { label: true },
            portal: {
                key: 'colorname',
                override:false
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
            style: { label: true },
            portal: {
                target: 'colorname',
                colorformat:'NAME'
            }
        },
        configKey: 'colorStart'
    },
    {
        type: 'INPUT_ARRAY',
        attributes: {
            type: 'NUMBER',
            value: MATERIAL_DEFAULT_KEYS,
            min:0,
            max:1000,
            placeholder: 'Shade keys',
            style:{label:true}
        },
        configKey: 'keys'
    }
];

const antSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            style: { label: true },
            portal: {
                key: 'colorname',
                override:false
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
            style: { label: true },
            portal: {
                target: 'colorname',
                colorformat:'NAME'
            }
        },
        configKey: 'colorStart'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Theme',
            list: [
                { text: 'default' },
                { text: 'dark' },
            ],
            style: { label: true }
        },
        configKey: 'theme'
    }
];


const mantineSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type: 'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            style: { label: true },
            portal: {
                key: 'colorname',
                override:false
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
            style: { label: true },
            portal: {
                target: 'colorname',
                colorformat:'NAME'
            }
        },
        configKey: 'colorStart'
    }
];


const interpolationSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            value: 'sky',
            placeholder: 'Swatch name',
            style: { label: true },
            portal: {
                key: 'colorname',
                override:false
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
            style: { label: true },
            portal: {
                target: 'colorname',
                colorformat:'NAME'
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
            style: { label: true }
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
            style: { label: true }
        },
        configKey: 'steps'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Color mode',
            list: [
                { text: 'rgb' },
                { text: 'hsl' },
                { text: 'lab' },
                { text: 'lch' }
            ],
            style: { label: true }
        },
        configKey: 'mode'
    }
];

const adjustSidepanelContent: Array<SidepanelList> = [
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
    folder: '',
    title: 'Generate a new palette',
    type: 'COLOR',
    sidepanel: {
        options: [
            [
                { text: 'Shades', content: basicSidepanelContent, action: 'SHADE', icon: "shade" },
                { text: 'Tones', content: basicSidepanelContent, action: 'TONE', icon: "drop" },
                { text: 'Tints', content: basicSidepanelContent, action: 'TINT', icon: "sun" },
                { text: 'Interpolation', content: interpolationSidepanelContent, action: 'INTERPOLATION', icon: "interpolation" }
            ],
            [
                { text: 'Material Design', content: materialSidepanelContent, action: 'MATERIAL', icon: "material design" },
                { text: 'Ant Design', content: antSidepanelContent, action: 'ANT', icon: "ant" },
                { text: 'Mantine', content: mantineSidepanelContent, action: 'MANTINE', icon: "mantine" },
                { text: 'Tailwind', content: mantineSidepanelContent, action: 'TAILWIND', icon: "tailwind" }
            ]
        ]
    },
    footer: {
        primaryAction: { text: 'Add', action: 'CREATE_SWATCH' }
    },
    config: {}
}

export const EDIT_SWATCH_CONFIG: Workbench = {
    folder: '',
    title: 'Edit current palette',
    type: 'COLOR',
    sidepanel: {
        options: [
            { text: 'Adjustments', content: adjustSidepanelContent, action: 'COLORADJUST' }
        ]
    },
    footer: {
        primaryAction: { text: 'Edit', action: 'EDIT_SWATCH' }
    },
    config: {}
}