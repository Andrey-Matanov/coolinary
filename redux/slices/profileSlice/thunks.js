import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../../utils/configuredAxios";

export const fetchUserData = createAsyncThunk("profile/fetchUserData", async (id, thunkAPI) => {
    const response = await configuredAxios.get(`/users/${id}`);

    return {
        status: "ok",
        profileUserId: id,
        userName: response.data.name,
        userEmail: response.data.email,
        userRecipes: response.data.userRecipes,
        userCollections: response.data.collections,
    };
});

export const updateUserInfo = createAsyncThunk(
    "profile/updateUserInfo",
    async (userData, thunkAPI) => {
        const { userId, ...newUserInfo } = userData;

        await configuredAxios.patch(`/users/${userId}`, newUserInfo);

        return newUserInfo;
    }
);

export const deleteUser = createAsyncThunk("profile/deleteUser", async (userId, thunkAPI) => {
    await configuredAxios.delete(`/recipes?authorId=${userId}`);
    await configuredAxios.delete(`/users/${userId}`);

    return;
});
