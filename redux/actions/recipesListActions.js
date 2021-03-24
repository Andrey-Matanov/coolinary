import axios from "axios";
import { baseURL } from "../../utils";
import { updateUserRecipesAfterDelete } from "./profileActions";

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

export const addCommentary = (recipeId, userId, userName, text) => async (dispatch) => {
    try {
        axios.put(`${baseURL}/api/recipes/${recipeId}`, {
            user_id: userId,
            user_name: userName,
            content: text,
        });

        dispatch({ type: FETCH_SUCCESS });
    } catch (err) {
        dispatch({ type: FETCH_ERROR });
    }
};
export const deleteCommentary = (reviewId) => async (dispatch) => {
    const token = window.localStorage.getItem("currentUserToken");
    await fetch(`${baseURL}/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch({
        type: DELETE_COMMENTARY,
    });
};

export const fetchRecipes = (currentLastId, category = "") => async (dispatch) => {
    try {
        const response = await fetch(
            `${baseURL}/api/recipes/?amount=10&last=${currentLastId}&category=${category}`
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
    await axios.post(`${baseURL}/api/recipes`, { ...recipe, authorId });

    dispatch({ type: "SUCCESS" });
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
