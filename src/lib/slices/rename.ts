import { createSlice } from "@reduxjs/toolkit";
import { initConfig } from "@lib/utils/template";
import { Workbench } from "@ctypes/workbench.template";
import { Styles } from "@ctypes/style";

const renameSlice = createSlice({
    name: 'rename',
    initialState: {
        type: 'PAINT',
        config: {}
    },
    reducers: {
        init: (state, { payload }: { payload: Workbench }) => {

            //setup initial config from sidepanel
            const config: { [key: string]: any } = {
                ...payload.config,
                ...initConfig(payload.sidepanel)
            };

            return ({ ...state, ...payload, config, active: true })
        },
        updateName: (state, { payload }) => {

            const { key, value } = payload;

            const newConfig = {
                ...state.config,
                ...(key && { [key]: value })
            };

            return ({
                ...state,
                config: newConfig,
                set: (newConfig?.styles || []).map((style: Styles) => {
                    let name = style.name;

                    //replace match
                    if (newConfig.match) { name = name.replace(String(newConfig.match), String(newConfig.replace || '')); }
                    //replace whole word
                    else if (newConfig.replace) {
                        name = String(newConfig.replace);
                    }

                    

                    return ({ ...style, name })
                })
            });
        },
        destroy: (state) => ({ ...state, active: false })
    }
});

export const { init, destroy, updateName } = renameSlice.actions;
export default renameSlice.reducer;

