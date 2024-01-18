import { loadFont } from "@lib/utils/font";
import { createAsyncThunk } from "@reduxjs/toolkit";


const LANGUAGE_COMMAND = {
    'CSS':'CSS_STYLES',
    'Tailwing': 'TAILWIND_STYLES'
};

export const updateCode = createAsyncThunk('dev/updateCode', async ({ key, value }: any, { getState }) => {

    const state = getState() as any;
    const oldConfig = state.export.config || {};

    return {
        config: {
            ...oldConfig,
            [key]: value
        }
    };
});