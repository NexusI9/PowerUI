import { BaseTemplate, Sidepanel, SidepanelOption } from "@ctypes/template";

const renameOptions: SidepanelOption['content'] = [
    
];

export const RENAME_STYLES_CONFIG: BaseTemplate = {
    title: 'Rename styles',
    reducer: 'rename',
    footer: { primaryAction: { value: 'Rename', role: 'PRIMARY', destroy: true, action: 'RENAME' } },
    sidepanel: {
        options: [{ content: renameOptions, receiver: 'STORE', value: 'Rename', action: 'RENAME' }]
    },
    type: 'PAINT',

}