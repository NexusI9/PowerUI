import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateLayout = createAsyncThunk('export/updateLayout', async ({payload}:any) => {
    console.log(payload);
    return {};
});