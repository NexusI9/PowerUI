import { SidepanelList, Workbench } from "@ctypes/workbench";


const basicSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            type:'DEFAULT',
            value: 'swatch-name',
            placeholder: 'Swatch name',
            style:{label:true}
        }
    },
    {
        type: 'INPUT',
        attributes: {
            type:'COLOR',
            value: '#000000',
            placeholder: 'Color value',
            style:{label:true}
        }
    },
    {
        type: 'AMOUNT',
        attributes: {
            type:'AMOUNT',
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 10],
            style:{label:true}
        }
    },
    {
        type: 'DROPDOWN',
        attributes: {
            value: 10,
            placeholder: 'Color mode',
            list: [
                { text: 'RGB', action: '' },
                { text: 'HSL', action: '' },
                { text: 'Lab', action: '' },
                { text: 'Lch', action: '' }
            ]
        }
    }

];


const interpolationSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            value: 'swatch-name',
            placeholder: 'Swatch name',
        }
    },
    {
        type: 'COLOR',
        attributes: {
            value: '#000000',
            placeholder: 'Start value',
        }
    },
    {
        type: 'COLOR',
        attributes: {
            value: '#FFFFFF',
            placeholder: 'End value',
        }
    },
    {
        type: 'AMOUNT',
        attributes: {
            value: 10,
            placeholder: 'Swatch steps',
            range: [1, 10]
        }
    }
];

export const CREATE_SWATCH_CONFIG: Workbench = {
    parent:'root',
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
    content: {},
    footer: {
        primaryAction: { text: 'Add', action: '' }
    }
}