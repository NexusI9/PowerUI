import { SidepanelList, Workbench } from "@ctypes/workbench";


const basicSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type:'DEFAULT',
            value: 'swatch-name',
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
        type: 'AMOUNT',
        attributes: {
            type:'AMOUNT',
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 10],
            style:{label:true}
        },
        configKey:'steps'
    }

];


const interpolationSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            value: 'swatch-name',
            placeholder: 'Swatch name',
            style:{label:true}
        },
        configKey:'name'
    },
    {
        type: 'COLOR',
        attributes: {
            type:'COLOR',
            value: '#0c8ce9',
            placeholder: 'Start value',
            style:{label:true}
        },
        configKey:'colorStart'
    },
    {
        type: 'COLOR',
        attributes: {
            type:'COLOR',
            value: '#FFFFFF',
            placeholder: 'End value',
            style:{label:true}
        },
        configKey:'colorEnd'
    },
    {
        type: 'AMOUNT',
        attributes: {
            type:'AMOUNT',
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 10],
            style:{label:true}
        },
        configKey:'steps'
    },
    {
        type: 'DROPDOWN',
        attributes: {
            placeholder: 'Color mode',
            list: [
                { text: 'RGB', action: '' },
                { text: 'HSL', action: '' },
                { text: 'Lab', action: '' },
                { text: 'Lch', action: '' }
            ],
            style:{label:true}
        },
        configKey:'mode'
    }
];

export const CREATE_SWATCH_CONFIG: Workbench = {
    parent:'root',
    type:'COLOR',
    title: 'Create color swatch',
    sidepanel: {
        options: [
            [
                { text: 'Shades', content: basicSidepanelContent },
                { text: 'Tones', content: basicSidepanelContent },
                { text: 'Tints', content: basicSidepanelContent },
                { text: 'Interpolation', content: interpolationSidepanelContent }
            ],
            [
                { text: 'Material Design', content: basicSidepanelContent }
            ]
        ]
    },
    footer: {
        primaryAction: { text: 'Add', action: '' }
    }
}