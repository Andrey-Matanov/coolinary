import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import configuredAxios from "../../../utils/configuredAxios";
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
};

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        ...initialProfileValues,
        status: null,
    },
    reducers: {
        updateUserRecipesAfterDelete(state, action) {
            const removedRecipeId = action.payload;
            let updatedRecipes = [...state.userRecipes];

            updatedRecipes = updatedRecipes.filter((recipe) => recipe.id !== removedRecipeId);
            toast.success("Рецепт был успешно удален");

            return { ...state, userRecipes: updatedRecipes };
        },
        changeEmailSuccess(state, action) {
            const newEmail = action.payload;

            state.userEmail = newEmail;
            toast.success("Вы успешно изменили почту!");
        },
        changeEmailFailure(state, action) {
            toast.error("Произошла ошибка при попытке изменить имя!");

            return state;
        },
        deleteUserSuccess(state, action) {
            toast.success("Ваш профиль был успешно удален!");

            return { ...initialProfileValues, status: null };
        },
        deleteUserFailure(state, action) {
            toast.success("Произошла ошибка при удалении профиля");

            return state;
        },
        profileUpdateCurrentUserCollections(state, action) {
            switch (action.payload.type) {
                case "add_recipe": {
                    const newRecipe = action.payload.newRecipe;

                    state.userCollections.recipes.push(newRecipe);
                    toast("Рецепт был успешно добавлен в вашу коллекцию рецептов!");

                    break;
                }
                case "remove_recipe": {
                    const removedRecipeId = action.payload.removedRecipeId;
                    const userCollectionsRecipes = state.userCollections.recipes;
                    const newUserCollectionsRecipes = userCollectionsRecipes.filter(
                        (recipe) => recipe.id !== removedRecipeId
                    );

                    toast("Рецепт был успешно удален из вашей коллекции рецептов!");

                    return {
                        ...state,
                        userCollections: {
                            recipes: newUserCollectionsRecipes,
                        },
                    };
                }
                default: {
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
            return action.payload; // current profile userdata
        },
        [fetchUserData.rejected]: (state, action) => {
            toast.error("Ошибка при попытке загрузить данные пользователя");

            return {
                ...initialProfileValues,
                status: "failed",
            };
        },
        [updateUserInfo.pending]: (state, action) => {
            toast.info("Обновление данных...");

            return state;
        },
        [updateUserInfo.fulfilled]: (state, action) => {
            const newUserInfo = action.payload.newUserInfo;

            toast.success("Информация о пользователе была успешно изменена!");

            return { ...state, ...newUserInfo };
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
        // [changeUserName.pending]: (state, action) => {
        //     toast.info("Обновление имени пользователя...");

        //     return state;
        // },
        // [changeUserName.fulfilled]: (state, action) => {
        //     const newUserName = action.payload;

        //     state.userName = newUserName;
        //     toast.success("Вы успешно изменили имя!");
        // },
        // [changeUserName.rejected]: (state, action) => {
        //     toast.error("Произошла ошибка при попытке изменить имя!");

        //     return state;
        // },
    },
});

const {
    actions: { changeEmailSuccess, changeEmailFailure, deleteUserSuccess, deleteUserFailure },
} = profileSlice;

export const changeEmail = (userId, newEmail) => async (dispatch) => {
    try {
        await configuredAxios.patch(`/users/${userId}`, {
            email: JSON.stringify(newEmail),
        });

        dispatch(changeEmailSuccess(newEmail));
    } catch (error) {
        console.log(error);
        dispatch(changeEmailFailure());
    }
};

// export const todosStatusSelector = (state) => state.todosReducer.status;
// export const todosArraySelector = (state) => state.todosReducer.todos;

export const {
    actions: {
        userDataIsLoading,
        updateUserRecipesAfterCreation,
        updateUserRecipesAfterDelete,
        profileUpdateCurrentUserCollections,
    },
    reducer,
} = profileSlice;
