import { baseURL } from "../../utils";
import axios from "axios";

export const FETCH_INGREDIENTS = "@@ingredients/FETCH_INGREDIENTS";

export const fetchIngredients = () => async (dispatch) => {
    const response = await axios.get(`${baseURL}/api/ingredients`);
    const json = await response.data;

    dispatch({
        type: FETCH_INGREDIENTS,
        payload: {
            ingredients: json,
        },
    });
};
