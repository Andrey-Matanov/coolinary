import { FETCH_REVIEWS } from '../actions/reviewsActions';

const reviewsStore = [
    
];

export const reviewsReducer = (store = reviewsStore, action) => {
    switch (action.type) {
        case FETCH_REVIEWS: {
            return action.payload;
        }
        default: {
            return store;
        }
    }
};