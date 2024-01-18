import { Workbench } from "@ctypes/workbench.template";
import { Export } from '@ctypes/export.template';
import { createSlice } from "@reduxjs/toolkit";
import { updateSet } from "./workbench.actions";
import { initConfig } from "@lib/utils/template";


const workbenchSlice = createSlice({
    name: 'workbench',
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
        updateAction: (state, { payload }: { payload: any }) => {
            return ({
                ...state,
                config: { ...state.config, action: payload.value }
            })
        },
        destroy: (state) => ({ ...state, active: false, set: [] }),
    },
    extraReducers: (builder) => {
        builder.addCase(updateSet.fulfilled, (state, { payload }) => {
            return ({ ...state, ...payload })
        });
    }
});

export const { init, destroy, updateAction } = workbenchSlice.actions;
export default workbenchSlice.reducer;

