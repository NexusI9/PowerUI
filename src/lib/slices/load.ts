import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
    name: 'input',
    initialState: {
        message: null
    },
    reducers: {
        display: (state, { payload }) => ({ ...state, ...payload }),
        destroy: (state) => ({ ...state, message: null })
    }
});

export const { display, destroy } = loadSlice.actions;
export default loadSlice.reducer;
