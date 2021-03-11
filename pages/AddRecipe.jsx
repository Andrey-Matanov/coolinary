import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchIngredientsAndRecipes } from "../actions/combinedActions";
import AddRecipeForm from "../components/Forms/AddRecipeForm/AddRecipeForm";

const Wrapper = styled.div`
    padding: 20px;
`;

const AddRecipe = ({ ingredients, categories, units }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ingredients.length || !categories.length) {
            dispatch(fetchIngredientsAndRecipes());
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
};

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    categories: state.categories,
    units: state.units,
});

export default connect(mapStateToProps)(AddRecipe);
