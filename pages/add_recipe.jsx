import React, { useContext, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import styled from "styled-components";
import { AuthContext } from "../providers/Authentication";
import AddRecipeForm from "../components/Forms/AddRecipeForm/AddRecipeForm";
import { fetchIngredients } from "../redux/slices/ingredientsSlice.js";
import { fetchCategories } from "../redux/slices/categoriesSlice.js";
import { fetchUnits } from "../redux/slices/unitsSlice.js";
import LoadingDataComponent from "../components/Common/LoadingDataComponent";

const Wrapper = styled.div`
    padding: 20px;
`;

const AddRecipe = ({ ingredients, categories, units }) => {
    const { isUserLoggedIn } = useContext(AuthContext);

    if (!isUserLoggedIn) {
        Router.push("/login");
    }

    const initialValues = {
        name: "",
        image: "",
        categoryId: "",
        time: 0,
        difficulty: "1",
        ingredients: [],
        description: "",
        steps: [],
    };

    const currentUserId = useSelector((state) => state.authorization.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(fetchIngredients());
        }
        if (!categories.length) {
            dispatch(fetchCategories());
        }
        if (!units.length) {
            dispatch(fetchUnits());
        }
    }, []);

    if (isUserLoggedIn && categories.length) {
        return (
            <Wrapper>
                <h1>Добавить рецепт</h1>
                <AddRecipeForm
                    authorId={currentUserId}
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
