import { Workbench } from "@ctypes/workbench";
import { Export } from '@ctypes/export';
import { createSlice } from "@reduxjs/toolkit";
import { initConfig } from "@lib/utils/template";


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

            return ({ ...state, ...payload, config })
        }
    }
});

export const { init } = exportSlice.actions;
export default exportSlice.reducer;

