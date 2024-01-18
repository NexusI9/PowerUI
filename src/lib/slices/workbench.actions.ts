import { Workbench, ColorConfig, TextConfig, Set } from "@ctypes/workbench.template";
import { apple, carbon, flutter, scale, material as textMaterial } from "@lib/utils/font";
import { ant, colorAdjust, interpolate, mantine, material as colorMaterial, tailwind } from "@lib/utils/shade";
import { createAsyncThunk } from "@reduxjs/toolkit";


//{ [key in ColorSetMethod]: any; }
const actionMap: { [key in Workbench["type"]as string]: any } = {
    'PAINT': {
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

        //remove undefined values from old config
        const newKey = (key && (value !== undefined)) ? { [key]: value } : {};
        const newConfig = {
            ...(config || workbench.config),
            ...newKey
        };


        //update Set from action
        const { action } = newConfig as ColorConfig | TextConfig;
        const { type } = workbench;
        let newSet: Set = [];

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


