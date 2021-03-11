import React from "react"
import AddCommentaryForm from "../../Forms/AddCommentaryForm.jsx"
import {useDispatch, useSelector} from "react-redux"
import {
    List,
    ListItem,
    Box,
    Grid,
    Paper,
    Typography,
    makeStyles,
} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import {deleteCommentary} from "../../../actions/recipesListActions"
import {fetchRecipe} from "../../../actions/recipeActions"


const useStyles = makeStyles((theme) => ({
    reviewsFormPaper: {
        width: "100%",
    },
    button: {
        margin: theme.spacing(1),
    },
}))

const ReviewsBlock = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userLoggedIn = useSelector((state) => state.authorization.userId);
    const reviewsList = useSelector(state => state.recipe.reviews);
    const recipeId = useSelector(state => state.recipe.recipe.id);
    const renderReviews = (reviewsList) => {
        if (reviewsList) {
            return reviewsList.map((review, i) =>
                (<ListItem key={`review${i}`}>
                    <Paper elevation={1}>
                        <Box p={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box py={1}>
                                        <Typography variant="body1">
                                            {review.user_name}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box py={1}>
                                        <Typography variant="body2">
                                            {review.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box py={1}>
                                        {userLoggedIn === review.user_id
                                            ? <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<DeleteIcon/>}
                                                onClick={() => {
                                                    dispatch(deleteCommentary(review.id))
                                                        .then(() => dispatch(fetchRecipe(recipeId)))
                                                        .catch((err) => console.error(err))
                                                }}
                                            >Удалить
                                            </Button>
                                            : null}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </ListItem>
            ))
        }
    }

    return (
        <Box>
            <Typography variant="h5">Комментарии</Typography>
            <List>
                {renderReviews(reviewsList)}
                <ListItem>
                    <Paper elevation={1} className={classes.reviewsFormPaper}>
                        {userLoggedIn ? (
                            <Box p={2}>
                                <AddCommentaryForm />
                            </Box>
                        ) : null}
                    </Paper>
                </ListItem>
            </List>
        </Box>
    )
}

export default ReviewsBlock
