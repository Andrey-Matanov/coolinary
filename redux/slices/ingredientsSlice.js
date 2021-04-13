import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";
import { fetchIngredientsAndCategories, fetchRecipeWithInfo } from "../combinedThunks.js";

export const FETCH = "ingredients/FETCH";

export const fetchIngredients = createAsyncThunk(FETCH, async (thunkAPI) => {
    const response = await configuredAxios.get(`/ingredients`);
    return response.data;
});

const initialIngredientsState = [];

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: initialIngredientsState,
    reducers: {},
    extraReducers: {
        [fetchIngredients.fulfilled]: (state, action) => {
            return action.payload;
        },
        [fetchIngredients.pending]: (state, action) => {
            return initialIngredientsState;
        },
        [fetchIngredients.rejected]: (state, action) => {
            return initialIngredientsState;
        },
        [fetchIngredientsAndCategories.fulfilled]: (state, action) => {
            return action.payload.ingredients;
        },
        [fetchIngredientsAndCategories.pending]: (state, action) => {
            return initialIngredientsState;
        },
        [fetchIngredientsAndCategories.rejected]: (state, action) => {
            return initialIngredientsState;
        },
        [fetchRecipeWithInfo.fulfilled]: (state, action) => {
            return action.payload.ingredients;
        },
        [fetchRecipeWithInfo.pending]: (state, action) => {
            return initialIngredientsState;
        },
        [fetchRecipeWithInfo.rejected]: (state, action) => {
            return initialIngredientsState;
        },
    },
});

export const { reducer } = ingredientsSlice;
