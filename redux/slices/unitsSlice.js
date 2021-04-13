import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../utils/configuredAxios.js";

import { fetchRecipeWithInfo } from "../combinedThunks.js";

export const FETCH = "units/FETCH";

export const fetchUnits = createAsyncThunk(FETCH, async (thunkAPI) => {
    const response = await configuredAxios.get(`/units`);
    return response.data;
});

const initialUnitsState = [];

const unitsSlice = createSlice({
    name: "units",
    initialState: initialUnitsState,
    reducers: {},
    extraReducers: {
        [fetchUnits.fulfilled]: (state, action) => {
            return action.payload;
        },
        [fetchUnits.pending]: (state, action) => {
            return initialUnitsState;
        },
        [fetchUnits.rejected]: (state, action) => {
            return initialUnitsState;
        },
        [fetchRecipeWithInfo.fulfilled]: (state, action) => {
            return action.payload.units;
        },
        [fetchRecipeWithInfo.pending]: (state, action) => {
            return initialUnitsState;
        },
        [fetchRecipeWithInfo.rejected]: (state, action) => {
            return initialUnitsState;
        },
    },
});

export const { reducer } = unitsSlice;
