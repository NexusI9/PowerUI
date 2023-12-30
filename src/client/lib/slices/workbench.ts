import { ColorRGB } from "@ctypes/color";
import { Workbench, ColorConfig, FontConfig, SidepanelOption, SidepanelList, SetMethod, Set } from "@ctypes/workbench";
import { ant, interpolate, material } from "@lib/utils/shade";
import { traverseCallback } from "@lib/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const actionMap: { [key in SetMethod]: any; } = {
    SHADE: interpolate,
    TINT: interpolate,
    TONE: interpolate,
    INTERPOLATION: interpolate,
    MATERIAL: material,
    ANT: ant,
    ORBIT: () => [],
    ATLASSIAN: () => [],
    FONT: () => []
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
                        )));
            }

            return ({ ...state, ...payload, config: config, active: true })
        },
        updateConfig: (state, { payload: { key, value } }: { payload: { key: keyof ColorConfig | keyof FontConfig; value: any } }) => {

            //update Config 
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
                        //caculate interpolation and assign it to NewSet
                        newSet.push(...actionMap[action](newConfig));
                        break;

                    case 'FONT':
                        break;
                }
            }

            return ({
                ...state,
                config: { ...newConfig },
                set: [...newSet]
            });
        },
        destroy: (state) => ({ ...state, active: false }),
    }
});

export const { spawn, destroy, updateConfig } = workbenchSlice.actions;
export default workbenchSlice.reducer;

