import { loadFont } from "@lib/utils/font.action";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { display as displayLoad, destroy as destroyLoad } from "@lib/slices/load";

export const updateLayout = createAsyncThunk('export/updateLayout', async ({ key, value }: any, { getState, dispatch }) => {

    const state = getState() as any;
    const oldConfig = state.export.config || {};

    if (key === 'typeface' && typeof value === 'string' && oldConfig.typeface !== value) {
        dispatch(displayLoad({ message: `Loading font ${value}` }));
        await loadFont({ family: value, style: 'Regular' });
        dispatch(destroyLoad());
        setTimeout(() => dispatch(destroyLoad()), 9000);
    }

    return {
        config: {
            ...oldConfig,
            [key]: value
        }

    };
});