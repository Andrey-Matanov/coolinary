import configuredAxios from "../../utils/configuredAxios";

export const USER_DATA_IS_LOADING = "@@profile/USER_DATA_IS_LOADING";
export const FETCH_USER_DATA = "@@profile/FETCH_USER_DATA";
export const FETCH_ERROR = "@@profile/FETCH_ERROR";
export const UPDATE_USER_RECIPES_AFTER_DELETE = "@@profile/UPDATE_USER_RECIPES_AFTER_DELETE";
export const UPDATE_USER_INFO = "@@profile/UPDATE_USER_INFO";
export const USERNAME_CHANGE = "@@profile/USERNAME_CHANGE";
export const EMAIL_CHANGE = "@@profile/EMAIL_CHANGE";
export const DELETE_USER = "@@profile/DELETE_USER";

export const userDataIsLoading = () => ({ type: USER_DATA_IS_LOADING });

export const fetchUserData = (id) => async (dispatch) => {
    try {
        const response = await configuredAxios.get(`/users/${id}`);

        dispatch({
            type: FETCH_USER_DATA,
            payload: {
                userData: {
                    profileUserId: id,
                    userName: response.data.name,
                    userEmail: response.data.email,
                    userRecipes: response.data.userRecipes,
                    status: "ok",
                },
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_ERROR });
    }
};

export const updateUserRecipesAfterDelete = (recipeId) => ({
    type: UPDATE_USER_RECIPES_AFTER_DELETE,
    payload: {
        recipeId: recipeId,
    },
});

export const updateUserInfo = (userId, newUserInfo) => async (dispatch) => {
    console.log(newUserInfo);
    await configuredAxios.patch(`/users/${userId}`, newUserInfo);

    dispatch({
        type: UPDATE_USER_INFO,
        payload: {
            newUserInfo,
        },
    });
};

export const changeUserName = (userId, newUserName) => async (dispatch) => {
    try {
        await configuredAxios.patch(`/users/${userId}`, {
            name: JSON.stringify(newUserName),
        });

        dispatch({
            type: USERNAME_CHANGE,
            payload: {
                name: newUserName,
            },
        });
    } catch (err) {
        dispatch({ type: FETCH_ERROR });
    }
};

export const changeEmail = (userId, newEmail) => async (dispatch) => {
    try {
        await configuredAxios.patch(`/users/${userId}`, {
            email: JSON.stringify(newEmail),
        });

        dispatch({
            type: EMAIL_CHANGE,
            payload: {
                email: newEmail,
            },
        });
    } catch (err) {
        dispatch({ type: FETCH_ERROR });
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    await configuredAxios.delete(`/recipes?authorId=${userId}`);
    await configuredAxios.delete(`/users/${userId}`);

    dispatch({
        type: DELETE_USER,
    });
};
