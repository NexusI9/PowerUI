import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./page.slice";

export default configureStore({
    reducer:{
        page: pageSlice
    }
});