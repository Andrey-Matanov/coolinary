import {
    USER_LOGIN,
    AUTHORIZATION_UPDATE_CURRENT_USER_COLLECTIONS,
    USER_LOGOUT,
} from "../actions/authorizationActions";

export const authorizationReducer = (
    authorization = { userId: null, userName: null, collections: { recipes: [], articles: [] } },
    action
) => {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                userId: action.payload.userId,
                userName: action.payload.userName,
                collections: action.payload.collections,
            };
        }
        case AUTHORIZATION_UPDATE_CURRENT_USER_COLLECTIONS: {
            const newCollections = { ...authorization.collections };

            switch (action.payload.type) {
                case "add_recipe": {
                    newCollections.recipes.push(action.payload.newRecipe);

                    return {
                        ...authorization,
                        collections: newCollections,
                    };
                }
                case "remove_recipe": {
                    newCollections.recipes = newCollections.recipes.filter(
                        (recipe) => recipe.id !== action.payload.removedRecipeId
                    );

                    return {
                        ...authorization,
                        collections: newCollections,
                    };
                }
                default: {
                    return authorization;
                }
            }
        }
        case USER_LOGOUT: {
            return { userId: null, userName: null, collections: { recipes: [], articles: [] } };
        }
        default: {
            return authorization;
        }
    }
};
