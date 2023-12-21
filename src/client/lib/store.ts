import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./page.slice";
import infoboxSlice from "./infobox.slice";

export default configureStore({
    reducer:{
        page: pageSlice,
        infobox: infoboxSlice
    }
});