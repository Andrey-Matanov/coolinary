import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import configuredAxios from "../../utils/configuredAxios.js";
import { fetchRecipeWithInfo, changeRating } from "../combinedThunks.js";

export const fetchRecipe = createAsyncThunk("recipe/FETCH", async (id, thunkAPI) => {
    const response = await configuredAxios.get(`/recipes/${id}`);
    return {
        ...response.data,
        commentaries: response.data.recipeCommentaries,
        recipeCommentaries: undefined,
    };
});

export const updateRecipeCommentaries = createAsyncThunk(
    "recipe/updateCommentaries",
    async (data, thunkAPI) => {
        const { type } = data;
        switch (type) {
            case "add": {
                const { recipeId, userId, text } = data;
                try {
                    const response = await configuredAxios.post("/commentaries", {
                        content: text,
                        targetId: recipeId,
                        authorId: userId,
                    });
                    return {
                        type: type,
                        _id: response.data._id,
                        authorId: userId,
                        content: text,
                    };
                } catch (err) {
                    return err;
                }
            }
            case "delete": {
                const { commentaryId } = data;
                try {
                    await configuredAxios.delete(`/commentaries/${commentaryId}`);
                    return {
                        type: type,
                        _id: commentaryId,
                    };
                } catch (err) {
                    return err;
                }
            }
            case "edit": {
                const { commentaryId, newContent } = data;
                try {
                    await configuredAxios.patch(`/commentaries/${commentaryId}`, {
                        content: newContent,
                    });
                    return {
                        type: type,
                        _id: commentaryId,
                        content: newContent,
                    };
                } catch (err) {
                    return err;
                }
            }
            default: {
                toast.error(`Ошибка комментария: неизвестный тип`);
            }
        }
    }
);

const initialRecipeState = {
    recipe: {},
    status: "loading",
};

const recipeSlice = createSlice({
    name: "recipe",
    initialState: initialRecipeState,
    reducers: {},
    extraReducers: {
        [fetchRecipe.fulfilled]: (state, action) => {
            return {
                recipe: action.payload.recipe,
                status: "ok",
            };
        },
        [fetchRecipe.pending]: (state, action) => {
            return {
                ...initialRecipeState,
                status: "loading",
            };
        },
        [fetchRecipe.rejected]: (state, action) => {
            return {
                ...initialRecipeState,
                status: "failed",
            };
        },
        [fetchRecipeWithInfo.fulfilled]: (state, action) => {
            if (action.payload)
                return {
                    recipe: action.payload.recipe,
                    status: "ok",
                };
            else return { ...state, status: "ok" };
        },
        [fetchRecipeWithInfo.pending]: (state, action) => {
            return {
                ...state,
                status: "loading",
            };
        },
        [fetchRecipeWithInfo.rejected]: (state, action) => {
            return {
                ...initialRecipeState,
                status: "failed",
            };
        },
        [changeRating.fulfilled]: (state, action) => {
            state.recipe.recipe.rating.average =
                (state.recipe.recipe.rating.average * state.recipe.recipe.rating.count +
                    action.payload.newMark) /
                (state.recipe.recipe.rating.count + 1);
            state.recipe.recipe.rating.count++;

            toast.success("Ваша оценка принята");
        },
        [changeRating.rejected]: (state, action) => {
            return state;
        },
        [updateRecipeCommentaries.fulfilled]: (state, action) => {
            switch (action.payload.type) {
                case "add": {
                    const { _id, authorId, content } = action.payload;
                    state.recipe.recipeCommentaries.push({ _id, authorId, content });
                    break;
                }
                case "delete": {
                    state.recipe.recipeCommentaries = state.recipe.recipeCommentaries.filter(
                        (item) => item._id !== action.payload._id
                    );
                    return state;
                }
                case "edit": {
                    const { _id, content } = action.payload;
                    state.recipe.recipeCommentaries.find(
                        (item) => item._id === _id
                    ).content = content;
                    break;
                }
            }
        },
        [updateRecipeCommentaries.rejected]: (state, action) => {
            toast.error(`Произошла ошибка комментирования: ${action.err}`);
            return state;
        },
    },
});

export const { reducer } = recipeSlice;
