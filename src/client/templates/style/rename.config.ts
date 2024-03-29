import { BaseTemplate, Sidepanel, SidepanelOption } from "@ctypes/template";

const renameOptions: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Synthax' }
        },
        {
            type: 'INPUT',
            attributes: {
                placeholder: 'Match (optional)',
                appearance: { label: true }
            },
            configKey: 'match'
        },
        {
            type: 'INPUT',
            attributes: {
                placeholder: 'Replace',
                appearance: { label: true }
            },
            configKey: 'replace'
        },
    ],
    [
        {
            type: 'HEADING',
            attributes: { value: 'Variables' }
        },
        {
            type: 'BUTTON',
            attributes: {
                value: 'Current name',
                role: 'OUTLINE',
                onClick: ''
            },
            configKey: 'currentname'
        },
        {
            type: 'BUTTON',
            attributes: {
                value: 'Number ↑',
                role: 'OUTLINE',
                onClick: ''
            },
            configKey: 'numberup'
        },
        {
            type: 'BUTTON',
            attributes: {
                value: 'Number ↓',
                role: 'OUTLINE',
                onClick: ''
            },
            configKey: 'numberdown'
        }
    ]
];

export const RENAME_STYLES_CONFIG: BaseTemplate = {
    title: 'Rename styles',
    reducer: 'rename',
    footer: { primaryAction: { value: 'Rename', role: 'PRIMARY', destroy: true, action: 'EDIT_SWATCH' } },
    sidepanel: {
        options: [{ content: renameOptions, receiver: 'STORE', value: 'Rename', action: 'RENAME' }]
    },
    type: 'PAINT',

}