import { FETCH_INGREDIENTS } from "../actions/ingredientsAction";

export const ingredientsReducer = (ingredients = [], action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS: {
            return action.payload.ingredients;
        }
        default: {
            return ingredients;
        }
    }
};
