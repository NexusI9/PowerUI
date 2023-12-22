import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/page.slice";
import infoboxSlice from "./slices/infobox.slice";
import contextMenuSlice from "./slices/contextmenu.slice";
import tooltipSlice from "./slices/tooltip.slice";

export default configureStore({
    reducer:{
        page: pageSlice,
        infobox: infoboxSlice,
        contextmenu: contextMenuSlice,
        tooltip: tooltipSlice
    }
});