import produce from "immer";
import {
    ADD_COMMENTARY,
    ADD_RECIPE,
    FETCH_RECIPES,
    CATEGORY_CHANGE,
    FETCH_ERROR,
} from "../actions/recipesListActions";

export const recipesListReducer = (
    recipesObject = {
        recipes: [],
        currentLastId: 0,
        isLastRecipes: false,
        currentCategory: '',
        status: "loading",
    },
    action
) => {
    switch (action.type) {
        case FETCH_RECIPES: {
            return {
                ...recipesObject,
                recipes: [...recipesObject.recipes, ...action.payload.recipes],
                currentLastId: action.payload.recipes[action.payload.recipes.length - 1].id,
                isLastRecipes: action.payload.isLastRecipes === 1,
                currentCategory: recipesObject.currentCategory,
                status: "ok",
            };
        }
        case CATEGORY_CHANGE: {
            return {
                ...recipesObject,
                recipes: [],
                currentLastId: 0,
                isLastRecipes: false,
                currentCategory: action.payload.currentCategory,
                status: "ok",
            }
        }
        case ADD_RECIPE: {
            const recipes = recipesObject.recipes;

            return produce(recipes, (newRecipes) => {
                newRecipes.push({
                    id: "" + (recipes.length + 1),
                    ...action.payload,
                    author: "Admin",
                    image: "https://via.placeholder.com/150/aba",
                    rating: 0,
                    commentaries: [],
                    status: "ok",
                });
            });
        }
        case ADD_COMMENTARY: {
            const { recipeId, text } = action.payload;
            const recipes = recipesObject.recipes;

            return produce(recipes, (newRecipes) => {
                newRecipes
                    .find((recipe) => recipe.id === recipeId)
                    .commentaries.push({
                        id: 5,
                        authorId: 1,
                        text,
                    });
            });
        }
        case FETCH_ERROR: {
            return {
                ...recipesObject,
                status: "failed"
            }
        }
        default: {
            return recipesObject;
        }
    }
};
