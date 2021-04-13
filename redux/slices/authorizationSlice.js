import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios";
import { profileUpdateCurrentUserCollections } from "./profileSlice";
import { changeRating } from "../combinedThunks.js";

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

const initialAuthorizationValues = {
    status: null,
    userId: null,
    userName: null,
    collections: {
        recipes: [],
        articles: [],
    },
    userMarks: {
        recipes: [],
        articles: [],
    },
    toastId: null,
};

const AuthorizationSlice = createSlice({
    name: "profile",
    initialState: {
        ...initialAuthorizationValues,
        status: null,
    },
    reducers: {
        // authorizationUpdateCurrentUserMarks(state, action) {
        //     const newMarks = { ...state.userMarks };

        //     switch (action.payload.type) {
        //         case "rate_recipe": {
        //             newMarks.recipes.push(action.payload.newMark);
        //             console.log(newMarks);
        //             return {
        //                 ...state,
        //                 userMarks: newMarks,
        //             };
        //         }
        //         case "rate_article": {
        //             newMarks.articles.push(action.payload.newMark);
        //             return {
        //                 ...state,
        //                 userMarks: newMarks,
        //             };
        //         }
        //         default: {
        //             toast.error("Произошла ошибка");
        //             return state;
        //         }
        //     }
        // },
        userLogout(state, action) {
            return { ...initialAuthorizationValues, status: null };
        },
    },
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            return {
                ...initialAuthorizationValues,
                status: "loading",
            };
        },
        [userLogin.fulfilled]: (state, action) => {
            return { status: "ok", ...action.payload, toastId: null }; // current profile userdata
        },
        [userLogin.rejected]: (state, action) => {
            toast.error("Ошибка при попытке входа на сайт");

            return {
                ...initialAuthorizationValues,
                status: "failed",
            };
        },
        [authorizationUpdateCurrentUserCollections.fulfilled]: (state, action) => {
            switch (action.payload.type) {
                case "add_recipe": {
                    state.collections.recipes.push(action.payload.newRecipe);

                    break;
                }
                case "remove_recipe": {
                    const newRecipes = state.collections.recipes.filter(
                        (recipe) => recipe.id !== action.payload.removedRecipeId
                    );

                    state.collections.recipes = newRecipes;

                    break;
                }
                default: {
                    return state;
                }
            }
        },
        [authorizationUpdateCurrentUserCollections.failed]: (state, action) => {
            console.log("Ошибка");

            return state;
        },
        [changeRating.fulfilled]: (state, action) => {
            switch (action.payload.type) {
                case "rate_recipe": {
                    state.userMarks.recipes.push(action.payload.objectId);
                    break;
                }
                case "rate_article": {
                    state.userMarks.articles.push(action.payload.objectId);
                    break;
                }
                default: {
                    console.log("Ошибка");
                    return state;
                }
            }
        },
        [changeRating.rejected]: (state, action) => {
            return state;
        },
    },
});

export const {
    actions: { userLogout },
    reducer,
} = AuthorizationSlice;
