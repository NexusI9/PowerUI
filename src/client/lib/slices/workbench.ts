import { ColorRGB } from "@ctypes/color";
import { Workbench, ColorConfig, FontConfig, SidepanelOption, SidepanelList, SetMethod, Set } from "@ctypes/workbench";
import { hexToRgb } from "@lib/utils/color";
import { declination, interpolate } from "@lib/utils/shade";
import { traverseCallback } from "@lib/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const actionMap: { [key in SetMethod]: any; } = {
    SHADE: declination,
    TINT: declination,
    TONE: declination,
    INTERPOLATION: interpolate,
    MATERIAL: () => 0,
    FONT: () => 0
};


const workbenchSlice = createSlice({
    name: 'workbench',
    initialState: {
        type: 'COLOR',
        config: {}
    },
    reducers: {
        spawn: (state, { payload }: { payload: Workbench }) => {

            //setup initial config from sidepanel
            let config: { [key: string]: any } = {};
            if (payload.sidepanel) {
                traverseCallback(payload.sidepanel, ({ options }: { options: SidepanelOption }) =>
                    traverseCallback(options, ({ content }: { content: SidepanelList }) =>
                        traverseCallback(content, (input: SidepanelList) => {
                            try { config[input.configKey] = input.attributes.value; } catch (_) { }
                        }
                        )))
            }

            return ({ ...state, ...payload, config: config, active: true })
        },
        updateConfig: (state, { payload: { key, value } }: { payload: { key: keyof ColorConfig | keyof FontConfig; value: any } }) => {

            //update config 
            const newConfig = {
                ...state.config,
                [key]: value
            };

            //update Set from action
            const { action } = newConfig as ColorConfig | FontConfig;
            const newSet: Set = [];
            if (action && actionMap[action]) {
                switch (state.type) {
                    case 'COLOR':
                        let { colorStart, colorEnd, steps, name } = newConfig as ColorConfig;
                        actionMap[action]({ color: hexToRgb(colorStart || "#CCCCCC", true, 'OBJECT'), steps, action }).forEach((color: ColorRGB, i: number) => newSet.push({ name: `${name}-${i}` || 'swatch', color }));
                        console.log(name);
                        break;

                    case 'FONT':
                        break;
                }
            }

            //console.log({ key, value });

            return ({
                ...state,
                config: {...newConfig},
                set: [...newSet]
            });
        },
        destroy: (state) => ({ ...state, active: false }),
    }
});

export const { spawn, destroy, updateConfig } = workbenchSlice.actions;
export default workbenchSlice.reducer;

