import { configureStore } from "@reduxjs/toolkit";
import page from "./slices/page";
import snackbar from "./slices/snackbar";
import contextmenu from "./slices/contextmenu";
import tooltip from "./slices/tooltip";
import workbench from "./slices/workbench.template";
import input from './slices/input';
import style from './slices/style';
import exportSlice from './slices/export.template';
import dev from './slices/dev.template';
import load from './slices/load';
import rename from './slices/rename';

const store = configureStore({
    reducer: {
        page,
        snackbar,
        contextmenu,
        tooltip,
        input,
        style,
        workbench,
        dev,
        load,
        rename,
        export: exportSlice
    }
});


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch