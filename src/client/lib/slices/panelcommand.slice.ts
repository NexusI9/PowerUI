import { createSlice } from "@reduxjs/toolkit";

const panelCommandSlice = createSlice({
    name:'panelcommand',
    initialState:{},
    reducers:{
        display: (state, {payload}) => ({...state, payload})
    }
});

export const { display } = panelCommandSlice.actions;
export default panelCommandSlice.reducer;

