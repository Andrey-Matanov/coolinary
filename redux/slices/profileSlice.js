import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import configuredAxios from "../../utils/configuredAxios";

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
        userDataIsLoading(state, action) {
            return {
                ...initialProfileValues,
                status: "loading",
            };
        },
        fetchUserDataSuccess(state, action) {
            const userData = action.payload;

            return { ...userData, status: "ok" };
        },
        fetchUserDataError(state, action) {
            return {
                ...initialProfileValues,
                status: "failed",
            };
        },
        updateUserRecipesAfterCreation(state, action) {
            const newRecipe = action.payload;

            state.userRecipes.push(newRecipe);
            toast.success("Новый рецепт был успешно добавлен");
        },
        updateUserRecipesAfterDelete(state, action) {
            const removedRecipeId = action.payload;
            let updatedRecipes = [...state.userRecipes];

            updatedRecipes = updatedRecipes.filter((recipe) => recipe.id !== removedRecipeId);
            toast.success("Рецепт был успешно удален");

            return { ...state, userRecipes: updatedRecipes };
        },
        updateUserInfoSuccess(state, action) {
            const newUserInfo = action.payload.newUserInfo;

            toast.success("Информация о пользователе была успешно изменена!");

            return { ...state, ...newUserInfo };
        },
        updateUserInfoFailure(state, action) {
            toast.error("Ошибка при попытке изменить информацию о пользователе!");

            return state;
        },
        changeUserNameSuccess(state, action) {
            const newUserName = action.payload;

            state.userName = newUserName;
            toast.success("Вы успешно изменили имя!");
        },
        changeUserNameFailure(state, action) {
            toast.error("Произошла ошибка при попытке изменить имя!");

            return state;
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
});

const {
    actions: {
        fetchUserDataSuccess,
        fetchUserDataError,
        updateUserInfoSuccess,
        updateUserInfoFailure,
        changeUserNameSuccess,
        changeUserNameFailure,
        changeEmailSuccess,
        changeEmailFailure,
        deleteUserSuccess,
        deleteUserFailure,
    },
} = profileSlice;

export const fetchUserData = (id) => async (dispatch) => {
    try {
        const response = await configuredAxios.get(`/users/${id}`);

        dispatch(
            fetchUserDataSuccess({
                profileUserId: id,
                userName: response.data.name,
                userEmail: response.data.email,
                userRecipes: response.data.userRecipes,
                userCollections: response.data.collections,
                status: "ok",
            })
        );
    } catch (error) {
        console.log(error);

        dispatch(
            fetchUserDataError({
                profileUserId: null,
                userName: null,
                userEmail: null,
                userRecipes: [],
                userCollections: {
                    recipes: [],
                    articles: [],
                },
            })
        );
    }
};

export const updateUserInfo = (userId, newUserInfo) => async (dispatch) => {
    try {
        await configuredAxios.patch(`/users/${userId}`, newUserInfo);

        dispatch(updateUserInfoSuccess(newUserInfo));
    } catch (error) {
        console.log(error);
        dispatch(updateUserInfoFailure());
    }
};

export const changeUserName = (userId, newUserName) => async (dispatch) => {
    try {
        await configuredAxios.patch(`/users/${userId}`, {
            name: JSON.stringify(newUserName),
        });

        dispatch(changeUserNameSuccess(newUserName));
    } catch (error) {
        console.log(error);
        dispatch(changeUserNameFailure());
    }
};

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

export const deleteUser = (userId) => async (dispatch) => {
    try {
        await configuredAxios.delete(`/recipes?authorId=${userId}`);
        await configuredAxios.delete(`/users/${userId}`);

        dispatch(deleteUserSuccess());
    } catch (error) {
        console.log(error);
        dispatch(deleteUserFailure());
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
