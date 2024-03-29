import { Workbench, CreateColorConfig, CreateTextConfig, Set } from "@ctypes/workbench.template";
import { apple, carbon, clarity, flutter, primer, scale, textAdjust, material as textMaterial } from "@lib/utils/font.action";
import { ant, colorAdjust, interpolate, mantine, material as colorMaterial, tailwind } from "@lib/utils/shade.action";
import { createAsyncThunk } from "@reduxjs/toolkit";


//{ [key in ColorAction]: any; }
const actionMap: { [key in Workbench["type"]as string]: any } = {
    'PAINT': {
        SHADE: interpolate,
        TINT: interpolate,
        TONE: interpolate,
        INTERPOLATION: interpolate,
        MATERIAL: colorMaterial,
        ANT: ant,
        MANTINE: mantine,
        TAILWIND: tailwind,
        ORBIT: () => [],
        ATLASSIAN: () => [],
        COLORADJUST: colorAdjust,
    },
    'TEXT': {
        SCALE: scale,
        MATERIAL: textMaterial,
        FLUTTER: flutter,
        APPLE: apple,
        CARBON: carbon,
        CLARITY: clarity,
        PRIMER: primer,
        TEXTADJUST: textAdjust
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
        const newConfig = {
            ...(config || workbench.config),
            ...(key && (value !== undefined) && { [key]: value })
        };

        //update Set from action
        const { action } = newConfig as CreateColorConfig | CreateTextConfig;
        const { type } = workbench;
        let newSet: Set = [];

        if (action && actionMap[type][action]) {
            try {
                newSet = await actionMap[type][action]({ ...newConfig, key, value }); //call mapped function
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


