import { combineReducers } from "redux";
import { baseURL } from "../../utils";
import { authorizationReducer } from "../reducers/authorizationReducer";
import { recipesListReducer } from "../reducers/recipesListReducer";
import { categoriesReducer } from "../reducers/categoriesReducer";
import { ingredientsReducer } from "../reducers/ingredientsReducer";
import { usersReducer } from "../reducers/usersReducer";
import { ratingReducer } from "../reducers/ratingReducer";
import { profileReducer } from "../reducers/profileReducer";
import { articlesListReducer } from "../reducers/articlesReducer";
import { recipeReducer } from "../reducers/recipeReducer";
import { reviewsReducer } from "../reducers/reviewsReducer";
import { unitsReducer } from "../reducers/unitsReducer";

export const FETCH_CATEGORIES_2 = "FETCH_CATEGORIES_2";

export const fetchCategories2 = () => async (dispatch) => {
    const response = await fetch(`${baseURL}/api/categories`);
    const json = await response.json();

    dispatch({
        type: FETCH_CATEGORIES_2,
        payload: {
            categories: json,
        },
    });
};

const categoriesReducer2 = (categories = [], action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_2: {
            return action.payload.categories;
        }
        default: {
            return categories;
        }
    }
};

const RootReducer = combineReducers({
    authorization: authorizationReducer,
    recipesObject: recipesListReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    usersState: usersReducer,
    rating: ratingReducer,
    profile: profileReducer,
    articles: articlesListReducer,
    recipe: recipeReducer,
    reviews: reviewsReducer,
    units: unitsReducer,
    categories2: categoriesReducer2,
});

export default RootReducer;
