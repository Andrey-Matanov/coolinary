import { batch } from "react-redux";
import { baseURL } from "../../utils";
import { fetchIngredients, FETCH_INGREDIENTS } from "./ingredientsAction";
import { fetchCategories, FETCH_CATEGORIES } from "./categoriesActions";
import { fetchRecipes, FETCH_RECIPES } from "./recipesListActions";

export const FETCH_INGREDIENTS_AND_RECIPES =
    "@@combined/FETCH_INGREDIENTS_AND_RECIPES";
export const FETCH_RECIPES_AND_CATEGORIES =
    "@@combined/FETCH_RECIPES_AND_CATEGORIES";

export const fetchIngredientsAndRecipes = () => async (dispatch, getState) => {
    if (
        !getState().ingredients.length &&
        !getState().recipesObject.recipes.length
    ) {
        const ingredientsResponse = await fetch(`${baseURL}/api/ingredients`);
        const ingredientsJson = await ingredientsResponse.json();
        const categoriesResponse = await fetch(`${baseURL}/api/categories`);
        const categoriesJson = await categoriesResponse.json();

        batch(() => {
            dispatch({
                type: FETCH_INGREDIENTS,
                payload: {
                    ingredients: ingredientsJson.data,
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
        dispatch(fetchRecipes());
    }
};

export const fetchRecipesAndCategories = (
    currentLastId,
    category = ""
) => async (dispatch, getState) => {
    console.log(getState());
    if (
        !getState().recipesObject.recipes.length &&
        !getState().categories.length
    ) {
        const recipesResponse = await fetch(
            `${baseURL}/api/recipes/`
            // `${baseURL}/api/recipes/?amount=10&last=${currentLastId}&category=${category}`
        );
        const recipesJson = await recipesResponse.json();
        const categoriesResponse = await fetch(`${baseURL}/api/categories`);
        const categoriesJson = await categoriesResponse.json();

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
