import { ContextMenu } from "@lib/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const contextMenuSlice = createSlice({
    name:'contextmenu',
    initialState:{
        commands:[],
        position:{x:0, y:0}
    },
    reducers:{
        display: (state, {payload}) => ({...state, ...payload})
    }
});

export const { display } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;

