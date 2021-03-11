import React from "react";
import Ingredients from "./Ingredients";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Paper, Grid, Box, Typography } from "@material-ui/core";

import ReviewsBlock from "../../../components/PagesComponents/RecipePage/ReviewsBlock.jsx";
import Nutrition from "./Nutrition.jsx";
// import AddCommentaryForm from '../components/Forms/AddCommentaryForm';
import DifficultyBar from "../../Common/DifficultyBar";
import RatingBar from "../../Common/RatingBar.jsx";
import RecipeImage from "./RecipeImage";

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
}));

let formatTime = (sourceTime) => {
    let retVal;
    if (sourceTime <= 60) {
        retVal = sourceTime + " мин.";
    } else {
        retVal =
            Math.floor(sourceTime / 60) + " ч. " + (sourceTime % 60) + " мин.";
    }
    return retVal;
};

const renderReviews = (reviews, users) => {
    if (reviews) {
        reviews.map((review) => (
            <div
                style={{
                    backgroundColor: "lightgray",
                    padding: "5px",
                    borderRadius: "5px",
                    marginBottom: "5px",
                }}
                key={review.id}
            >
                <p>
                    Автор:{" "}
                    {users.find((user) => user.id === review.authorId).name}
                </p>
                <p>{review.text}</p>
            </div>
        ));
    } else {
        return <div></div>;
    }
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
                                        <Typography variant="h2">
                                            {step.step}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">
                                        {step.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box py={2} textAlign="center">
                            <RecipeImage
                                image={step.image}
                                alt={step.name}
                                className={classes.image}
                            />
                        </Box>
                        <Box py={2}>
                            <Typography variant="body1">
                                {step.description}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        ));
    } else {
        return <div></div>;
    }
};

const RecipeStepsList = ({ ingredients, recipe, reviews, steps }) => {
    const classes = useStyles();
    const {
        name,
        user_name,
        complexity,
        image,
        description,
        time,
        rating,
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
                            <Box my={3} textAlign="center">
                                <RecipeImage
                                    image={image}
                                    alt={name}
                                    className={classes.image}
                                />
                            </Box>
                            <Box my={3}>
                                <p>
                                    Автор:{" "}
                                    <Link
                                        className="author-link"
                                        to={`/profile/${recipe.user_id}`}
                                    >
                                        {user_name}
                                    </Link>
                                </p>
                            </Box>
                            <Box my={3}>Рейтинг:</Box>
                            <DifficultyBar diff={complexity} />
                            <Box my={3}>
                                Время приготовления: {formatTime(time)}
                            </Box>
                            <Box my={3}>
                                <RatingBar rating={rating} />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} square={true}>
                        <Box p={2}>
                            <Ingredients ingredients={ingredients} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} square={true}>
                        <Box p={2}>
                            <Nutrition ingredients={ingredients} />
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
                <Grid item>
                    <ReviewsBlock reviews={reviews} />
                    {/* <div
                        style={{
                            border: "1px solid black",
                            padding: "5px",
                            borderRadius: "5px",
                        }}
                    >
                        <h2 style={{ marginBottom: "10px" }}>Комментарии:</h2>
                        {renderReviews()}
                    </div> */}
                    {/* <AddCommentaryForm recipeId={recipeId} /> */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecipeStepsList;
