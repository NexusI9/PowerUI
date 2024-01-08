import { createSlice } from "@reduxjs/toolkit";

const styleSlice = createSlice({
    name: 'style',
    initialState: {
        display: 'grid'
    },
    reducers: {
        switchDisplay: (state) => ({ ...state, display: (state.display === 'grid' ? 'list' : 'grid') })
    }
});

export const { switchDisplay } = styleSlice.actions;
export default styleSlice.reducer;