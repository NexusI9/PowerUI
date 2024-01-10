import { Workbench, ColorConfig, TextConfig, SidepanelOption, SidepanelInput, Set, ColorAdjustConfig } from "@ctypes/workbench";
import { apple, carbon, flutter, scale, material as textMaterial } from "@lib/utils/font";
import { ant, colorAdjust, interpolate, mantine, material as colorMaterial, tailwind } from "@lib/utils/shade";
import { traverseCallback } from "@lib/utils/utils";
import { createSlice } from "@reduxjs/toolkit";
import { ShadeSet } from "@ctypes/shade";
import { FontSet } from "@ctypes/text";

//{ [key in ColorSetMethod]: any; }
const actionMap: { [key in Workbench["type"]as string]: any } = {
    'COLOR': {
        SHADE: interpolate,
        TINT: interpolate,
        TONE: interpolate,
        INTERPOLATION: interpolate,
        MATERIAL: colorMaterial,
        ANT: ant,
        MANTINE: mantine,
        COLORADJUST: colorAdjust,
        TAILWIND: tailwind,
        ORBIT: () => [],
        ATLASSIAN: () => []
    },
    'TEXT': {
        SCALE: scale,
        MATERIAL: textMaterial,
        FLUTTER: flutter,
        APPLE: apple,
        CARBON: carbon
    }
}


const workbenchSlice = createSlice({
    name: 'workbench',
    initialState: {
        type: 'COLOR',
        config: {}
    },
    reducers: {
        spawn: (state, { payload }: { payload: Workbench }) => {

            //setup initial config from sidepanel
            const initConfig: { [key: string]: any } = { ...payload.config };
            if (payload.sidepanel) {
                traverseCallback(payload.sidepanel, ({ options }: { options: SidepanelOption }) =>
                    traverseCallback(options, ({ content }: { content: SidepanelInput }) =>
                        traverseCallback(content, (input: SidepanelInput) => {
                            try { initConfig[input.configKey] = input.attributes.value; } catch (_) { }
                        }
                        )));
            }

            return ({ ...state, ...payload, config: { ...initConfig }, active: true })
        },
        updateConfig: (state, { payload: { key, value } }: { payload: { key: keyof ColorConfig | keyof TextConfig | keyof ColorAdjustConfig; value: any } }) => {

            //update Config 
            const newConfig = {
                ...state.config,
                [key]: value
            };

            //update Set from action
            const { action } = newConfig as ColorConfig | TextConfig;
            const { type } = state;
            const newSet: Set<ShadeSet | FontSet> = [];

            if (action && actionMap[type][action]) {
                try{
                    newSet.push(...actionMap[type][action](newConfig)); //call mapped function
                }catch(_){
                    console.log('No mapped method found, make sure to assign the right action key to the right method in action map');
                }
            }

            return ({
                ...state,
                config: { ...newConfig },
                set: [...newSet]
            });
        },
        destroy: (state) => ({ ...state, active: false, set:[] }),
    }
});

export const { spawn, destroy, updateConfig } = workbenchSlice.actions;
export default workbenchSlice.reducer;

