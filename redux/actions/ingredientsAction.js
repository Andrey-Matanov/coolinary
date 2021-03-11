import { baseURL } from "../../utils";

export const FETCH_INGREDIENTS = "@@ingredients/FETCH_INGREDIENTS";

export const fetchIngredients = () => async (dispatch) => {
    const response = await fetch(`${baseURL}/api/ingredients`);
    const json = await response.json();

    dispatch({
        type: FETCH_INGREDIENTS,
        payload: {
            ingredients: json.data,
        },
    });
};
