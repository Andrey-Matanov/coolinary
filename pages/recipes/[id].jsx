import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeStepsList from "../../components/PagesComponents/RecipePage/RecipeStepsList";
import { Container, Box, CircularProgress } from "@material-ui/core";
import { fetchRecipeWithInfo } from "../../redux/actions/combinedActions.js";
import { useRouter } from "next/router";

const Recipe = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        dispatch(fetchRecipeWithInfo(id));
    }, []);

    const { status, recipe } = useSelector((state) => state.recipe)
    const ingredients = useSelector((state) => state.ingredients)
    const units = useSelector((state) => state.units)
    const { userName } = useSelector((state) => state.profile)

    switch (status) {
        case "loading": {
            return <Box justifyContent="center" display="flex">
                <CircularProgress color="primary" />
            </Box>
        }
        case "ok": {
            return (
                <Container maxWidth="md">
                    <RecipeStepsList
                        recipe={ recipe.recipe }
                        ingredientsData={ ingredients }
                        author = { userName }
                        unitsData={ units }
                    />
                </Container>
            );
        }
        case "failed": {
            return <RequestError retryFunction={() => dispatch(fetchRecipeWithInfo(id))} />;
        }
    }
};

export default Recipe;
