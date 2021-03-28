import {
    USER_DATA_IS_LOADING,
    FETCH_USER_DATA,
    UPDATE_USER_RECIPES_AFTER_DELETE,
    UPDATE_USER_INFO,
    USERNAME_CHANGE,
    EMAIL_CHANGE,
    DELETE_USER,
    FETCH_ERROR,
} from "../actions/profileActions";

export const profileReducer = (
    profile = {
        profileUserId: null,
        userName: null,
        userEmail: null,
        userRecipes: [],
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
                status: "loading",
            };
        }
        case FETCH_USER_DATA: {
            return {
                profileUserId: action.payload.userData.profileUserId,
                userName: action.payload.userData.userName,
                userEmail: action.payload.userData.userEmail,
                userRecipes: action.payload.userData.userRecipes,
                status: "ok",
            };
        }
        case FETCH_ERROR: {
            return {
                profileUserId: null,
                userName: null,
                userEmail: null,
                userRecipes: [],
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
                status: null,
            };
        }

        default: {
            return profile;
        }
    }
};
