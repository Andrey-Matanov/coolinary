import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeStepsList from "../../components/PagesComponents/RecipePage/RecipeStepsList";
import { Container, Box, CircularProgress } from "@material-ui/core";
import { fetchRecipe } from "../../redux/actions/recipeActions.js";
import { useRouter } from "next/router";

const Recipe = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        dispatch(fetchRecipe(id));
    }, []);

    const { status, recipe, ingredients, reviewsList, steps } = useSelector((state) => state.recipe)

    switch (status) {
        case "loading": {
            <Box justifyContent="center" display="flex">
                <CircularProgress color="primary" />
            </Box>
        }
        case "ok": {
            return (
                <Container maxWidth="md">
                    <RecipeStepsList
                        recipe={recipe}
                        ingredients={ingredients}
                        reviews={reviewsList}
                        steps={steps}
                    />
                </Container>
            );
        }
        case "failed": {
            return <RequestError retryFunction={() => dispatch(fetchRecipe(id))} />;
        }
    }
};

export default Recipe;
