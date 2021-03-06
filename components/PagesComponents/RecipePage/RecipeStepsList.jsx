import React, { useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Box, Typography, Button } from "@material-ui/core";
import { Link as LinkMUI } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import RatingBar from "../../Common/RatingBar.jsx";
import CloudinaryImage from "../../Common/CloudinaryImage";
import DifficultyBar from "../../Common/DifficultyBar";
import ReviewsBlock from "../../Common/Commentaries/ReviewsBlock.jsx";
import Nutrition from "./Nutrition.jsx";
import Ingredients from "./Ingredients";
import { changeRating } from "../../../redux/combinedThunks.js";
import { useSelector } from "react-redux";
import { authorizationUpdateCurrentUserCollections } from "../../../redux/slices/authorizationSlice";

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: "pointer",
    },
    scrolling: {
        height: "80vh",
        paddingRight: "20px",
        paddingLeft: "20px",
        overflowY: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
            display: "block",
            width: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#bfbfbf99",
            borderRadius: "2.5px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#afb3b5",
            borderRadius: "2.5px",
        },
    },
    image: {
        maxWidth: "100%",
        height: "auto",
    },
    diffContainer: {
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "240px",
        paddingRight: "20px",
    },
}));

let formatTime = (sourceTime) => {
    let retVal;
    if (sourceTime <= 60) {
        retVal = sourceTime + " мин.";
    } else {
        retVal = Math.floor(sourceTime / 60) + " ч. " + (sourceTime % 60) + " мин.";
    }
    return retVal;
};

const renderSteps = (steps) => {
    const classes = useStyles();
    if (steps) {
        return steps.map((step, i) => (
            <Grid item xs={12} key={`step${i}`}>
                <Paper elevation={3} square={true}>
                    <Box p={2}>
                        <Box py={2}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Box pr={2}>
                                        <Typography variant="h2">{step.step}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">{step.name}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box py={2} textAlign="center">
                            <CloudinaryImage image={step.image} />
                        </Box>
                        <Box py={2}>
                            <Typography variant="body1">{step.description}</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        ));
    } else {
        return <div></div>;
    }
};

const RecipeStepsList = ({
    recipeId,
    recipe,
    commentaries,
    ingredientsData,
    unitsData,
    category,
    autorizedUserId,
    recipeIsInCollections,
    dispatch,
}) => {
    const classes = useStyles();
    const {
        name,
        authorId,
        authorName,
        difficulty,
        image,
        description,
        time,
        rating,
        ingredients,
        steps,
    } = recipe;
    const currentUserId = useSelector((state) => state.authorization.userId);
    const currentUserRated = useSelector((state) => state.authorization.userMarks.recipes);
    return (
        <Box mt={"45px"}>
            <div style={{ marginTop: "20px" }}></div>
            <Grid container className={classes.scrolling} spacing={5}>
                <Grid item xs={12}>
                    <Paper elevation={3} square={true}>
                        <Box p={2}>
                            <Box mt={3}>
                                <Typography variant="h4">{name}</Typography>
                            </Box>
                            <Box mt={3}>
                                <Typography variant="subtitle1">{category}</Typography>
                            </Box>
                            <Box my={3} textAlign="center">
                                <CloudinaryImage image={image} />
                            </Box>
                            <Box my={3}>
                                <p>
                                    Автор:{" "}
                                    <Link href={`/profile/${authorId}`}>
                                        <LinkMUI className={classes.link}>{authorName}</LinkMUI>
                                    </Link>
                                </p>
                            </Box>
                            <Box my={3}>
                                <div className={classes.diffContainer}>
                                    Сложность: <DifficultyBar diff={difficulty} />
                                </div>
                            </Box>
                            <Box my={3}>Время приготовления: {formatTime(time)}</Box>
                            <Box my={3}>
                                <RatingBar
                                    rating={rating}
                                    isAlreadyRated={
                                        currentUserId === null ||
                                        authorId === currentUserId ||
                                        !!currentUserRated.find((item) => item === recipeId)
                                    }
                                    clickFunction={(rateValue) => {
                                        dispatch(
                                            changeRating({
                                                type: "rate_recipe",
                                                userId: autorizedUserId,
                                                authorId,
                                                objectId: recipeId,
                                                payload: rateValue,
                                            })
                                        );
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} square={true}>
                        <Box p={2}>
                            <Ingredients
                                ingredients={ingredients}
                                ingredientsData={ingredientsData}
                                unitsData={unitsData}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} square={true}>
                        <Box p={2}>
                            <Nutrition
                                ingredients={ingredients}
                                ingredientsData={ingredientsData}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} square={true}>
                        <Box p={2}>
                            <p>Описание: {description}</p>
                        </Box>
                    </Paper>
                </Grid>
                {renderSteps(steps)}
                <Grid item xs={12}>
                    {recipeIsInCollections ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<RemoveIcon />}
                            fullWidth={true}
                            onClick={() => {
                                dispatch(
                                    authorizationUpdateCurrentUserCollections({
                                        type: "remove_recipe",
                                        userId: autorizedUserId,
                                        data: recipeId,
                                    })
                                );
                            }}
                        >
                            Убрать рецепт из своей коллекции
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AddIcon />}
                            fullWidth={true}
                            onClick={() => {
                                dispatch(
                                    authorizationUpdateCurrentUserCollections({
                                        type: "add_recipe",
                                        userId: autorizedUserId,
                                        data: {
                                            id: recipeId,
                                            name: recipe.name,
                                        },
                                    })
                                );
                            }}
                        >
                            Сохранить рецепт в свою коллекцию
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <ReviewsBlock recipeId={recipeId} commentaries={commentaries} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecipeStepsList;
