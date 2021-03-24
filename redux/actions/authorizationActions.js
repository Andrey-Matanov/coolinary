import axios from "axios";
import { baseURL } from "../../utils";

export const USER_LOGIN = "@@authorization/USER_LOGIN";
export const USER_LOGOUT = "@@authorization/USER_LOGOUT";

export const userLogin = (email) => async (dispatch) => {
    const response = await axios.get(`${baseURL}/api/userdata`, {
        headers: {
            email: email,
        },
    });

    dispatch({
        type: USER_LOGIN,
        payload: {
            userId: response.data._id,
            userName: response.data.name,
        },
    });
};

export const userLogout = () => ({
    type: USER_LOGOUT,
});
