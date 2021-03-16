import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeStepsList from "../../components/PagesComponents/RecipePage/RecipeStepsList";
import { Container, Box, CircularProgress } from "@material-ui/core";
import { fetchRecipeIngredientsAuthor } from "../../redux/actions/combinedActions.js";
import { useRouter } from "next/router";

const Recipe = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        dispatch(fetchRecipeIngredientsAuthor(id));
    }, []);

    const { status, recipe } = useSelector((state) => state.recipe)
    const ingredients = useSelector((state) => state.ingredients)
    const { userName } = useSelector((state) => state.profile)

    switch (status) {
        case "loading": {
            console.log('Now loading')
            return <Box justifyContent="center" display="flex">
                <CircularProgress color="primary" />
            </Box>
        }
        case "ok": {
            console.log('Now ok')
            return (
                <Container maxWidth="md">
                    <RecipeStepsList
                        recipe={recipe.recipe}
                        ingredientsData={ingredients}
                        author = {userName}
                    />
                </Container>
            );
        }
        case "failed": {
            return <RequestError retryFunction={() => dispatch(fetchRecipeIngredientsAuthor(id))} />;
        }
    }
};

export default Recipe;
