import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateLayout = createAsyncThunk('export/updateLayout', async ({ key, value }: any, { getState }) => {

    const state = getState() as any;
    const newConfig = state.export.config || {};

    return {
        config: {
            ...newConfig,
            [key]: value
        }

    };
});