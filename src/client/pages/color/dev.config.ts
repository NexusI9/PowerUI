import { Dev } from "@ctypes/dev.template";
import { SidepanelOption } from "@ctypes/template";

const basicConfig: SidepanelOption['content'] = [
    {
        type: 'DROPDOWN',
        attributes: { list: [] },
        configKey: 'colorFormat'
    }
]

export const DEV_PAINT_CONFIG: Dev = {
    reducer: 'dev',
    title: 'Generate code',
    type: 'PAINT',
    sidepanel: {
        options: [
            [
                { value: 'CSS', content: [basicConfig], action: 'LANGUAGE', receiver: 'STORE', heading: 'Language' },
                { value: 'Tailwind', content: [basicConfig], action: 'LANGUAGE', receiver: 'STORE', heading: 'Language' },
            ]
        ]
    },
    footer: {
        primaryAction: { value: 'Add', action: 'CREATE_SET' }
    }
}