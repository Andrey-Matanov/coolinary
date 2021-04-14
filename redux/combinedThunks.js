import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../utils/configuredAxios";

export const fetchRecipesAndCategories = createAsyncThunk(
    "combined/fetchRecipesAndCategories",
    async (userData, thunkAPI) => {
        const { currentLastId, category } = userData;
        const recipesResponse = await configuredAxios.get(
            `/recipes/?amount=10&last=${currentLastId}&category=${category}`
        );
        const finalPayload = {
            recipes: recipesResponse.data.recipes,
            isLastRecipes: recipesResponse.data.isLastRecipes,
        };
        if (!thunkAPI.getState().categories.lenght) {
            const categoriesResponse = await configuredAxios.get(`/categories`);
            finalPayload.categories = categoriesResponse.data;
        }
        return finalPayload;
    }
);

export const fetchIngredientsAndCategories = createAsyncThunk(
    "combined/fetchIngredientsAndCategories",
    async (payload, thunkAPI) => {
        const finalPayload = {};
        if (!thunkAPI.getState().categories.lenght) {
            const categoriesResponse = await configuredAxios.get(`/categories`);
            finalPayload.categories = categoriesResponse.data;
        }
        const ingredientsResponse = await configuredAxios.get(`/ingredients`);
        finalPayload.ingredients = ingredientsResponse.data;
        return finalPayload;
    }
);

export const fetchRecipeWithInfo = createAsyncThunk(
    "combined/fetchRecipeWithInfo",
    async (id, thunkAPI) => {
        console.log(thunkAPI.getState().recipe.recipe?.recipe);
        if (
            !thunkAPI.getState().recipe.recipe?.recipe ||
            thunkAPI.getState().recipe.recipe.recipe._id != id
        ) {
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
        } else {
            return;
        }
    }
);

export const changeRating = createAsyncThunk(
    "combined/changeRating",
    async (userData, thunkAPI) => {
        const { type, userId, authorId, objectId, payload } = userData;
        const newMarkUserResponse = await configuredAxios.put(`/users/${userId}`, {
            type: type,
            newMark: objectId,
        });
        let newMarkObjectResponse;
        switch (type) {
            case "rate_recipe":
                newMarkObjectResponse = await configuredAxios.put(`/recipes/${objectId}`, {
                    type: type,
                    newMark: payload,
                });
                break;
            case "rate_article":
                // article code
                break;
            default:
                toast.error("Произошла ошибка");
                return state;
        }

        const newMarkAuthorResponse = await configuredAxios.put(`/users/${authorId}`, {
            type: "update_user_rating",
            newMark: payload,
        });

        if (
            newMarkUserResponse.status === 200 &&
            newMarkObjectResponse.status === 200 &&
            newMarkAuthorResponse.status === 200
        ) {
            return {
                type: type,
                objectId: objectId,
                newMark: payload,
            };
        }
    }
);
