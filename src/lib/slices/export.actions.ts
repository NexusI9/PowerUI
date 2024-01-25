import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadFontDispatch } from "@lib/utils/template";

export const updateLayout = createAsyncThunk('export/updateLayout', async ({ key, value }: any, { getState, dispatch }) => {

    const state = getState() as any;
    const oldConfig = state.export.config || {};

    await loadFontDispatch({ key, value, oldConfig, dispatcher: dispatch });

    return {
        config: {
            ...oldConfig,
            [key]: value
        }
    };
});