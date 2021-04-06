import axios from "axios";
import { baseURL } from "../../utils";
import {
    updateUserRecipesAfterCreation,
    updateUserRecipesAfterDelete,
} from "../slices/profileSlice";
import { updateRecipeCommentaries } from "./recipeActions";
import configuredAxios from "../../utils/configuredAxios";
import { toast } from "react-toastify";

export const ADD_RECIPE = "@@recipesList/ADD_RECIPE";
export const EDIT_RECIPE = "@@recipesList/EDIT_RECIPE";
export const DELETE_RECIPE = "@@recipesList/DELETE_RECIPE";
export const ADD_COMMENTARY = "@@recipesList/ADD_COMMENTARY";
export const DELETE_COMMENTARY = "@@recipesList/DELETE_COMMENTARY";
export const FETCH_RECIPES = "@@recipesList/FETCH_RECIPES";
export const FETCH_CATEGORIES = "@@recipesList/FETCH_CATEGORIES";
export const FETCH_ERROR = "@@recipesList/FETCH_ERR";
export const CATEGORY_CHANGE = "@@recipesList/CATEGORY_CHANGE";
export const FETCH_SUCCESS = "@@recipesList/FETCH_SUCCESS";
export const FETCH_STARTED = "@@recipesList/FETCH_STARTED";
export const ADD_COMMENTARY_FAILURE = "@@recipesList/ADD_COMMENTARY_FAILURE";
export const DELETE_COMMENTARY_FAILURE = "@@recipesList/DELETE_COMMENTARY_FAILURE";
export const EDIT_COMMENTARY_FAILURE = "@@recipesList/EDIT_COMMENTARY_FAILURE";

export const addCommentary = (recipeId, userId, userName, text) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseURL}/api/commentaries`, {
            content: text,
            targetId: recipeId,
            authorId: userId,
            authorName: userName,
        });

        dispatch(
            updateRecipeCommentaries("add", {
                _id: response.data._id,
                authorId: userId,
                authorName: userName,
                content: text,
            })
        );
    } catch (error) {
        dispatch({ type: ADD_COMMENTARY_FAILURE, payload: error });
    }
};

export const deleteCommentary = (commentaryId) => async (dispatch) => {
    try {
        await configuredAxios.delete(`/commentaries/${commentaryId}`);

        dispatch(updateRecipeCommentaries("delete", commentaryId));
    } catch (error) {
        dispatch({ type: DELETE_COMMENTARY_FAILURE, payload: error });
    }
};

export const editCommentary = (commentaryId, newContent) => async (dispatch) => {
    try {
        await configuredAxios.patch(`/commentaries/${commentaryId}`, {
            content: newContent,
        });

        dispatch(
            updateRecipeCommentaries("edit", {
                commentaryId,
                newContent,
            })
        );
    } catch (error) {
        dispatch({ type: EDIT_COMMENTARY_FAILURE, payload: error });
    }
};

export const fetchRecipes = (currentLastId, categoryId = "") => async (dispatch) => {
    try {
        const response = await fetch(
            `${baseURL}/api/recipes?amount=10&last=${currentLastId}&categoryId=${categoryId}`
        );
        const data = await response.json();

        dispatch({
            type: FETCH_RECIPES,
            payload: {
                recipes: data.recipes,
                isLastRecipes: data.isLastRecipes,
            },
        });
    } catch (err) {
        dispatch({ type: FETCH_ERROR });
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        const response = await fetch(`${baseURL}/api/categories`);
        const json = await response.json();

        dispatch({
            type: FETCH_CATEGORIES,
            payload: {
                recipes: json.recipes,
            },
        });
    } catch (err) {
        dispatch({ type: FETCH_ERROR });
    }
};

export const addRecipe = (recipe, authorId) => async (dispatch) => {
    const response = await axios.post(`${baseURL}/api/recipes`, { ...recipe, authorId });
    const newRecipeId = response.data.newRecipeId;
    dispatch(
        updateUserRecipesAfterCreation({
            id: newRecipeId,
            name: recipe.name,
        })
    );
};

export const editRecipe = (recipe, authorId, recipeId) => async (dispatch) => {
    await axios.patch(`${baseURL}/api/recipes/${recipeId}`, { ...recipe, authorId });

    dispatch({ type: "SUCCESS" });
};

export const deleteRecipe = (recipeId) => async (dispatch) => {
    axios.delete(`${baseURL}/api/recipes/${recipeId}`);

    dispatch(updateUserRecipesAfterDelete(recipeId));
};

export const switchCategory = (newCategory) => async (dispatch) => {
    dispatch({
        type: CATEGORY_CHANGE,
        payload: {
            currentCategory: newCategory,
        },
    });
};
