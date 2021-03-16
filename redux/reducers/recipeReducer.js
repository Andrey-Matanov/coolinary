import {
    RECIPE_IS_LOADING,
    FETCH_RECIPE,
    FETCH_RECIPE_ERROR,
} from "../actions/recipeActions";

const recipeObject = {
    status: "loading",
    recipe: {},
};

export const recipeReducer = (recipe = recipeObject, action) => {
    switch (action.type) {
        case RECIPE_IS_LOADING: {
            return { ...recipe, status: "loading" };
        }
        case FETCH_RECIPE: {
            return {
                status: "ok",
                recipe: action.payload,
            };
        }
        case FETCH_RECIPE_ERROR: {
            return { ...recipe, status: "failed" };
        }
        default: {
            return recipe;
        }
    }
};
