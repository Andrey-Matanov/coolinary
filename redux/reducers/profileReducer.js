import {
    USER_DATA_IS_LOADING,
    FETCH_USER_DATA,
    UPDATE_USER_RECIPES_AFTER_DELETE,
    UPDATE_USER_INFO,
    USERNAME_CHANGE,
    EMAIL_CHANGE,
    DELETE_USER,
    FETCH_ERROR,
    PROFILE_UPDATE_CURRENT_USER_COLLECTIONS,
} from "../actions/profileActions";

export const profileReducer = (
    profile = {
        profileUserId: null,
        userName: null,
        userEmail: null,
        userRecipes: [],
        userCollections: {
            recipes: [],
            articles: [],
        },
        status: null,
    },
    action
) => {
    switch (action.type) {
        case USER_DATA_IS_LOADING: {
            return {
                profileUserId: null,
                userName: null,
                userEmail: null,
                userRecipes: [],
                userCollections: {
                    recipes: [],
                    articles: [],
                },
                status: "loading",
            };
        }
        case FETCH_USER_DATA: {
            return {
                profileUserId: action.payload.userData.profileUserId,
                userName: action.payload.userData.userName,
                userEmail: action.payload.userData.userEmail,
                userRecipes: action.payload.userData.userRecipes,
                userCollections: action.payload.userData.userCollections,
                status: "ok",
            };
        }
        case FETCH_ERROR: {
            return {
                profileUserId: null,
                userName: null,
                userEmail: null,
                userRecipes: [],
                userCollections: {
                    recipes: [],
                    articles: [],
                },
                status: "failed",
            };
        }
        case UPDATE_USER_RECIPES_AFTER_DELETE: {
            return {
                ...profile,
                userRecipes: profile.userRecipes.filter(
                    (recipe) => recipe.id !== action.payload.recipeId
                ),
            };
        }
        case UPDATE_USER_INFO: {
            return {
                ...profile,
                userName: action.payload.newUserInfo.name,
            };
        }
        case USERNAME_CHANGE: {
            return {
                ...profile,
                userName: action.payload.name,
            };
        }
        case EMAIL_CHANGE: {
            return {
                ...profile,
                userEmail: action.payload.email,
            };
        }
        case DELETE_USER: {
            return {
                profileUserId: null,
                userName: null,
                userEmail: null,
                userRecipes: [],
                userCollections: {
                    recipes: [],
                    articles: [],
                },
                status: null,
            };
        }
        case PROFILE_UPDATE_CURRENT_USER_COLLECTIONS: {
            const newCollections = { ...profile.userCollections };

            switch (action.payload.type) {
                case "add_recipe": {
                    newCollections.recipes.push(action.payload.newRecipe);

                    return {
                        ...profile,
                        collections: newCollections,
                    };
                }
                case "remove_recipe": {
                    newCollections.recipes = newCollections.recipes.filter(
                        (recipe) => recipe.id !== action.payload.removedRecipeId
                    );

                    return {
                        ...profile,
                        userCollections: newCollections,
                    };
                }
                default: {
                    return profile;
                }
            }
        }
        default: {
            return profile;
        }
    }
};
