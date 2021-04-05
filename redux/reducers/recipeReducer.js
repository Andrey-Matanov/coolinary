import {
    RECIPE_DATA_IS_LOADING,
    FETCH_RECIPE,
    FETCH_RECIPE_ERROR,
    UPDATE_RECIPE_COMMENTARIES,
    UPDATE_RECIPE_RATING,
} from "../actions/recipeActions";

const recipeObject = {
    status: "loading",
    recipe: {},
};

export const recipeReducer = (recipe = recipeObject, action) => {
    switch (action.type) {
        case RECIPE_DATA_IS_LOADING: {
            return { recipe: null, status: "loading" };
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
            const updatedCommentaries = updatedRecipes.recipe.recipe.recipeCommentaries;

            if (type === "add") {
                updatedCommentaries.push(action.payload.newCommentary);
            } else if (type === "delete") {
                updatedRecipes.recipe.recipe.recipeCommentaries = updatedCommentaries.filter(
                    (commentary) => commentary._id !== action.payload.commentaryId
                );
            } else if (type === "edit") {
                updatedCommentaries.find(
                    (commentary) =>
                        commentary._id === action.payload.updatedCommentaryValues.commentaryId
                ).content = action.payload.updatedCommentaryValues.newContent;
            }

            return updatedRecipes;
        }
        case UPDATE_RECIPE_RATING: {
            const markToAdd = action.payload.newMark;
            const updatedRecipe = { ...recipe };
            const updatedRating = updatedRecipe.recipe.recipe.recipe.rating;
            updatedRating.average = (updatedRating.average * updatedRating.count + markToAdd)/(updatedRating.count + 1);
            updatedRating.count++;

            return updatedRecipe;
        }
        default: {
            return recipe;
        }
    }
};
