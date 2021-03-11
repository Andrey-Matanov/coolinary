import { FETCH_CATEGORIES } from "../actions/categoriesActions";

export const categoriesReducer = (categories = [], action) => {
    switch (action.type) {
        case FETCH_CATEGORIES: {
            return action.payload.categories.data;
        }
        default: {
            return categories;
        }
    }
};
