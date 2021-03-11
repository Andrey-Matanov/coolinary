import {
    FETCH_USER_DATA,
    FETCH_USER_RECIPES,
    USERNAME_CHANGE,
    EMAIL_CHANGE,
    DELETE_USER,
    FETCH_ERROR,
} from "../actions/profileActions";

export const profileReducer = (
    profile = {
        userId: null,
        userName: null,
        userEmail: null,
        userRecipes: [],
        status: "loading",
    },
    action
) => {
    switch (action.type) {
        case FETCH_USER_DATA: {
            return {
                ...profile,
                userId: action.payload.userData.userId,
                userName: action.payload.userData.userName,
                userEmail: action.payload.userData.userEmail,
                status: "ok",
            };
        }
        case FETCH_USER_RECIPES: {
            return {
                ...profile,
                userRecipes: action.payload.userRecipes,
                status: "ok",
            };
        }
        case USERNAME_CHANGE: {
            return {
                ...profile,
                userName: action.payload.name,
                status: "ok",
            };
        }
        case EMAIL_CHANGE: {
            return {
                ...profile,
                userEmail: action.payload.email,
                status: "ok",
            };
        }
        case DELETE_USER: {
            return {
                userId: null,
                userName: null,
                userEmail: null,
                userRecipes: [],
                status: "ok"
            };
        }
        case FETCH_ERROR: {
            return { ...profile, status: "failed"}
        }
        default: {
            return profile;
        }
    }
};
