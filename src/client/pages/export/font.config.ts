import { Export } from "@ctypes/export";

export const COLOR_TEMPLATE: Export = {
    active: false,
    sidepanel: [
        { type: 'HEADER', attributes: { value: 'CSS' } },
        {
            type: 'TEXT_AREA',
            attributes: {
                value: { action: 'STYLE_CSS', placeholder: 'Loading CSS...' }
            },
            configKey: undefined
        },
        { type: 'HEADER', attributes: { value: 'Tailwind' } },
        {
            type: 'TEXT_AREA',
            attributes: {
                value:
                    { action: 'STYLE_TAILWIND', placeholder: 'Loading Tailwind...' }
            },
            configKey: undefined
        }
    ],
    type: 'TEXT'
}