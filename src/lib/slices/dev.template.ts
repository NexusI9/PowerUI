import { Export } from '@ctypes/export.template';
import { createSlice } from "@reduxjs/toolkit";
import { initConfig } from "@lib/utils/template";
import { updateCode } from './dev.actions';
import { Dev } from '@ctypes/dev.template';


const devSlice = createSlice({
    name: 'dev',
    initialState: {
        type: 'PAINT',
        config: {}
    },

    reducers: {
        init: (state, { payload }: { payload: Dev }) => {

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
        destroy: (state) => ({ ...state, active: false, code:'' })
    },
    extraReducers: (builder) => {
        builder.addCase(updateCode.fulfilled, (state, { payload }) => ({ ...state, ...payload }))
    }
});

export const { init, destroy } = devSlice.actions;
export default devSlice.reducer;

