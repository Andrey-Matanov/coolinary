import { FETCH_RATING } from "../actions/ratingActions";

export const ratingReducer = (rating = [], action) => {
    switch (action.type) {
        case FETCH_RATING: {
            return action.payload.rating;
        }
        default: {
            return rating;
        }
    }
};
