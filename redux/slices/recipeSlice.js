import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";
import { fetchRecipeWithInfo, changeRating } from "../combinedThunks.js";

export const FETCH = "recipe/FETCH";

export const fetchRecipe = createAsyncThunk(FETCH, async (id, thunkAPI) => {
    const response = await configuredAxios.get(`/recipes/${id}`);
    return {
        ...response.data,
        commentaries: response.data.recipeCommentaries,
        recipeCommentaries: undefined,
    };
});

const initialRecipeState = {
    recipe: {},
    status: "loading",
};

const recipeSlice = createSlice({
    name: "recipe",
    initialState: initialRecipeState,
    reducers: {},
    extraReducers: {
        [fetchRecipe.fulfilled]: (state, action) => {
            return {
                recipe: action.payload.recipe,
                status: "ok",
            };
        },
        [fetchRecipe.pending]: (state, action) => {
            return {
                ...initialRecipeState,
                status: "loading",
            };
        },
        [fetchRecipe.rejected]: (state, action) => {
            return {
                ...initialRecipeState,
                status: "failed",
            };
        },
        [fetchRecipeWithInfo.fulfilled]: (state, action) => {
            return {
                recipe: action.payload.recipe,
                status: "ok",
            };
        },
        [fetchRecipeWithInfo.pending]: (state, action) => {
            return {
                ...initialRecipeState,
                status: "loading",
            };
        },
        [fetchRecipeWithInfo.rejected]: (state, action) => {
            return {
                ...initialRecipeState,
                status: "failed",
            };
        },
        [changeRating.fulfilled]: (state, action) => {
            state.recipe.recipe.rating.average =
                (state.recipe.recipe.rating.average * state.recipe.recipe.rating.count +
                    action.payload.newMark) /
                (state.recipe.recipe.rating.count + 1);
            state.recipe.recipe.rating.count++;
        },
        [changeRating.rejected]: (state, action) => {
            return state;
        },
    },
});

export const {
    actions: { updateRecipeCommentaries },
    reducer,
} = recipeSlice;
