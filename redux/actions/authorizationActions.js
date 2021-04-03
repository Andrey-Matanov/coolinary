import { toast } from "react-toastify";
import configuredAxios from "../../utils/configuredAxios";
import { profileUpdateCurrentUserCollections } from "./profileActions";

export const USER_LOGIN = "@@authorization/USER_LOGIN";
export const AUTHORIZATION_UPDATE_CURRENT_USER_COLLECTIONS =
    "@@authorization/AUTHORIZATION_UPDATE_CURRENT_USER_COLLECTIONS";
export const USER_LOGOUT = "@@authorization/USER_LOGOUT";
export const ERROR = "@@authorization/ERROR";

export const userLogin = (email) => async (dispatch) => {
    const response = await configuredAxios.get(`/userdata`, {
        headers: {
            email: email,
        },
    });

    dispatch({
        type: USER_LOGIN,
        payload: {
            userId: response.data._id,
            userName: response.data.name,
            collections: response.data.collections,
        },
    });
};

export const authorizationUpdateCurrentUserCollections = (type, userId, payload) => async (
    dispatch
) => {
    switch (type) {
        case "add_recipe": {
            const response = await configuredAxios.put(`/users/${userId}`, {
                type,
                newRecipe: payload,
            });

            if (response.status === 200) {
                dispatch({
                    type: AUTHORIZATION_UPDATE_CURRENT_USER_COLLECTIONS,
                    payload: {
                        type,
                        newRecipe: payload,
                    },
                });
            }

            dispatch(profileUpdateCurrentUserCollections(type, payload));
            toast.dismiss(); // dismisses all notifications
            toast("Вы успешно сохранили рецепт в свою коллекцию"); // shows notification

            break;
        }
        case "remove_recipe": {
            const response = await configuredAxios.put(`/users/${userId}`, {
                type,
                removedRecipeId: payload,
            });

            if (response.status === 200) {
                dispatch({
                    type: AUTHORIZATION_UPDATE_CURRENT_USER_COLLECTIONS,
                    payload: {
                        type,
                        removedRecipeId: payload,
                    },
                });
            }

            dispatch(profileUpdateCurrentUserCollections(type, payload));
            toast.dismiss(); // dismisses all notifications
            toast("Вы успешно удалили рецепт из своей коллекции"); // shows notification

            break;
        }
        default: {
            dispatch({
                type: ERROR,
            });
        }
    }
};

export const userLogout = () => ({
    type: USER_LOGOUT,
});
