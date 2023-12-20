import { createSlice } from "@reduxjs/toolkit";
import { send } from '@lib/ipc';

const colorSlice = createSlice({
    name: 'color',
    initialState: {},
    reducers: {
        createColor: (state, { payload }) => {
            send({type:'ADD_STYLE_COLOR', folder:payload.folder, name:payload.name});
            state = { ...state, payload }
            return state;
        }
    }
});

export const { createColor } = colorSlice.actions;
export default colorSlice.reducer;