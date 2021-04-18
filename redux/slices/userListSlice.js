import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";

export const fetchUsersList = createAsyncThunk("usersList/FETCH", async (thunkAPI) => {
    const response = await configuredAxios.get(`/users?rating=true`);
    return response.data;
});

const initialUsersListState = {
    usersList: [],
    status: "loading",
};

const usersListSlice = createSlice({
    name: "usersList",
    initialState: initialUsersListState,
    reducers: {},
    extraReducers: {
        [fetchUsersList.fulfilled]: (state, action) => {
            return { usersList: action.payload, status: "ok" };
        },
        [fetchUsersList.pending]: (state, action) => {
            return { ...initialUsersListState, status: "loading" };
        },
        [fetchUsersList.rejected]: (state, action) => {
            return { ...initialUsersListState, status: "failed" };
        },
    },
});

export const { reducer } = usersListSlice;
