import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/page";
import snackbarSlice from "./slices/snackbar";
import contextMenuSlice from "./slices/contextmenu";
import tooltipSlice from "./slices/tooltip";
import templateSlice from "./slices/workbench.template";
import inputSlice from './slices/input';
import styleSlice from './slices/style';
import exportSlice from './slices/export.template';

export default configureStore({
    reducer:{
        page: pageSlice,
        snackbar: snackbarSlice,
        contextmenu: contextMenuSlice,
        tooltip: tooltipSlice,
        input: inputSlice,
        style: styleSlice,
        workbench: templateSlice,
        export: exportSlice,
    }
});