import { Dev } from "@ctypes/dev.template";
import { SidepanelOption } from "@ctypes/template";

const cssConfig: SidepanelOption['content'] = [
    {
        type: 'HEADING',
        attributes: { value: 'Settings' }
    },
    {
        type: 'DROPDOWN',
        attributes: {
            list: [
                { value: 'Hex', receiver: 'STORE' },
                { value: 'Rgb', receiver: 'STORE' },
                { value: 'Hsl', receiver: 'STORE' },
            ],
            appearance: { label: true },
            placeholder: 'Color format',
            value: 'Hex'
        },
        configKey: 'colorformat'
    },
    {
        type: 'INPUT',
        attributes: {
            placeholder: 'Variables prefix',
            appearance: { label: true }
        },
        configKey: 'prefix'
    }

]


const tlConfig: SidepanelOption['content'] = [
    {
        type: 'HEADING',
        attributes: { value: 'Settings' }
    },
    {
        type: 'DROPDOWN',
        attributes: {
            list: [
                { value: 'Hex', receiver: 'STORE' },
                { value: 'Rgb', receiver: 'STORE' },
                { value: 'Hsl', receiver: 'STORE' },
                { value: 'Css', receiver: 'STORE' },
            ],
            appearance: { label: true },
            placeholder: 'Color format',
            value: 'Hex'
        },
        configKey: 'colorformat'
    },
    {
        type: 'INPUT',
        attributes: {
            placeholder: 'Variables prefix',
            appearance: { label: true }
        },
        configKey: 'prefix'
    }

]

export const DEV_PAINT_CONFIG: Dev = {
    reducer: 'dev',
    title: 'Generate code',
    type: 'TEXT',
    sidepanel: {
        options: [
            { value: 'CSS', content: [cssConfig], action: 'CSS', receiver: 'STORE', heading: 'Language' },
            { value: 'Tailwind', content: [tlConfig], action: 'TAILWIND', receiver: 'STORE', heading: 'Language' },
        ]
    },
    footer: {
        primaryAction: { value: 'Add', action: 'CREATE_SET', role: 'DISABLED' }
    }
}