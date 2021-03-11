import {
    GET_USER_ID_BY_TOKEN,
    USER_LOGIN,
    USER_LOGOUT,
} from "../actions/authorizationActions";

export const authorizationReducer = (
    authorization = { userId: null },
    action
) => {
    switch (action.type) {
        case USER_LOGIN:
        case GET_USER_ID_BY_TOKEN: {
            return { userId: action.payload.userId };
        }
        case USER_LOGOUT: {
            return { userId: null };
        }
        default: {
            return authorization;
        }
    }
};
