import { loadFont } from "@lib/utils/font";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateLayout = createAsyncThunk('export/updateLayout', async ({ key, value }: any, { getState }) => {

    const state = getState() as any;
    const oldConfig = state.export.config || {};

    if(key === 'typeface' && oldConfig.typeface !== value){
        await loadFont({family:value, style:'Regular'});
    }

    return {
        config: {
            ...oldConfig,
            [key]: value
        }

    };
});