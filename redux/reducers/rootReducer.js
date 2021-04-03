import { combineReducers } from "redux";
import { authorizationReducer } from "../reducers/authorizationReducer";
import { recipesListReducer } from "../reducers/recipesListReducer";
import { categoriesReducer } from "../reducers/categoriesReducer";
import { ingredientsReducer } from "../reducers/ingredientsReducer";
import { usersReducer } from "../reducers/usersReducer";
import { ratingReducer } from "../reducers/ratingReducer";
import { profileReducer } from "../reducers/profileReducer";
import { articlesListReducer } from "../reducers/articlesReducer";
import { recipeReducer } from "../reducers/recipeReducer";
import { unitsReducer } from "../reducers/unitsReducer";

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
    units: unitsReducer,
});

export default RootReducer;
