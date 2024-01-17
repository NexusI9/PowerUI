import { Export } from "@ctypes/export";
import { DEFAULT_TYPEFACE } from "@lib/constants";

export const FONT_EXPORT_TEMPLATE: Export = {
    active: false,
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
                                value: 2,
                                placeholder: 'Frame border radius',
                                range: [0, 1000],
                                appearance: { label: true }
                            },
                            configKey: 'frameBorderRadius'
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
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'Font size', value: true },
                            configKey: 'fontSize'
                        }
                    ],
                    [
                        {
                            type: 'BUTTON',
                            attributes: {
                                value: 'Generate palette',
                                onClick: false,
                                role: 'PRIMARY'
                            },
                            configKey: undefined
                        }
                    ]
                ]
            }
        ]
    }
}