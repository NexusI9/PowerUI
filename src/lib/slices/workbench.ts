import { Workbench, ColorConfig, TextConfig, SidepanelOption, SidepanelInput, Set, ColorAdjustConfig } from "src/types/workbench";
import { apple, carbon, flutter, scale, material as textMaterial } from "@lib/utils/font";
import { ant, colorAdjust, interpolate, mantine, material as colorMaterial, tailwind } from "@lib/utils/shade";
import { traverseCallback } from "@lib/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShadeSet as IShadeSet } from "src/types/shade";
import { FontSet } from "src/types/text";


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
export const updateSet = createAsyncThunk(
    'workbench/updateSet',
    /** 
     * Accepts either a specific key and value or a whole config to generate Set
     * **/
    async ({ key, value, config }: any, { getState }) => {

        //update Config 
        const { workbench }: any = getState();
        const newKey = (key && value) ? { [key]: value } : {};
        const newConfig = {
            ...(config || workbench.config),
            ...newKey
        };

        //update Set from action
        const { action } = newConfig as ColorConfig | TextConfig;
        const { type } = workbench;
        let newSet: Set<IShadeSet | FontSet> = [];

        if (action && actionMap[type][action]) {
            try {
                newSet = await actionMap[type][action](newConfig); //call mapped function
            } catch (_) {
                console.log(_);
            }
        }

        return ({
            ...workbench,
            config: { ...newConfig, },
            set: [...newSet]
        });
    }
);


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
        updateAction: (state, { payload }: { payload: any }) => {
            const newConfig = { ...state.config, action: payload.value };
            return ({ ...state, config: newConfig })
        },
        destroy: (state) => ({ ...state, active: false, set: [] }),
    },
    extraReducers: (builder) => {
        builder.addCase(updateSet.fulfilled, (state, { payload }) => ({ ...state, ...payload }))
    }
});

export const { spawn, destroy, updateAction } = workbenchSlice.actions;
export default workbenchSlice.reducer;
