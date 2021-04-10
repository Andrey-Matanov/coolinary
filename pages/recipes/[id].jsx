import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Container, Box, CircularProgress } from "@material-ui/core";
import RecipeStepsList from "../../components/PagesComponents/RecipePage/RecipeStepsList";
import { fetchRecipeWithInfo } from "../../redux/actions/combinedActions.js";
import { recipeDataIsLoading } from "../../redux/actions/recipeActions.js";

const Recipe = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { status, recipe } = useSelector((state) => state.recipe);
    const ingredients = useSelector((state) => state.ingredients);
    const units = useSelector((state) => state.units);
    const categories = useSelector((state) => state.categories);
    const autorizedUserId = useSelector((state) => state.authorization.userId);
    const recipeIsInCollections = useSelector((state) =>
        state.authorization.collections.recipes?.some((recipe) => recipe.id === id)
    );

    useLayoutEffect(() => {
        if (id !== null && id !== undefined && recipe.recipe?.recipe._id !== id)
            dispatch(recipeDataIsLoading());
    }, [id]);

    useEffect(() => {
        if (status === "loading") dispatch(fetchRecipeWithInfo(id));
    }, [status]);

    useEffect(() => {
        const { id } = router.query;
        console.log(id);

        if (id) {
            dispatch(fetchRecipeWithInfo(id));
        }
    }, [id]);

    switch (status) {
        case "loading": {
            return (
                <Box justifyContent="center" display="flex">
                    <CircularProgress color="primary" />
                </Box>
            );
        }
        case "ok": {
            return (
                <>
                    <Container maxWidth="md">
                        <RecipeStepsList
                            recipeId={id}
                            recipe={recipe.recipe.recipe}
                            commentaries={recipe.recipe.recipeCommentaries}
                            ingredientsData={ingredients}
                            unitsData={units}
                            category={
                                categories.find(
                                    (item) => item._id === recipe.recipe.recipe.categoryId
                                ).name
                            }
                            autorizedUserId={autorizedUserId}
                            recipeIsInCollections={recipeIsInCollections}
                            dispatch={dispatch}
                        />
                    </Container>
                </>
            );
        }
        case "failed": {
            return <RequestError retryFunction={() => dispatch(fetchRecipeWithInfo(id))} />;
        }
    }
};

export default Recipe;
