import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authorizationUpdateCurrentUserCollections, userLogin } from "./thunks";

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
        authorizationUpdateCurrentUserMarks(state, action) {
            const newMarks = { ...state.userMarks };

            switch (action.payload.type) {
                case "rate_recipe": {
                    newMarks.recipes.push(action.payload.newMark);
                    console.log(newMarks);
                    return {
                        ...state,
                        userMarks: newMarks,
                    };
                }
                case "rate_article": {
                    newMarks.articles.push(action.payload.newMark);
                    return {
                        ...state,
                        userMarks: newMarks,
                    };
                }
                default: {
                    toast.error("Произошла ошибка");
                    return state;
                }
            }
        },
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
    },
});

export const {
    actions: { authorizationUpdateCurrentUserMarks, userLogout },
    reducer,
} = AuthorizationSlice;
