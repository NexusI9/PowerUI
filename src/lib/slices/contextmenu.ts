import { ContextMenu, ContextMenuCommand } from "src/types/contextmenu";
import { DEFAULT_CONTEXT_MENU } from "@lib/constants";
import { get } from "@lib/ipc";
import { traverseCallback } from "@lib/utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const display = createAsyncThunk(
    'contextmenu/display',
    async (action: any) => {
        //check if commands have fetch propreties to replace content with fetch results
        const fetchPromises: Array<any> = action.commands.map(
            (command: ContextMenuCommand) =>
                traverseCallback(
                    command,
                    (cm: ContextMenuCommand) => {
                        if (cm.fetch) { return get(cm.fetch) }
                        else { return cm; }
                    }
                )
        );

        const result = await Promise.all(fetchPromises);
        return {
            ...action,
            commands: result.map(item => item.payload ? item.payload : item)
        }
    });


const contextMenuSlice = createSlice({
    name: 'contextmenu',
    initialState: DEFAULT_CONTEXT_MENU,
    reducers: {
        destroy: (state) => ({ ...state, ...DEFAULT_CONTEXT_MENU }),
        setActiveCommand: (state, { payload }) => ({ ...state, activeCommand: payload })
    },
    extraReducers: (builder) => {
        builder.addCase(display.fulfilled, (state, { payload }) => ({ ...state, ...payload, id: payload.id || performance.now() }))
    }
});


export const { destroy, setActiveCommand } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;

