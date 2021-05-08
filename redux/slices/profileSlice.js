import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios";

export const fetchUserData = createAsyncThunk("profile/fetchUserData", async (id) => {
    const response = await configuredAxios.get(`/users/${id}`);

    return {
        status: "ok",
        profileUserId: id,
        userName: response.data.name,
        userEmail: response.data.email,
        avatar: response.data.avatar,
        userBorn: response.data.userBorn,
        userFrom: response.data.userFrom,
        userRecipes: response.data.userRecipes,
        userCollections: response.data.collections,
    };
});

export const updateUserInfo = createAsyncThunk("profile/updateUserInfo", async (userData) => {
    const { userId, ...newUserInfo } = userData;

    await configuredAxios.patch(`/users/${userId}`, newUserInfo);

    return newUserInfo;
});

export const deleteUser = createAsyncThunk("profile/deleteUser", async (userId) => {
    await configuredAxios.delete(`/recipes?authorId=${userId}`);
    await configuredAxios.delete(`/users/${userId}`);

    return;
});

const initialProfileValues = {
    profileUserId: null,
    userName: null,
    userEmail: null,
    avatar: "",
    userBorn: null,
    userFrom: "",
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
        [fetchUserData.pending]: () => {
            return {
                ...initialProfileValues,
                status: "loading",
            };
        },
        [fetchUserData.fulfilled]: (state, action) => {
            return { ...action.payload, toastId: null }; // current profile userdata
        },
        [fetchUserData.rejected]: () => {
            toast.error("Ошибка при попытке загрузить данные пользователя");

            return {
                ...initialProfileValues,
                status: "failed",
            };
        },
        [updateUserInfo.pending]: (state) => {
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

            if (newUserInfo.avatar) {
                state.avatar = newUserInfo.avatar;
                toast.update(state.toastId, {
                    autoClose: 1500,
                });
                toast.success("Аватар был успешно изменён!");
            }

            if (newUserInfo.userBorn) {
                state.userBorn = newUserInfo.userBorn;
                toast.update(state.toastId, {
                    autoClose: 1500,
                });
                toast.success("Дата рождения была успешно изменена!");
            }

            if (newUserInfo.userFrom) {
                state.userFrom = newUserInfo.userFrom;
                toast.update(state.toastId, {
                    autoClose: 1500,
                });
                toast.success("Город был успешно изменён!");
            }
        },
        [updateUserInfo.rejected]: (state) => {
            toast.error("Ошибка при попытке изменить информацию о пользователе!");

            return state;
        },
        [deleteUser.pending]: (state) => {
            toast.info("Удаление вашего профиля...");

            return state;
        },
        [deleteUser.fulfilled]: () => {
            toast.success("Ваш профиль был успешно удален!");

            return { ...initialProfileValues, status: null };
        },
        [deleteUser.rejected]: (state) => {
            toast.error("Произошла ошибка при удалении профиля");

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
