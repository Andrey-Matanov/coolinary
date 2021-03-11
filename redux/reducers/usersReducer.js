import {
    CLEAR_USERS,
    FETCH_USERS,
    USERS_LOADING,
} from "../actions/usersActions";

export const usersReducer = (
    usersState = { status: null, users: [] },
    action
) => {
    switch (action.type) {
        case USERS_LOADING: {
            return { status: "loading", users: [] };
        }
        case FETCH_USERS: {
            return { status: "ok", users: action.payload.users };
        }
        case CLEAR_USERS: {
            return { status: null, users: [] };
        }
        default: {
            return usersState;
        }
    }
};
