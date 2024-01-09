import { createSlice } from "@reduxjs/toolkit";

const styleSlice = createSlice({
    name: 'style',
    initialState: {
        display: 'grid'
    },
    reducers: {
        switchDisplay: (state, {payload}) => ({ ...state, display: (payload ? payload : (state.display === 'grid' ? 'list' : 'grid')) })
    }
});

export const { switchDisplay } = styleSlice.actions;
export default styleSlice.reducer;