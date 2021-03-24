import { USER_LOGIN, USER_LOGOUT } from "../actions/authorizationActions";

export const authorizationReducer = (authorization = { userId: null, userName: null }, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            return { userId: action.payload.userId, userName: action.payload.userName };
        }
        case USER_LOGOUT: {
            return { userId: null, userName: null };
        }
        default: {
            return authorization;
        }
    }
};
