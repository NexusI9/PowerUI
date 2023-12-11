import { configureStore, createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name:'page',
    initialState:'home',
    reducers:{
        change: (state, action) => state = action.payload || 'home'
    }
});

export default configureStore({
    reducer:{
        page: pageSlice.reducer
    }
});