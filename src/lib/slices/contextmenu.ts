import { ContextMenu, ContextMenuCommand } from "src/types/contextmenu";
import { DEFAULT_CONTEXT_MENU } from "@lib/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const display = createAsyncThunk('contextmenu/display', (action: any) => action);

const contextMenuSlice = createSlice({
    name: 'contextmenu',
    initialState: DEFAULT_CONTEXT_MENU,
    reducers: {
        destroy: (state) => ({ ...state, ...DEFAULT_CONTEXT_MENU, activeCommand: state.activeCommand }),
        setActiveCommand: (state, { payload }) => ({ ...state, activeCommand: payload })
    },
    extraReducers: (builder) => {
        builder.addCase(display.fulfilled, (state, { payload }) => ({ ...state, ...payload, id: payload.id || performance.now() }))
    }
});


export const { destroy, setActiveCommand } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;

