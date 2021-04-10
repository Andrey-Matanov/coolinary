import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import configuredAxios from "../../../utils/configuredAxios";
import { profileUpdateCurrentUserCollections } from "../profileSlice";

export const userLogin = createAsyncThunk("authorization/userLogin", async (email, thunkAPI) => {
    const response = await configuredAxios.get(`/userdata`, {
        headers: {
            email: email,
        },
    });

    return {
        userId: response.data._id,
        userName: response.data.name,
        collections: response.data.collections,
        userMarks: response.data.userMarks,
    };
});

export const authorizationUpdateCurrentUserCollections = createAsyncThunk(
    "authorization/authorizationUpdateCurrentUserCollections",
    async (updateInformation, thunkAPI) => {
        const { type, userId, data } = updateInformation;
        const { dispatch } = thunkAPI;

        switch (type) {
            case "add_recipe": {
                const response = await configuredAxios.put(`/users/${userId}`, {
                    type,
                    newRecipe: data,
                });

                if (response.status === 200) {
                    dispatch(
                        profileUpdateCurrentUserCollections({
                            type,
                            newRecipe: data,
                        })
                    );

                    return {
                        type,
                        newRecipe: data,
                    };
                } else {
                    toast.error("Произошла ошибка при попытке добавить рецепт в коллекции");

                    return;
                }
            }
            case "remove_recipe": {
                const response = await configuredAxios.put(`/users/${userId}`, {
                    type,
                    removedRecipeId: data,
                });

                if (response.status === 200) {
                    dispatch(
                        profileUpdateCurrentUserCollections({
                            type,
                            removedRecipeId: data,
                        })
                    );

                    return {
                        type,
                        removedRecipeId: data,
                    };
                } else {
                    toast.error("Произошла ошибка при попытке добавить рецепт в коллекции");

                    return;
                }
            }
            default: {
                toast.error("Произошла непредвиденная ошибка!");

                return;
            }
        }
    }
);
