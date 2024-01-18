import { Dev } from "@ctypes/dev.template";
import { TemplateConfig } from "@ctypes/template";
import { get } from "@lib/ipc";
import { createAsyncThunk } from "@reduxjs/toolkit";


const LANGUAGE_COMMAND = {
    'CSS': 'CSS_STYLES',
    'TAILWIND': 'TAILWIND_STYLES'
};

export const updateCode = createAsyncThunk('dev/updateCode', async ({ key, value }: any, { getState }) => {

    const state = getState() as any;
    const oldConfig = state.dev.config || {};
    const newConfig: TemplateConfig = {
        ...oldConfig,
        [key]: value
    };

    const code = await get({ action: LANGUAGE_COMMAND['CSS'], payload: { ...state.dev, config: newConfig } });

    return {
        config: newConfig,
        code
    };
});