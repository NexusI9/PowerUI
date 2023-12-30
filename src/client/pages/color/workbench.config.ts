import { SidepanelList, Workbench } from "@ctypes/workbench";


const basicSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type:'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            style:{label:true}
        },
        configKey:'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type:'COLOR',
            value: '#0c8ce9',
            placeholder: 'Color value',
            style:{label:true}
        },
        configKey:'colorStart'
    },
    {
        type: 'INPUT',
        attributes: {
            type:'AMOUNT',
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 100],
            style:{label:true}
        },
        configKey:'steps'
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
            style:{label:true}
        },
        configKey:'mode'
    }

];


const materialSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type:'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            style:{label:true}
        },
        configKey:'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type:'COLOR',
            value: '#0c8ce9',
            placeholder: 'Color value',
            style:{label:true}
        },
        configKey:'colorStart'
    },
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
            style:{label:true}
        },
        configKey:'palette'
    }
];

const antSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type:'DEFAULT',
            value: 'blue',
            placeholder: 'Swatch name',
            style:{label:true}
        },
        configKey:'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type:'COLOR',
            value: '#0c8ce9',
            placeholder: 'Color value',
            style:{label:true}
        },
        configKey:'colorStart'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Theme',
            list: [
                { text: 'default' },
                { text: 'dark' },
            ],
            style:{label:true}
        },
        configKey:'theme'
    }
];


const interpolationSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            value: 'sky',
            placeholder: 'Swatch name',
            style:{label:true}
        },
        configKey:'name'
    },
    {
        type: 'INPUT',
        attributes: {
            type:'COLOR',
            value: '#0c8ce9',
            placeholder: 'Start value',
            style:{label:true}
        },
        configKey:'colorStart'
    },
    {
        type: 'INPUT',
        attributes: {
            type:'COLOR',
            value: '#FFFFFF',
            placeholder: 'End value',
            style:{label:true}
        },
        configKey:'colorEnd'
    },
    {
        type: 'INPUT',
        attributes: {
            type:'AMOUNT',
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 100],
            style:{label:true}
        },
        configKey:'steps'
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
            style:{label:true}
        },
        configKey:'mode'
    }
];

export const CREATE_SWATCH_CONFIG: Workbench = {
    folder:'',
    title: 'Create color swatch',
    type:'COLOR',
    sidepanel: {
        options: [
            [
                { text: 'Shades', content: basicSidepanelContent, action:'SHADE' },
                { text: 'Tones', content: basicSidepanelContent, action:'TONE' },
                { text: 'Tints', content: basicSidepanelContent, action:'TINT' },
                { text: 'Interpolation', content: interpolationSidepanelContent, action:'INTERPOLATION' }
            ],
            [
                { text: 'Material Design', content: materialSidepanelContent, action:'MATERIAL'},
                { text: 'Ant Design', content: antSidepanelContent, action:'ANT'}
            ]
        ]
    },
    footer: {
        primaryAction: { text: 'Add', action: 'CREATE_SWATCH' }
    },
    config:{}
}