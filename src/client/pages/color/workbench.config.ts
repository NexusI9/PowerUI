import { SidepanelList, Workbench } from "@ctypes/workbench";


const basicSidepanelContent: Array<SidepanelList> = [
    {
        type: 'INPUT',
        attributes: {
            value: 'swatch-name',
            placeholder: 'Swatch name',
            onBlur: () => 0,
            onEnter: () => 0
        }
    },
    {
        type: 'COLOR',
        attributes: {
            value: '#000000',
            placeholder: 'Color value',
            onBlur: () => 0,
            onEnter: () => 0
        }
    },
    {
        type: 'AMOUNT',
        attributes: {
            value: 10,
            placeholder: 'Swatch steps',
            onBlur: () => 0,
            onEnter: () => 0,
            range: [1, 10]
        }
    },
    {
        type: 'DROPDOWN',
        attributes: {
            value: 10,
            placeholder: 'Color mode',
            onBlur: () => 0,
            onEnter: () => 0,
            list:[
                {text:'RGB', onClick: () => 0},
                {text:'HSL', onClick: () => 0},
                {text:'Lab', onClick: () => 0},
                {text:'Lch', onClick: () => 0}
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
            onBlur: () => 0,
            onEnter: () => 0
        }
    },
    {
        type: 'COLOR',
        attributes: {
            value: '#000000',
            placeholder: 'Start value',
            onBlur: () => 0,
            onEnter: () => 0
        }
    },
    {
        type: 'COLOR',
        attributes: {
            value: '#FFFFFF',
            placeholder: 'End value',
            onBlur: () => 0,
            onEnter: () => 0
        }
    },
    {
        type: 'AMOUNT',
        attributes: {
            value: 10,
            placeholder: 'Swatch steps',
            onBlur: () => 0,
            onEnter: () => 0,
            range: [1, 10]
        }
    }
];

const createSwatchConfig: Workbench = {
    title: 'Create color swatch',
    sidepanel: {
        options: [
            { text: 'Shades', content: basicSidepanelContent },
            { text: 'Tones', content: basicSidepanelContent },
            { text: 'Tints', content: basicSidepanelContent },
            { text: 'Material', content: basicSidepanelContent },
            { text: 'Interpolation', content: interpolationSidepanelContent }
        ]
    },
    content: {},
    footer: {
        primaryAction: { text: 'Add', onClick: () => 0 }
    }
}