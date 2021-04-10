import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../utils/configuredAxios";

export const fetchRecipesAndCategories = createAsyncThunk(
    "combined/fetchRecipesAndCategories",
    async (userData, thunkAPI) => {
        const { currentLastId, category } = userData;
        const recipesResponse = await configuredAxios.get(
            `/recipes/?amount=10&last=${currentLastId}&category=${category}`
        );
        const categoriesResponse = await configuredAxios.get(`/categories`);
        return {
            categories: categoriesResponse.data,
            recipes: recipesResponse.data.recipes,
            isLastRecipes: recipesResponse.data.isLastRecipes,
        };
    }
);

export const fetchIngredientsAndCategories = createAsyncThunk(
    "combined/fetchIngredientsAndCategories",
    async (thunkAPI) => {
        const ingredientsResponse = await configuredAxios.get(`/ingredients`);
        const categoriesResponse = await configuredAxios.get(`/categories`);
        return {
            ingredients: ingredientsResponse.data,
            categories: categoriesResponse.data,
        };
    }
);

export const fetchRecipeWithInfo = createAsyncThunk(
    "combined/fetchRecipeWithInfo",
    async (id, thunkAPI) => {
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
    }
);
