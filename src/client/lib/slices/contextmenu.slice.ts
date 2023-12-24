import { DEFAULT_CONTEXT_MENU } from "@lib/constants";
import { createSlice } from "@reduxjs/toolkit";

const contextMenuSlice = createSlice({
    name:'contextmenu',
    initialState:DEFAULT_CONTEXT_MENU,
    reducers:{
        display: (state, {payload}) => ({...state, ...payload, id: Date.now() }),
        destroy: (state) => ({...state,...DEFAULT_CONTEXT_MENU})
    }
});

export const { display, destroy } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;

