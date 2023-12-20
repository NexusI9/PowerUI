import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./page.slice";
import colorSlice from "./color.slice";

export default configureStore({
    reducer:{
        page: pageSlice,
        color: colorSlice
    }
});