import { Workbench } from "@ctypes/workbench";
import { Export } from '@ctypes/export';
import { createSlice } from "@reduxjs/toolkit";
import { initConfig } from "@lib/utils/template";
import { updateLayout } from "./export.actions";


const exportSlice = createSlice({
    name: 'export',
    initialState: {
        type: 'PAINT',
        config: {}
    },

    reducers: {
        init: (state, { payload }: { payload: Workbench | Export }) => {
            //setup initial config from sidepanel
            const config: { [key: string]: any } = {
                ...payload.config,
                ...initConfig(payload.sidepanel)
            };

            return ({ ...state, ...payload, config, active:true })
        },
        destroy: (state) => ({...state, active:false})
    },
    extraReducers: (builder) => {
        builder.addCase(updateLayout.fulfilled, (state, { payload }) => ({ ...state, ...payload }))
    }
});

export const { init, destroy } = exportSlice.actions;
export default exportSlice.reducer;

