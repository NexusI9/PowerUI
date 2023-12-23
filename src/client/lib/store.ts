import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/page.slice";
import snackbarSlice from "./slices/snackbar";
import contextMenuSlice from "./slices/contextmenu.slice";
import tooltipSlice from "./slices/tooltip.slice";

export default configureStore({
    reducer:{
        page: pageSlice,
        snackbar: snackbarSlice,
        contextmenu: contextMenuSlice,
        tooltip: tooltipSlice
    }
});