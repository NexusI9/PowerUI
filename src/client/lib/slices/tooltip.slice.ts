import { ToolTip } from "@lib/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const tooltipSlice = createSlice({
    name:'tooltip',
    initialState:{
        content:[],
        boundingBox:{x:0, y:0, width:0, height:0}
    },
    reducers:{
        display: (state, {payload}) => ({...state, ...payload}),
        destroy: (state, _) => ({...state, ...{content:[], boundingBox:{x:0, y:0, width:0, height:0}}})
    }
});

export const { display, destroy } = tooltipSlice.actions;
export default tooltipSlice.reducer;

