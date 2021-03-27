import React from "react";
import AddCommentaryForm from "../../Forms/AddCommentaryForm.jsx";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Commentary from "./Commentary.jsx";

const useStyles = makeStyles((theme) => ({
    reviewsFormPaper: {
        width: "100%",
    },
}));

const ReviewsBlock = ({ recipeId, commentaries }) => {
    const classes = useStyles();
    const currentUserId = useSelector((state) => state.authorization.userId);

    const renderReviews = () => {
        if (commentaries?.length > 0) {
            return commentaries.map((commentary, i) => (
                <ListItem key={i}>
                    <Paper elevation={1}>
                        <Box p={2}>
                            <Commentary
                                currentUserId={currentUserId}
                                commentaryId={commentary._id}
                                authorId={commentary.authorId}
                                authorName={commentary.authorName}
                                content={commentary.content}
                            />
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
                        {currentUserId !== null ? (
                            <Box p={2}>
                                <AddCommentaryForm
                                    currentUserId={currentUserId}
                                    recipeId={recipeId}
                                />
                            </Box>
                        ) : null}
                    </Paper>
                </ListItem>
            </List>
        </Box>
    );
};

export default ReviewsBlock;
