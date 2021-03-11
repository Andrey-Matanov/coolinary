import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesList from "../components/PagesComponents/RecipesPage/RecipesList.jsx";
import RequestError from "../components/Common/RequestError.jsx";
import { fetchRecipes, switchCategory } from "../actions/recipesListActions.js";
import { fetchRecipesAndCategories } from "../actions/combinedActions.js";

import {
    Container,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LoadingDataComponent from "../components/Common/LoadingDataComponent.jsx";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Recipes = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const recipesList = useSelector((state) => state.recipesObject.recipes);

    const {
        currentLastId,
        isLastRecipes,
        currentCategory,
        status,
    } = useSelector((state) => state.recipesObject);

    const categories = useSelector((state) => state.categories);

    const [isScrolledDown, setIsScrolledDown] = useState(false);

    useEffect(() => {
        if (!recipesList.length)
            dispatch(fetchRecipesAndCategories(currentLastId, currentCategory));
    }, [dispatch]);

    useEffect(() => {
        if (isScrolledDown && !isLastRecipes) {
            dispatch(fetchRecipes(currentLastId, currentCategory));
            setIsScrolledDown(false);
        }
    }, [isScrolledDown]);

    const handleChange = (e) => {
        dispatch(switchCategory(e.target.value));
        dispatch(fetchRecipes(0, e.target.value));
    };

    const renderRecipes = () => {
        setIsScrolledDown(true);
    };

    const renderCategoryOptions = (categories) => {
        return categories.map((item) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        ));
    };

    const renderSucceed = () => {
        return (
            <>
                <Box mt={3}>
                    <Typography variant="h5">Рецепты</Typography>
                </Box>
                <Box mb={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            native
                            value={currentCategory}
                            onChange={handleChange}
                            className={classes.selectEmpty}
                        >
                            <option aria-label="None" value="" />
                            {renderCategoryOptions(categories)}
                        </Select>
                    </FormControl>
                </Box>
                {recipesList.length ? (
                    <RecipesList
                        recipesList={recipesList}
                        loadRecipes={renderRecipes}
                        isLast={isLastRecipes}
                        currentLastId={currentLastId}
                    />
                ) : (
                    <LoadingDataComponent />
                )}
            </>
        );
    };

    return (
        <Container maxWidth="lg">
            {status === "failed" ? (
                <RequestError
                    retryFunction={() =>
                        dispatch(
                            fetchRecipesAndCategories(
                                currentLastId,
                                currentCategory
                            )
                        )
                    }
                />
            ) : (
                renderSucceed()
            )}
        </Container>
    );
};

export default Recipes;
