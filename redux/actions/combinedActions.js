import { batch } from "react-redux";
import axios from "axios";
import configuredAxios from "../../utils/configuredAxios";
import { toast } from "react-toastify";
import { baseURL } from "../../utils";
import { fetchIngredients, FETCH_INGREDIENTS } from "./ingredientsAction";
import { fetchCategories, FETCH_CATEGORIES } from "./categoriesActions";
import { fetchRecipes, FETCH_RECIPES } from "./recipesListActions";
import { FETCH_RECIPE, UPDATE_RECIPE_RATING } from "./recipeActions";
import { FETCH_UNITS } from "./unitsActions.js";
// import { AUTHORIZATION_UPDATE_CURRENT_USER_MARKS } from "./authorizationActions.js";

export const fetchIngredientsAndCategories = () => async (dispatch, getState) => {
    if (!getState().ingredients.length && !getState().recipesObject.recipes.length) {
        const ingredientsResponse = await axios.get(`${baseURL}/api/ingredients`);
        const ingredientsJson = await ingredientsResponse.data;
        const categoriesResponse = await axios.get(`${baseURL}/api/categories`);
        const categoriesJson = await categoriesResponse.data;

        batch(() => {
            dispatch({
                type: FETCH_INGREDIENTS,
                payload: {
                    ingredients: ingredientsJson,
                },
            });
            dispatch({
                type: FETCH_CATEGORIES,
                payload: {
                    categories: categoriesJson,
                },
            });
        });
    } else if (!getState().ingredients.length) {
        dispatch(fetchIngredients());
    } else {
        dispatch(fetchCategories());
    }
};

export const fetchRecipesAndCategories = (currentLastId, category = "") => async (
    dispatch,
    getState
) => {
    console.log(getState());
    if (!getState().recipesObject.recipes.length && !getState().categories.length) {
        const recipesResponse = await axios.get(
            `${baseURL}/api/recipes/?amount=10&last=${currentLastId}&category=${category}`
        );
        const recipesJson = await recipesResponse.data;
        const categoriesResponse = await axios.get(`${baseURL}/api/categories`);
        const categoriesJson = await categoriesResponse.data;

        batch(() => {
            dispatch({
                type: FETCH_RECIPES,
                payload: {
                    recipes: recipesJson.recipes,
                    isLastRecipes: recipesJson.isLastRecipes,
                },
            });
            dispatch({
                type: FETCH_CATEGORIES,
                payload: {
                    categories: categoriesJson,
                },
            });
        });
    } else if (!getState().recipesObject.recipes.length) {
        dispatch(fetchRecipes(currentLastId, category));
    } else {
        dispatch(fetchCategories());
    }
};

export const fetchRecipeWithInfo = (id) => async (dispatch, getState) => {
    const recipeResponse = await axios.get(`${baseURL}/api/recipes/${id}`);
    const recipeJson = recipeResponse.data;
    const ingredientsResponse = await axios.get(`${baseURL}/api/ingredients?recipeId=${id}`);
    const ingredientsJson = ingredientsResponse.data;
    const unitsResponse = await axios.get(`${baseURL}/api/units?recipeId=${id}`);
    const unitsJson = unitsResponse.data;
    const categoriesResponse = await axios.get(`${baseURL}/api/categories`);
    const categoriesJson = categoriesResponse.data;

    batch(() => {
        dispatch({
            type: FETCH_INGREDIENTS,
            payload: {
                ingredients: ingredientsJson,
            },
        });
        dispatch({
            type: FETCH_RECIPE,
            payload: {
                recipe: recipeJson,
            },
        });
        dispatch({
            type: FETCH_UNITS,
            payload: {
                units: unitsJson,
            },
        });
        dispatch({
            type: FETCH_CATEGORIES,
            payload: {
                categories: categoriesJson,
            },
        });
    });
    // } else if (!getState().ingredients.length) {
    //     dispatch(fetchIngredients());
    // } else if (!getState().profile.length) {
    //     dispatch(fetchUserData());
    // } else {
    //     dispatch(fetchRecipe());
    // }
};

export const changeRating = (type, userId, authorId, recipeId, payload) => async (dispatch) => {
    const newMarkUserResponse = await configuredAxios.put(`/users/${userId}`, {
        type: type,
        newMark: recipeId,
    });
    const newMarkRecipeResponse = await configuredAxios.put(`/recipes/${recipeId}`, {
        type: type,
        newMark: payload,
    });
    const newMarkAuthorResponse = await configuredAxios.put(`/users/${authorId}`, {
        type: "update_user_rating",
        newMark: payload,
    });

    if (
        newMarkUserResponse.status === 200 &&
        newMarkRecipeResponse.status === 200 &&
        newMarkAuthorResponse.status === 200
    ) {
        batch(() => {
            dispatch({
                // type: AUTHORIZATION_UPDATE_CURRENT_USER_MARKS,
                payload: {
                    type: type,
                    newMark: recipeId,
                },
            });
            dispatch({
                type: UPDATE_RECIPE_RATING,
                payload: {
                    type,
                    newMark: payload,
                },
            });
        });
    }

    toast.dismiss(); // dismisses all notifications
    toast("Спасибо за оценку!"); // shows notification
};
