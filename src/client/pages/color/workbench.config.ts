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
    }

];


const interpolationSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            value: 'swatch-name',
            placeholder: 'Swatch name',
            style:{label:true}
        }
    },
    {
        type: 'COLOR',
        attributes: {
            type:'COLOR',
            value: '#000000',
            placeholder: 'Start value',
            style:{label:true}
        }
    },
    {
        type: 'COLOR',
        attributes: {
            type:'COLOR',
            value: '#FFFFFF',
            placeholder: 'End value',
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
            placeholder: 'Color mode',
            list: [
                { text: 'RGB', action: '' },
                { text: 'HSL', action: '' },
                { text: 'Lab', action: '' },
                { text: 'Lch', action: '' }
            ],
            style:{label:true}
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