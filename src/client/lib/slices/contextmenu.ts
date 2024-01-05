import { DEFAULT_CONTEXT_MENU } from "@lib/constants";
import { createSlice } from "@reduxjs/toolkit";

const contextMenuSlice = createSlice({
    name: 'contextmenu',
    initialState: DEFAULT_CONTEXT_MENU,
    reducers: {
        display: (state, { payload }) => ({ ...state, ...payload, id: payload.id || performance.now() }),
        destroy: (state) => ({ ...state, ...DEFAULT_CONTEXT_MENU}),
        setActiveCommand: (state, { payload }) => ({ ...state, activeCommand: payload })
    }
});

export const { display, destroy, setActiveCommand } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;

