import React from "react";
import Ingredients from "./Ingredients";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { Paper, Grid, Box, Typography } from "@material-ui/core";
import ReviewsBlock from "../../Common/Commentaries/ReviewsBlock.jsx";
import Nutrition from "./Nutrition.jsx";
// import AddCommentaryForm from '../components/Forms/AddCommentaryForm';
import DifficultyBar from "../../Common/DifficultyBar";
import RatingBar from "../../Common/RatingBar.jsx";
import CloudinaryImage from "../../Common/CloudinaryImage";
import { Link as LinkMUI } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
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

const RecipeStepsList = ({ recipeId, recipe, commentaries, ingredientsData, unitsData, category }) => {
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
                                    <Link className="author-link" href={`/profile/${authorId}`}>
                                        <a><LinkMUI variant="body1">{authorName}</LinkMUI></a>
                                    </Link>
                                </p>
                            </Box>
                            <Box my={3}>
                                <div className={classes.diffContainer}>Сложность: <DifficultyBar diff={difficulty} /></div>
                            </Box>
                            <Box my={3}>Время приготовления: {formatTime(time)}</Box>
                            <Box my={3}>
                                <RatingBar rating={rating} />
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
                    <ReviewsBlock recipeId={recipeId} commentaries={commentaries} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecipeStepsList;
