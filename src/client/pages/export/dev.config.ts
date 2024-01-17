import { Export } from "@ctypes/export";
import { DEFAULT_TYPEFACE } from "@lib/constants";

export const DEV_EXPORT_TEMPLATE: Export = {
    reducer:'export',
    type: 'DEV',
    sidepanel: {
        options: [
            {
                value: 'COLOR',
                receiver: 'STORE',
                content: [
                    {
                        type: 'DROPDOWN',
                        attributes: {
                            placeholder: 'Synthax',
                            list: [
                                { value: 'CSS', receiver: 'STORE' },
                                { value: 'Tailwind', receiver: 'STORE' },
                            ],
                            appearance: { label: true },
                            value: 'CSS'
                        },
                        configKey: 'language'
                    },
                    {
                        type: 'DROPDOWN',
                        attributes: {
                            placeholder: 'Color format',
                            list: [
                                { value: 'Hex', receiver: 'STORE' },
                                { value: 'Rgb', receiver: 'STORE' },
                                { value: 'Hsl', receiver: 'STORE' },
                            ],
                            appearance: { label: true },
                            value: 'Hex'
                        },
                        configKey: 'format'
                    },
                ]
            },

        ]
    }
}