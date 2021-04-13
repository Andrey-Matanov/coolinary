import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import { reducer as authorizationReducer } from "./slices/authorizationSlice";
import { reducer as categoriesReducer } from "./slices/categoriesSlice.js";
import { reducer as ingredientsReducer } from "./slices/ingredientsSlice.js";
import { reducer as profileReducer } from "./slices/profileSlice";
import { reducer as usersListReducer } from "./slices/userListSlice.js";
import { reducer as recipeReducer } from "./slices/recipeSlice.js";
import { reducer as recipesListReducer } from "./slices/recipesListSlice.js";
import { reducer as unitsReducer } from "./slices/unitsSlice.js";

const makeStore = () =>
    configureStore({
        reducer: {
            authorization: authorizationReducer,
            recipesObject: recipesListReducer,
            categories: categoriesReducer,
            ingredients: ingredientsReducer,
            usersList: usersListReducer,
            profile: profileReducer,
            recipe: recipeReducer,
            units: unitsReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    });

export const wrapper = createWrapper(makeStore);
