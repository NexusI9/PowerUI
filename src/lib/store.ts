import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/page";
import snackbarSlice from "./slices/snackbar";
import contextMenuSlice from "./slices/contextmenu";
import tooltipSlice from "./slices/tooltip";
import workbenchSlice from "./slices/workbench.template";
import inputSlice from './slices/input';
import styleSlice from './slices/style';
import exportSlice from './slices/export.template';
import devSlice from './slices/dev.template';
import loadSlice from './slices/load';

const store = configureStore({
    reducer:{
        page: pageSlice,
        snackbar: snackbarSlice,
        contextmenu: contextMenuSlice,
        tooltip: tooltipSlice,
        input: inputSlice,
        style: styleSlice,
        workbench: workbenchSlice,
        export: exportSlice,
        dev: devSlice,
        load: loadSlice
    }
});


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch