import { baseURL } from "../../utils";

export const RECIPE_IS_LOADING = "@@recipe/RECIPE_IS_LOADING";
export const FETCH_RECIPE = "@@recipe/FETCH_RECIPE";
export const FETCH_RECIPE_ERROR = "@@recipe/FETCH_RECIPE_ERROR";

export const fetchRecipe = (id) => async (dispatch) => {
    dispatch({ type: RECIPE_IS_LOADING });

    const response = await fetch(`${baseURL}/api/recipes/${id}`);
    const json = await response.json();

    if (json.status === "failed") {
        dispatch({ type: FETCH_RECIPE_ERROR });
    } else {
        dispatch({
            type: FETCH_RECIPE,
            payload: json,
        });
    }
};
