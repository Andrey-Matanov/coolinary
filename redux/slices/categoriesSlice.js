import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";
import {
    fetchRecipesAndCategories,
    fetchIngredientsAndCategories,
    fetchRecipeWithInfo,
} from "../combinedThunks.js";

export const FETCH = "categories/FETCH";

export const fetchCategories = createAsyncThunk(FETCH, async (payload, thunkAPI) => {
    const response = await configuredAxios.get(`/categories`);
    return response.data;
});

const initialCategoriesState = [];

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {},
    extraReducers: {
        [fetchCategories.fulfilled]: (state, action) => {
            return action.payload;
        },
        [fetchCategories.pending]: (state, action) => {
            return initialCategoriesState;
        },
        [fetchCategories.rejected]: (state, action) => {
            return initialCategoriesState;
        },
        [fetchRecipesAndCategories.fulfilled]: (state, action) => {
            return action.payload.categories;
        },
        [fetchRecipesAndCategories.rejected]: (state, action) => {
            return initialCategoriesState;
        },
        [fetchIngredientsAndCategories.fulfilled]: (state, action) => {
            if (action.payload) return action.payload.categories;
        },
        [fetchIngredientsAndCategories.rejected]: (state, action) => {
            return initialCategoriesState;
        },
        [fetchRecipeWithInfo.fulfilled]: (state, action) => {
            if (action.payload) return action.payload.categories;
        },
        [fetchRecipeWithInfo.rejected]: (state, action) => {
            return initialCategoriesState;
        },
    },
});

export const { reducer } = categoriesSlice;
