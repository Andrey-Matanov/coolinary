import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchIngredientsAndRecipes } from "../../redux/actions/combinedActions";
import { fetchRecipe } from "../../redux/actions/recipeActions";
import { fetchUnits } from "../../redux/actions/unitsActions";
import LoadingDataComponent from "../../components/Common/LoadingDataComponent";
import AddRecipeForm from "../../components/Forms/AddRecipeForm/AddRecipeForm";
import { AuthContext } from "../../components/Common/Authentication";

const Wrapper = styled.div`
    padding: 20px;
`;

const EditRecipe = ({ ingredients, categories, units, userId }) => {
    const { isUserLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    if (!isUserLoggedIn) {
        router.push("/login");
    }

    const dispatch = useDispatch();
    const { id } = router.query;
    const currentUserId = useSelector((state) => state.authorization.userId);

    useEffect(() => {
        dispatch(fetchRecipe(id));

        if (!units.length) {
            dispatch(fetchUnits());
        }

        if (!ingredients.length && !categories.length) {
            dispatch(fetchIngredientsAndRecipes());
        }
    }, []);

    const recipeStatus = useSelector((state) => state.recipe.status);
    const recipeInfo = useSelector((state) => state.recipe.recipe);
    const recipeIngredients = useSelector((state) => state.recipe.recipe.ingredients);
    const recipeSteps = useSelector((state) => state.recipe.recipe.steps);

    const isRecipeOfUser = recipeInfo.authorId === currentUserId;

    const [initialValues, setInitialValues] = useState({
        name: "",
        image: "",
        categoryId: "",
        time: 0,
        difficulty: "1",
        ingredients: [],
        description: "",
        steps: [],
    });

    useEffect(() => {
        if (
            categories.length > 0 &&
            ingredients.length > 0 &&
            recipeStatus === "ok" &&
            recipeIngredients?.length > 0 &&
            recipeSteps?.length > 0
        ) {
            console.log("newInitialValues");
            setInitialValues({
                name: recipeInfo.name,
                image: recipeInfo.image,
                categoryId: recipeInfo.categoryId,
                time: recipeInfo.time,
                difficulty: recipeInfo.difficulty,
                ingredients: recipeIngredients.map((ingredient) => ({
                    id: ingredient.id,
                    // name: ingredient.name,
                    amount: ingredient.amount,
                    unit_id: ingredient.unit_id,
                })),
                description: recipeInfo.description,
                steps: recipeSteps.map((step) => ({
                    name: step.name,
                    description: step.description,
                    image: step.image,
                })),
            });
        }
    }, [categories, ingredients, recipeStatus, recipeIngredients, recipeSteps]);

    // useEffect(() => {
    //     console.log("recipeStatus: ", recipeStatus);
    //     console.log("recipeIngredients: ", recipeIngredients);
    //     console.log("recipeSteps: ", recipeSteps);
    //     console.log(initialValues);
    // });

    if (ingredients.length && categories.length && units.length && initialValues?.name) {
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
                                authorId={currentUserId}
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
    units: state.units,
    userId: state.authorization.userId,
});

export default connect(mapStateToProps)(EditRecipe);
