import axios from "axios";
import { baseURL } from "../../utils";

export const RECIPE_IS_LOADING = "@@recipe/RECIPE_IS_LOADING";
export const FETCH_RECIPE = "@@recipe/FETCH_RECIPE";
export const UPDATE_RECIPE_COMMENTARIES = "@@recipe/UPDATE_RECIPE_COMMENTARIES";
export const FETCH_RECIPE_ERROR = "@@recipe/FETCH_RECIPE_ERROR";
export const UPDATE_RECIPE_RATING = "@@recipe/UPDATE_RECIPE_RATING";
export const RECIPE_DATA_IS_LOADING = "@@recipe/RECIPE_DATA_IS_LOADING";

export const fetchRecipe = (id) => async (dispatch) => {
    dispatch({ type: RECIPE_IS_LOADING });

    const response = await axios.get(`${baseURL}/api/recipes/${id}`);
    const data = await response.data;

    if (data.status === "failed") {
        dispatch({ type: FETCH_RECIPE_ERROR });
    } else {
        dispatch({
            type: FETCH_RECIPE,
            payload: {
                ...data,
                commentaries: data.recipeCommentaries,
                recipeCommentaries: undefined,
            },
        });
    }
};

export const updateRecipeCommentaries = (updateType, content) => {
    if (updateType === "add") {
        return {
            type: UPDATE_RECIPE_COMMENTARIES,
            payload: {
                updateType,
                newCommentary: content,
            },
        };
    } else if (updateType === "delete") {
        return {
            type: UPDATE_RECIPE_COMMENTARIES,
            payload: {
                updateType,
                commentaryId: content,
            },
        };
    } else if (updateType === "edit") {
        return {
            type: UPDATE_RECIPE_COMMENTARIES,
            payload: {
                updateType,
                updatedCommentaryValues: content,
            },
        };
    }
};

export const updateRating = (newMark) => {
    return {
        type: UPDATE_RECIPE_RATING,
        payload: newMark,
    };
}

export const recipeDataIsLoading = () => ({ type: RECIPE_DATA_IS_LOADING })