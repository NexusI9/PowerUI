import { Export } from '@ctypes/export.template';
import { createSlice } from "@reduxjs/toolkit";
import { initConfig } from "@lib/utils/template";

const renameSlice = createSlice({
    name: 'export',
    initialState: {
        type: 'PAINT',
        config: {}
    },
    reducers: {
        init: (state, { payload }: { payload: Export }) => {

            //setup initial config from sidepanel
            const config: { [key: string]: any } = {
                ...payload.config,
                ...initConfig(payload.sidepanel)
            };

            return ({ ...state, ...payload, config, active: true })
        },
        rename: (state, { payload }) => {
            console.log(payload);
            return state;
        },
        destroy: (state) => ({ ...state, active: false })
    }
});

export const { init, destroy, rename } = renameSlice.actions;
export default renameSlice.reducer;

