import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesList from "../../components/PagesComponents/RecipesPage/RecipesList.jsx";
import RequestError from "../../components/Common/RequestError.jsx";
import {
    fetchRecipes,
    switchCategory,
    searchRecipes,
} from "../../redux/slices/recipesListSlice.js";
import { fetchRecipesAndCategories } from "../../redux/combinedThunks.js";

import {
    Container,
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    Paper,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LoadingDataComponent from "../../components/Common/LoadingDataComponent.jsx";

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
    const recipesListStatus = useSelector((state) => state.recipesObject.status);
    const { currentLastId, isLastRecipes, currentCategory, status } = useSelector(
        (state) => state.recipesObject
    );
    const categories = useSelector((state) => state.categories);
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (!recipesList.length)
            dispatch(fetchRecipesAndCategories({ currentLastId, categoryId: currentCategory }));
    }, [dispatch]);

    useEffect(() => {
        if (isScrolledDown && !isLastRecipes) {
            if (recipesListStatus === "search") {
                dispatch(
                    searchRecipes({
                        currentLastId,
                        search: searchValue,
                        categoryId: currentCategory,
                    })
                );
            } else {
                dispatch(fetchRecipes({ currentLastId, categoryId: currentCategory }));
            }
            setIsScrolledDown(false);
        }
    }, [isScrolledDown]);

    const handleChange = (e) => {
        dispatch(switchCategory(e.target.value));
        dispatch(fetchRecipes({ currentLastId: 0, categoryId: e.target.value }));
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            // const search = e.target.value;
            if (searchValue === "") {
                dispatch(switchCategory(currentCategory));
                dispatch(
                    fetchRecipes({
                        currentLastId: 0,
                        categoryId: currentCategory,
                    })
                );
            } else {
                dispatch(switchCategory(currentCategory));
                dispatch(
                    searchRecipes({
                        currentLastId: 0,
                        search: searchValue,
                        categoryId: currentCategory,
                    })
                );
            }
        }
    };

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value === "") {
            dispatch(switchCategory(currentCategory));
            dispatch(
                fetchRecipes({
                    currentLastId: 0,
                    categoryId: currentCategory,
                })
            );
        }
    };

    const renderRecipes = () => {
        setIsScrolledDown(true);
    };

    const renderCategoryOptions = (categories) => {
        return categories.map((item) => (
            <option key={item._id} value={item._id}>
                {item.name}
            </option>
        ));
    };

    const renderSucceed = () => {
        return (
            <>
                <Box mt={3}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Box mt={3}>
                                <Typography variant="h5">Рецепты</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
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
                                        {categories.length
                                            ? renderCategoryOptions(categories)
                                            : null}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="filled-search"
                                        label="Search field"
                                        type="search"
                                        value={searchValue}
                                        onKeyPress={handleSearch}
                                        onSubmit={handleSearch}
                                        onChange={handleSearchValue}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {(recipesListStatus === "ok" || recipesListStatus === "search") &&
                recipesList.length ? (
                    <RecipesList
                        recipesList={recipesList}
                        loadRecipes={renderRecipes}
                        isLast={isLastRecipes}
                        currentLastId={currentLastId}
                    />
                ) : recipesListStatus === "ok" ? (
                    <Box width="100%" display="flex" p={1} justifyContent="center">
                        <Paper elevation={2}>
                            <Box py={2} px={5}>
                                <Typography align="center" variant="subtitle1">
                                    Рецептов в этой категории пока нет. Но скоро будут!
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
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
                            fetchRecipesAndCategories({
                                currentLastId: 0,
                                categoryId: currentCategory,
                            })
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
