import { Dev } from "@ctypes/dev.template";
import { SidepanelOption } from "@ctypes/template";

const cssConfig: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Color' }
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
    ],
    [
        {
            type: 'HEADING',
            attributes: { value: 'Name' }
        },
        {
            type: 'INPUT',
            attributes: {
                placeholder: 'Variables prefix',
                appearance: { label: true }
            },
            configKey: 'prefix'
        },
        {
            type: 'DROPDOWN',
            attributes: {
                list: [
                    { value: 'kebab-case', receiver: 'STORE' },
                    { value: 'Train-Case', receiver: 'STORE' },
                    { value: 'camelCase', receiver: 'STORE' },
                    { value: 'PascalCase', receiver: 'STORE' },
                    { value: 'Pascal_Snake_Case', receiver: 'STORE' },
                    { value: 'snake_case', receiver: 'STORE' },
                ],
                style: { textTransform: 'none' },
                appearance: { label: true },
                placeholder: 'Name format',
                value: 'kebab-case'
            },
            configKey: 'nameformat'
        }
    ]

]


const tlConfig: SidepanelOption['content'] = [
    [
        {
            type: 'HEADING',
            attributes: { value: 'Color' }
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
        }
    ],
    [
        {
            type: 'HEADING',
            attributes: { value: 'Name' }
        },
        {
            type: 'INPUT',
            attributes: {
                placeholder: 'Variables prefix',
                appearance: { label: true }
            },
            configKey: 'prefix'
        },
        {
            type: 'DROPDOWN',
            attributes: {
                list: [
                    { value: 'kebab-case', receiver: 'STORE' },
                    { value: 'Train-Case', receiver: 'STORE' },
                    { value: 'camelCase', receiver: 'STORE' },
                    { value: 'PascalCase', receiver: 'STORE' },
                    { value: 'Pascal_Snake_Case', receiver: 'STORE' },
                    { value: 'snake_case', receiver: 'STORE' },
                ],
                style: { textTransform: 'none' },
                appearance: { label: true },
                placeholder: 'Name format',
                value: 'kebab-case'
            },
            configKey: 'nameformat'
        }
    ]
]

export const DEV_PAINT_CONFIG: Dev = {
    reducer: 'dev',
    title: 'Generate code',
    type: 'PAINT',
    sidepanel: {
        options: [
            { value: 'CSS', content: cssConfig, action: 'CSS', receiver: 'STORE', heading: 'Language' },
            { value: 'SCSS', content: cssConfig, action: 'SCSS', receiver: 'STORE', heading: 'Language' },
            { value: 'SASS', content: cssConfig, action: 'SASS', receiver: 'STORE', heading: 'Language' },
            { value: 'LESS', content: cssConfig, action: 'LESS', receiver: 'STORE', heading: 'Language' },
            { value: 'Stylus', content: cssConfig, action: 'STYLUS', receiver: 'STORE', heading: 'Language' },
            { value: 'Tailwind', content: tlConfig, action: 'TAILWIND', receiver: 'STORE', heading: 'Language' },
        ]
    },
    footer: {
        primaryAction: { value: 'Add', action: 'CREATE_SET', role: 'DISABLED' }
    }
}