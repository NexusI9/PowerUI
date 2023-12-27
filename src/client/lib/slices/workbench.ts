import { Workbench } from "@lib/types/workbench";
import { createSlice } from "@reduxjs/toolkit";

const workbenchSlice = createSlice({
    name:'workbench',
    initialState:{},
    reducers:{
        spawn: (state, {payload}:{payload:Workbench}) => ({...state, ...payload, active:true}),
        destroy: (state) => ({...state, active:false})
    }
});

export const { spawn, destroy } = workbenchSlice.actions;
export default workbenchSlice.reducer;

