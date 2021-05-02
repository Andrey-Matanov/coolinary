import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Container, Box, CircularProgress } from "@material-ui/core";
import RecipeStepsList from "../../components/PagesComponents/RecipePage/RecipeStepsList";
import RequestError from "../../components/Common/RequestError.jsx";
import { fetchRecipeWithInfo } from "../../redux/combinedThunks.js";

const Recipe = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { status, recipe, recipeCommentaries } = useSelector((state) => state.recipe);
    const ingredients = useSelector((state) => state.ingredients);
    const units = useSelector((state) => state.units);
    const categories = useSelector((state) => state.categories);
    const autorizedUserId = useSelector((state) => state.authorization.userId);
    const recipeIsInCollections = useSelector((state) =>
        state.authorization.collections.recipes?.some((recipe) => recipe.id === id)
    );

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
                            recipe={recipe}
                            commentaries={recipeCommentaries}
                            ingredientsData={ingredients}
                            unitsData={units}
                            category={
                                categories.find((item) => item._id === recipe.categoryId).name
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
