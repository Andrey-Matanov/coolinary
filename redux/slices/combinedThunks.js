import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios";

export const fetchRecipesAndCategories = createAsyncThunk("combined/fetchRecipesAndCategories", async (userData, thunkAPI) => {
    const { currentLastId, category } = userData;
    try {
        const recipesResponse = await configuredAxios.get(
            `/recipes/?amount=10&last=${currentLastId}&category=${category}`
        );
        const categoriesResponse = await configuredAxios.get(`/categories`);
        return {
            categories: categoriesResponse.data,
            recipes: recipesResponse.data.recipes,
            isLastRecipes: recipesResponse.data.isLastRecipes,
        };
    } catch(err) {
        return thunkAPI.rejectWithValue([], err);
    }
});

export const fetchIngredientsAndCategories = createAsyncThunk("combined/fetchIngredientsAndCategories", async (thunkAPI) => {
    try {
        const ingredientsResponse = await configuredAxios.get(`/ingredients`)
        const categoriesResponse = await configuredAxios.get(`/categories`);
        return {
            ingredients: ingredientsResponse.data,
            categories: categoriesResponse.data
        };
    } catch(err) {
        return thunkAPI.rejectWithValue([], err);
    }
});

export const fetchRecipeWithInfo = createAsyncThunk("combined/fetchRecipeWithInfo", async (id, thunkAPI) => {
    try {
        const recipeResponse = await configuredAxios.get(`/recipes/${id}`);
        const ingredientsResponse = await configuredAxios.get(`/ingredients?recipeId=${id}`);
        const unitsResponse = await configuredAxios.get(`/units?recipeId=${id}`);
        const categoriesResponse = await configuredAxios.get(`/categories`);
        return {
            recipe: recipeResponse.data,
            ingredients: ingredientsResponse.data,
            categories: categoriesResponse.data,
            units: unitsResponse.data,
        };
    } catch(err) {
        return thunkAPI.rejectWithValue([], err);
    }
});