import axios from "axios";
import { baseURL } from "../../utils";

export const GET_USER_ID_BY_TOKEN = "@@authorization/GET_USER_ID_BY_TOKEN";
export const USER_LOGIN = "@@authorization/USER_LOGIN";
export const USER_LOGOUT = "@@authorization/USER_LOGOUT";

export const getUserIdByToken = () => async (dispatch) => {
    const token = window.localStorage.getItem("currentUserToken");
    const response = await axios.get(`${baseURL}/api/get-user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    dispatch({
        type: GET_USER_ID_BY_TOKEN,
        payload: {
            userId: response.data.user.id,
        },
    });
};

export const userLogin = (userId) => ({
    type: USER_LOGIN,
    payload: {
        userId,
    },
});

export const userLogout = () => ({
    type: USER_LOGOUT,
});
