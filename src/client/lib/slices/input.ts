import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: 'input',
    initialState: {
        portal: {
            target: '',
            value: 0
        }
    },
    reducers: {
        send: (state, { payload }) =>  ({ ...state, portal:{ target: payload.target, value: payload.value } })
    }
});

export const { send } = inputSlice.actions;
export default inputSlice.reducer;

