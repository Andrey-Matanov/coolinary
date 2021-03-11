import axios from "axios";
import { baseURL } from "../../utils";

export const FETCH_USER_DATA = "@@profile/FETCH_USER_DATA";
export const FETCH_USER_RECIPES = "@@profile/FETCH_USER_RECIPES";
export const USERNAME_CHANGE = "@@profile/USERNAME_CHANGE";
export const EMAIL_CHANGE = "@@profile/EMAIL_CHANGE";
export const DELETE_USER = "@@profile/DELETE_USER";
export const FETCH_ERROR = "@@profile/FETCH_ERROR";

export const fetchUserData = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseURL}/api/users/${id}`);
        dispatch({
            type: FETCH_USER_DATA,
            payload: {
                userData: {
                    userId: response.data.data.id,
                    userName: response.data.data.name,
                    userEmail: response.data.data.email,
                },
            },
        });
    } catch (err) {
        dispatch({ type: FETCH_ERROR });
    }
};

export const fetchUserRecipes = (authorId) => async (dispatch) => {
    try {
        const response = await fetch(
            `${baseURL}/api/recipes?author_id=${authorId}`
        );
        const json = await response.json();
        dispatch({
            type: FETCH_USER_RECIPES,
            payload: {
                userRecipes: json.recipes,
            },
        });
    } catch (err) {
        dispatch({ type: FETCH_ERROR });
    }
};

export const changeUserName = (userId, newUserName) => async (dispatch) => {
    const token = window.localStorage.getItem("currentUserToken");
    try {
        await axios.patch(
            `${baseURL}/api/users/${userId}`,
            {
                body: {
                    name: JSON.stringify(newUserName),
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

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
    const token = window.localStorage.getItem("currentUserToken");
    try {
        await axios.patch(
            `${baseURL}/api/users/${userId}`,
            {
                body: {
                    email: JSON.stringify(newEmail),
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

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
    const token = window.localStorage.getItem("currentUserToken");
    await axios.delete(`${baseURL}/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    dispatch({
        type: DELETE_USER,
    });
};
