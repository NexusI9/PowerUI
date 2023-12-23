import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name: 'infobox',
    initialState: {
        type:'information',
        message:''
    },
    reducers: {
        display: (state, { payload }) => {
            return {...state, ...payload};

        }
    }
});

export const { display } = snackbarSlice.actions;
export default snackbarSlice.reducer;