import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import { reducer as authorizationReducer } from "./slices/authorizationSlice";
import { categoriesReducer } from "./reducers/categoriesReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { reducer as profileReducer } from "./slices/profileSlice";
import { ratingReducer } from "./reducers/ratingReducer";
import { recipeReducer } from "./reducers/recipeReducer";
import { recipesListReducer } from "./reducers/recipesListReducer";
import { unitsReducer } from "./reducers/unitsReducer";

const makeStore = () =>
    configureStore({
        reducer: {
            authorization: authorizationReducer,
            recipesObject: recipesListReducer,
            categories: categoriesReducer,
            ingredients: ingredientsReducer,
            rating: ratingReducer,
            profile: profileReducer,
            recipe: recipeReducer,
            units: unitsReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    });

export const wrapper = createWrapper(makeStore);
