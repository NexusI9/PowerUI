import { configureStore, createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name:'page',
    initialState:'home',
    reducers:{
        setPage: (state, {type, payload}) => {
            console.log({type, payload});
            if(type === "SET_PAGE"){
                state = payload || 'home';
            }
        }
    }
});

export default configureStore({
    reducer:{
        page: pageSlice.reducer
    }
});