import { configureStore, createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name:'page',
    initialState:{page:'home'},
    reducers:{
        change: (state, action) => state.page = action.payload || 'home'
    }
});

export default configureStore({
    reducer:{
        page: pageSlice.reducer
    }
});