import {
    RECIPE_IS_LOADING,
    FETCH_RECIPE,
    FETCH_RECIPE_ERROR,
    UPDATE_RECIPE_COMMENTARIES,
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
        case UPDATE_RECIPE_COMMENTARIES: {
            const type = action.payload.updateType;
            const updatedRecipes = { ...recipe };
            const updatedCommentaries = updatedRecipes.recipe.recipe.commentaries;

            if (type === "add") {
                updatedCommentaries.push(action.payload.newCommentary);
            } else if (type === "remove") {
                updatedCommentaries.splice(action.payload.commentaryIndex, 1);
            }

            return updatedRecipes;
        }
        default: {
            return recipe;
        }
    }
};
