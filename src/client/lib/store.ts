import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/page";
import snackbarSlice from "./slices/snackbar";
import contextMenuSlice from "./slices/contextmenu";
import tooltipSlice from "./slices/tooltip";

export default configureStore({
    reducer:{
        page: pageSlice,
        snackbar: snackbarSlice,
        contextmenu: contextMenuSlice,
        tooltip: tooltipSlice
    }
});