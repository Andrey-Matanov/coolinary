import React, { useContext, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Router from "next/router";
import styled from "styled-components";
import { AuthContext } from "../components/Common/Authentication";
import AddRecipeForm from "../components/Forms/AddRecipeForm/AddRecipeForm";
import { fetchIngredients } from "../redux/actions/ingredientsAction";
import { fetchCategories } from "../redux/actions/categoriesActions";
import { fetchUnits } from "../redux/actions/unitsActions";
import LoadingDataComponent from "../components/Common/LoadingDataComponent";

const Wrapper = styled.div`
    padding: 20px;
`;

const AddRecipe = ({ ingredients, categories, units }) => {
    const dispatch = useDispatch();
    const { isUserLoggedIn } = useContext(AuthContext);

    if (!isUserLoggedIn) {
        Router.push("/login");
    }

    useEffect(() => {
        if (isUserLoggedIn && !ingredients.length) {
            dispatch(fetchIngredients());
        }
        if (isUserLoggedIn && !categories.length) {
            dispatch(fetchCategories());
        }
        if (isUserLoggedIn && !units.length) {
            dispatch(fetchUnits());
        }
    }, []);

    const initialValues = {
        name: "",
        image: "",
        category_id: 1,
        time: 0,
        difficulty: "1",
        ingredients: [],
        description: "",
        steps: [],
    };

    if (isUserLoggedIn) {
        return (
            <Wrapper>
                <h1>Добавить рецепт</h1>
                <AddRecipeForm
                    ingredients={ingredients}
                    categories={categories}
                    units={units}
                    formInitialValues={initialValues}
                    submitButtonLabel="Добавить рецепт"
                    additionalInfo={{ type: "add" }}
                />
            </Wrapper>
        );
    } else {
        return <LoadingDataComponent />;
    }
};

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    categories: state.categories,
    units: state.units,
});

export default connect(mapStateToProps)(AddRecipe);
