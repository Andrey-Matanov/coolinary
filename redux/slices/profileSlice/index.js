import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchUserData, updateUserInfo, deleteUser } from "./thunks";

const initialProfileValues = {
    profileUserId: null,
    userName: null,
    userEmail: null,
    userRecipes: [],
    userCollections: {
        recipes: [],
        articles: [],
    },
    toastId: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        ...initialProfileValues,
        status: null,
    },
    reducers: {
        updateUserRecipesAfterCreation(state, action) {
            const newUserRecipe = action.payload;

            state.userRecipes.push(newUserRecipe);
            toast.success("Новый рецепт был успешно добавлен");
        },
        updateUserRecipesAfterDelete(state, action) {
            const removedRecipeId = action.payload;
            let updatedRecipes = [...state.userRecipes];

            updatedRecipes = updatedRecipes.filter((recipe) => recipe.id !== removedRecipeId);
            toast.success("Рецепт был успешно удален");

            return { ...state, userRecipes: updatedRecipes };
        },
        profileUpdateCurrentUserCollections(state, action) {
            console.log(action.payload);

            switch (action.payload.type) {
                case "add_recipe": {
                    const newRecipe = action.payload.newRecipe;

                    state.userCollections.recipes.push(newRecipe);
                    toast.success("Рецепт был успешно добавлен в вашу коллекцию рецептов!");

                    break;
                }
                case "remove_recipe": {
                    const removedRecipeId = action.payload.removedRecipeId;
                    const newUserCollectionsRecipes = state.userCollections.recipes.filter(
                        (recipe) => recipe.id !== removedRecipeId
                    );

                    state.userCollections.recipes = newUserCollectionsRecipes;
                    toast.success("Рецепт был успешно удален из вашей коллекции рецептов!");

                    break;
                }
                default: {
                    toast.error("Произошла ошибка!");

                    return state;
                }
            }
        },
    },
    extraReducers: {
        [fetchUserData.pending]: (state, action) => {
            return {
                ...initialProfileValues,
                status: "loading",
            };
        },
        [fetchUserData.fulfilled]: (state, action) => {
            return { ...action.payload, toastId: null }; // current profile userdata
        },
        [fetchUserData.rejected]: (state, action) => {
            toast.error("Ошибка при попытке загрузить данные пользователя");

            return {
                ...initialProfileValues,
                status: "failed",
            };
        },
        [updateUserInfo.pending]: (state, action) => {
            state.toastId = toast.info("Обновление данных...", { autoClose: false });

            return state;
        },
        [updateUserInfo.fulfilled]: (state, action) => {
            const newUserInfo = action.payload;

            if (newUserInfo.name) {
                state.userName = newUserInfo.name;
                toast.update(state.toastId, {
                    autoClose: 1500,
                });
                toast.success("Имя пользователя было успешно изменено!");
            }

            if (newUserInfo.email) {
                state.userEmail = newUserInfo.email;
                toast.update(state.toastId, {
                    autoClose: 1500,
                });
                toast.success("Имя почтового ящика пользователя было успешно изменено!");
            }
        },
        [updateUserInfo.rejected]: (state, action) => {
            toast.error("Ошибка при попытке изменить информацию о пользователе!");

            return state;
        },
        [deleteUser.pending]: (state, action) => {
            toast.info("Удаление вашего профиля...");

            return state;
        },
        [deleteUser.fulfilled]: (state, action) => {
            toast.success("Ваш профиль был успешно удален!");

            return { ...initialProfileValues, status: null };
        },
        [deleteUser.rejected]: (state, action) => {
            toast.success("Произошла ошибка при удалении профиля");

            return state;
        },
    },
});

export const {
    actions: {
        userDataIsLoading,
        updateUserRecipesAfterCreation,
        updateUserRecipesAfterDelete,
        profileUpdateCurrentUserCollections,
    },
    reducer,
} = profileSlice;
