import { Dev } from "@ctypes/dev.template";
import { SidepanelOption } from "@ctypes/template";

const basicConfig: SidepanelOption['content'] = [
    {
        type: 'DROPDOWN',
        attributes: {
            list: [
                { value: 'Hex', receiver: 'STORE' },
                { value: 'Rgb', receiver: 'STORE' },
                { value: 'Hsl', receiver: 'STORE' },
            ],
            appearance: { label: true },
            value: 'Hex'
        },
        configKey: 'colorFormat'
    },
    {
        type: 'INPUT',
        attributes: { placeholder: 'Variables prefix' },
        configKey:'prefix'
    }

]

export const DEV_PAINT_CONFIG: Dev = {
    reducer: 'dev',
    title: 'Generate code',
    type: 'PAINT',
    sidepanel: {
        options: [
            { value: 'CSS', content: [basicConfig], action: 'CSS', receiver: 'STORE', heading: 'Language' },
            { value: 'Tailwind', content: [basicConfig], action: 'TAILWIND', receiver: 'STORE', heading: 'Language' },
        ]
    },
    footer: {
        primaryAction: { value: 'Add', action: 'CREATE_SET', role: 'DISABLED' }
    }
}