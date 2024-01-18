import { Export } from "@ctypes/export.template";
import { DEFAULT_TYPEFACE } from "@lib/constants";

export const EXPORT_FONT_CONFIG: Export = {
    title:'Generate font set',
    reducer:'export',
    type: 'TEXT',
    sidepanel: {
        options: [
            {
                value: 'COLOR',
                receiver: 'STORE',
                content: [
                    [
                        {
                            type: 'HEADING',
                            attributes: { value: 'Display options' }
                        },
                        {
                            type: 'DROPDOWN',
                            attributes: {
                                placeholder: 'Typeface',
                                list: [{ value: { action: 'FONT_LIST', placeholder: DEFAULT_TYPEFACE }, action: 'UPDATE_STYLE', receiver: 'STORE' }],
                                appearance: { label: true },
                                value: DEFAULT_TYPEFACE
                            },
                            configKey: 'typeface'
                        },
                        {
                            type: 'INPUT',
                            attributes: {
                                type: 'AMOUNT',
                                value: 16,
                                placeholder: 'Base size',
                                appearance: { label: true }
                            },
                            configKey: 'basesize'
                        },
                    ],
                    [
                        {
                            type: 'HEADING',
                            attributes: { value: 'Groups' }
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'Font family', value: true },
                            configKey: 'fontFamily'
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'Font weight', value: true },
                            configKey: 'fontWeight'
                        }
                    ]
                ]
            }
        ]
    },
    footer: { primaryAction: { value: 'Generate' } }
}