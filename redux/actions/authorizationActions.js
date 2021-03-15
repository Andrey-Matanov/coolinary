import axios from "axios";
import { baseURL } from "../../utils";

export const GET_USER_ID_BY_UID = "@@authorization/GET_USER_ID_BY_UID";
export const USER_LOGIN = "@@authorization/USER_LOGIN";
export const USER_LOGOUT = "@@authorization/USER_LOGOUT";

export const getUserIdByUID = () => async (dispatch) => {
    const uid = window.localStorage.getItem("currentUserUID");
    console.log("uid: ", uid);

    const response = await axios.get(`${baseURL}/api/userdata`, {
        headers: {
            uid: uid,
        },
    });

    console.log(response);

    dispatch({
        type: GET_USER_ID_BY_UID,
        payload: {
            userId: response.data._id,
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
