import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/page.slice";
import infoboxSlice from "./slices/infobox.slice";
import panelCommandSlice from "./slices/panelcommand.slice";

export default configureStore({
    reducer:{
        page: pageSlice,
        infobox: infoboxSlice,
        panelcommand: panelCommandSlice
    }
});