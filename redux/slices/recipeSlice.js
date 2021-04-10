import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import configuredAxios from "../../utils/configuredAxios.js"
import { fetchRecipeWithInfo } from "./combinedThunks.js"

export const FETCH = "recipe/FETCH";

export const fetchRecipe = createAsyncThunk(FETCH, async (id, thunkAPI) => {
    try {
        const response = await configuredAxios.get(`/recipes/${id}`);
        return {
            ...response.data,
            commentaries: response.data.recipeCommentaries,
            recipeCommentaries: undefined,
        }
    } catch(err) {
        return thunkAPI.rejectWithValue([], err);
    }
    
})

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
    }
})

export const {
    actions: {
        updateRecipeCommentaries
    },
    reducer,
} = recipeSlice;