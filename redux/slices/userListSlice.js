import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";

export const fetchUsersList = createAsyncThunk("usersList/FETCH", async (thunkAPI) => {
    const response = await configuredAxios.get(`/users?rating`);
    return response.data;
});

const usersListSlice = createSlice({
    name: "usersList",
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchUsersList.fulfilled]: (state, action) => {
            return action.payload;
        },
        [fetchUsersList.pending]: (state, action) => {
            return [];
        },
        [fetchUsersList.rejected]: (state, action) => {
            return [];
        },
    },
});

export const { reducer } = usersListSlice;
