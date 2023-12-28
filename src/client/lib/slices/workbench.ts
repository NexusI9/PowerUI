import { Workbench, Set } from "@ctypes/workbench";
import { createSlice } from "@reduxjs/toolkit";

const workbenchSlice = createSlice({
    name:'workbench',
    initialState:{},
    reducers:{
        spawn: (state, {payload}:{payload:Workbench}) => ({...state, ...payload, active:true}),
        destroy: (state) => ({...state, active:false}),
        updateSet: (state, {payload}:{payload:Set}) => ({...state, content:{set:payload}})
    }
});

export const { spawn, destroy, updateSet } = workbenchSlice.actions;
export default workbenchSlice.reducer;

