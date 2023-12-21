import { createSlice } from "@reduxjs/toolkit";

const infoboxSlice = createSlice({
    name: 'infobox',
    initialState: {},
    reducers: {
        display: (state, { payload }) => {
            return {...state, ...payload};

        }
    }
});

export const { display } = infoboxSlice.actions;
export default infoboxSlice.reducer;