import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/slice.page";
import snackbarSlice from "./slices/slice.snackbar";
import contextMenuSlice from "./slices/slice.contextmenu";
import tooltipSlice from "./slices/slice.tooltip";

export default configureStore({
    reducer:{
        page: pageSlice,
        snackbar: snackbarSlice,
        contextmenu: contextMenuSlice,
        tooltip: tooltipSlice
    }
});