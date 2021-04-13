import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";
import { fetchRecipesAndCategories } from "../combinedThunks.js";
import { updateUserRecipesAfterCreation, updateUserRecipesAfterDelete } from "./profileSlice.js";

export const FETCH = "recipesList/FETCH";

export const fetchRecipes = createAsyncThunk(FETCH, async (userData, thunkAPI) => {
    const { currentLastId, categoryId } = userData;
    const response = await configuredAxios.get(
        `/recipes?amount=10&last=${currentLastId}&categoryId=${categoryId}`
    );
    return {
        recipes: response.data.recipes,
        isLastRecipes: response.data.isLastRecipes,
        categoryId: categoryId,
    };
});

export const addRecipe = createAsyncThunk("recipesList/add", async (userData, thunkAPI) => {
    const { recipe, authorId } = userData;
    const response = await configuredAxios.post(`/recipes`, { ...recipe, authorId });

    thunkAPI.dispatch(
        updateUserRecipesAfterCreation({
            id: response.data.newRecipeId,
            name: recipe.name,
        })
    );
    return;
});

export const editRecipe = createAsyncThunk("recipesList/edit", async (userData, thunkAPI) => {
    const { recipe, authorId, recipeId } = userData;
    await configuredAxios.patch(`/recipes/${recipeId}`, { ...recipe, authorId });
    return;
});

export const deleteRecipe = createAsyncThunk("recipesList/delete", async (recipeId, thunkAPI) => {
    await configuredAxios.delete(`/recipes/${recipeId}`);
    thunkAPI.dispatch(updateUserRecipesAfterDelete(recipeId));
    return;
});

const initialRecipesListState = {
    recipes: [],
    currentLastId: 0,
    isLastRecipes: false,
    currentCategory: "",
    status: "loading",
};

const recipesListSlice = createSlice({
    name: "recipesList",
    initialState: initialRecipesListState,
    reducers: {
        switchCategory(state, action) {
            state.recipes = [];
            state.currentLastId = 0;
            state.isLastRecipes = false;
            state.currentCategory = action.payload;
            state.status = "loading";
        },
    },
    extraReducers: {
        [fetchRecipes.fulfilled]: (state, action) => {
            if (action.payload.recipes.length) {
                return {
                    recipes: state.recipes.concat(action.payload.recipes),
                    currentLastId: action.payload.recipes[action.payload.recipes.length - 1]._id,
                    currentCategory: action.payload.categoryId,
                    isLastRecipes: action.payload.isLastRecipes,
                    status: "ok",
                };
            } else {
                return {
                    recipes: state.recipes,
                    currentLastId: 0,
                    isLastRecipes: action.payload.isLastRecipes,
                    currentCategory: action.payload.categoryId,
                    status: "ok",
                };
            }
        },
        [fetchRecipes.pending]: (state, action) => {
            return {
                ...initialRecipesListState,
                status: "loading",
            };
        },
        [fetchRecipes.rejected]: (state, action) => {
            return {
                ...initialRecipesListState,
                status: "failed",
            };
        },
        [fetchRecipesAndCategories.fulfilled]: (state, action) => {
            if (action.payload.recipes.length) {
                return {
                    recipes: state.recipes.concat(action.payload.recipes),
                    currentLastId: action.payload.recipes[action.payload.recipes.length - 1]._id,
                    currentCategory: state.currentCategory,
                    isLastRecipes: action.payload.isLastRecipes,
                    status: "ok",
                };
            } else {
                return {
                    recipes: state.recipes,
                    currentLastId: 0,
                    isLastRecipes: action.payload.isLastRecipes,
                    currentCategory: state.currentCategory,
                    status: "ok",
                };
            }
        },
        [fetchRecipesAndCategories.pending]: (state, action) => {
            return {
                ...initialRecipesListState,
                status: "loading",
            };
        },
        [fetchRecipesAndCategories.rejected]: (state, action) => {
            return {
                ...initialRecipesListState,
                status: "failed",
            };
        },
    },
});

export const {
    actions: { switchCategory },
    reducer,
} = recipesListSlice;
