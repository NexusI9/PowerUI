import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/page";
import snackbarSlice from "./slices/snackbar";
import contextMenuSlice from "./slices/contextmenu";
import tooltipSlice from "./slices/tooltip";
import workbenchSlice from "./slices/workbench";
import inputSlice from './slices/input';

export default configureStore({
    reducer:{
        page: pageSlice,
        snackbar: snackbarSlice,
        contextmenu: contextMenuSlice,
        tooltip: tooltipSlice,
        workbench: workbenchSlice,
        input: inputSlice
    }
});