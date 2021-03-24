import React from "react";
import AddCommentaryForm from "../../Forms/AddCommentaryForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteCommentary } from "../../../redux/actions/recipesListActions.js";
import { fetchRecipe } from "../../../redux/actions/recipeActions.js";

const useStyles = makeStyles((theme) => ({
    reviewsFormPaper: {
        width: "100%",
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const ReviewsBlock = ({ recipeId, commentaries }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authorization.userId);
    const renderReviews = () => {
        if (commentaries?.length > 0) {
            return commentaries.map((review, i) => (
                <ListItem key={`review${i}`}>
                    <Paper elevation={1}>
                        <Box p={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box py={1}>
                                        <Typography variant="body1">{review.user_name}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box py={1}>
                                        <Typography variant="body2">{review.content}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box py={1}>
                                        {userId === review.user_id ? (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => {
                                                    dispatch(deleteCommentary(review.id))
                                                        .then(() => dispatch(fetchRecipe(recipeId)))
                                                        .catch((err) => console.error(err));
                                                }}
                                            >
                                                Удалить
                                            </Button>
                                        ) : null}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </ListItem>
            ));
        }
    };

    return (
        <Box>
            <Typography variant="h5">Комментарии</Typography>
            <List>
                {renderReviews()}
                <ListItem>
                    <Paper elevation={1} className={classes.reviewsFormPaper}>
                        {userId !== null ? (
                            <Box p={2}>
                                <AddCommentaryForm userId={userId} recipeId={recipeId} />
                            </Box>
                        ) : null}
                    </Paper>
                </ListItem>
            </List>
        </Box>
    );
};

export default ReviewsBlock;
