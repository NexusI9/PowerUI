import { Export } from "@ctypes/export";
import { DEFAULT_TYPEFACE } from "@lib/constants";

export const COLOR_EXPORT_TEMPLATE: Export = {
    reducer:'export',
    type: 'PAINT',
    sidepanel: {
        options: [
            {
                value: 'COLOR',
                receiver: 'STORE',
                content: [
                    [
                        {
                            type: 'HEADING',
                            attributes: { value: 'Layout' }
                        },
                        {
                            type: 'DROPDOWN',
                            attributes: {
                                placeholder: 'Direction',
                                list: [
                                    { value: 'Column', receiver: 'STORE' },
                                    { value: 'Row', receiver: 'STORE' },
                                ],
                                appearance: { label: true },
                                value: 'Column'
                            },
                            configKey: 'layout'
                        },
                    ],
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
                        {
                            type: 'INPUT',
                            attributes: {
                                type: 'AMOUNT',
                                value: 10,
                                placeholder: 'Swatch border radius',
                                range: [0, 1000],
                                appearance: { label: true }
                            },
                            configKey: 'swatchBorderRadius'
                        },
                    ],
                    [
                        {
                            type: 'HEADING',
                            attributes: { value: 'Colors' }
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'Hex', value: true },
                            configKey: 'hex'
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'RGB', value: true },
                            configKey: 'rgb'
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'HSL', value: true },
                            configKey: 'hsl'
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'CMYK', value: true },
                            configKey: 'cmyk'
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'Pantone', value: true },
                            configKey: 'pantone'
                        },
                    ],
                    [
                        {
                            type: 'HEADING',
                            attributes: { value: 'Contrast' }
                        },
                        {
                            type: 'CHECKBOX',
                            attributes: { label: 'Ratios', value: true },
                            configKey: 'contrastRatio'
                        }
                    ],
                    [
                        {
                            type: 'BUTTON',
                            attributes: {
                                value: 'Generate palette',
                                onClick: false,
                                role: 'PRIMARY'
                            }
                        }
                    ]

                ]
            }
        ]
    }
}