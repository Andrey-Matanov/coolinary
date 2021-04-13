import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";

export const FETCH = "usersList/FETCH";

export const fetchUsersList = createAsyncThunk(FETCH, async (thunkAPI) => {
    const response = await configuredAxios.get(`/users?rating`);
    return response.data;
});

const initialUsersListState = [];

const usersListSlice = createSlice({
    name: "usersList",
    initialState: initialUsersListState,
    reducers: {},
    extraReducers: {
        [fetchUsersList.fulfilled]: (state, action) => {
            return action.payload;
        },
        [fetchUsersList.pending]: (state, action) => {
            return {
                ...initialUsersListState,
            };
        },
        [fetchUsersList.rejected]: (state, action) => {
            return {
                ...initialUsersListState,
            };
        },
    },
});

export const { reducer } = usersListSlice;
