import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchIngredientsAndRecipes } from "../actions/combinedActions";
import { fetchRecipe } from "../actions/recipeActions";
import { fetchUnits } from "../actions/unitsActions";
import LoadingDataComponent from "../components/Common/LoadingDataComponent";
import AddRecipeForm from "../components/Forms/AddRecipeForm/AddRecipeForm";

const Wrapper = styled.div`
    padding: 20px;
`;

const EditRecipe = ({ ingredients, categories }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const recipeStatus = useSelector((state) => state.recipe.status);
    const recipeInfo = useSelector((state) => state.recipe.recipe);
    const recipeIngredients = useSelector((state) => state.recipe.ingredients);
    const recipeSteps = useSelector((state) => state.recipe.steps);
    const userId = useSelector((state) => state.authorization.userId);
    const units = useSelector((state) => state.units);

    const isRecipeOfUser = recipeInfo.user_id === userId;

    const initialValues =
        categories.length && ingredients.length && recipeStatus
            ? {
                  name: recipeInfo.name,
                  image: recipeInfo.image,
                  category_id: categories.find(
                      (category) => category.name === recipeInfo.catalog_name
                  ).id,
                  time: recipeInfo.time,
                  difficulty: recipeInfo.complexity,
                  ingredients: recipeIngredients.map((ingredient) => ({
                      id: ingredient.id,
                      name: ingredient.name,
                      amount: ingredient.amount,
                      unit_id: ingredient.units_id,
                  })),
                  description: recipeInfo.description,
                  steps: recipeSteps.map((step) => ({
                      name: step.name,
                      description: step.description,
                      image: step.image,
                  })),
              }
            : {};

    useEffect(() => {
        dispatch(fetchRecipe(id));

        if (!units.length) {
            dispatch(fetchUnits());
        }

        if (!ingredients.length || !categories.length) {
            dispatch(fetchIngredientsAndRecipes());
        }
    }, []);

    if (
        ingredients.length &&
        categories.length &&
        units.length &&
        initialValues
    ) {
        switch (recipeStatus) {
            case "loading": {
                return <LoadingDataComponent />;
            }
            case "ok": {
                return (
                    <Wrapper>
                        <h1>Редактирование рецепта</h1>
                        {isRecipeOfUser ? (
                            <AddRecipeForm
                                ingredients={ingredients}
                                categories={categories}
                                units={units}
                                formInitialValues={initialValues}
                                submitButtonLabel="Обновить рецепт"
                                additionalInfo={{
                                    type: "edit",
                                    recipeId: id,
                                }}
                            />
                        ) : (
                            <div>Вы не можете редактировать чужой рецепт</div>
                        )}
                    </Wrapper>
                );
            }
            case "failed": {
                return <h2>Такого рецепта не существует</h2>;
            }
        }
    } else {
        return <LoadingDataComponent />;
    }
};

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    categories: state.categories,
});

export default connect(mapStateToProps)(EditRecipe);
