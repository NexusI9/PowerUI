import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name:'page',
    initialState:'home',
    reducers:{
        setPage: (state, {payload}) => state = payload || 'home'
    }
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;

