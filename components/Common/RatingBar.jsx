import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Star, StarBorder, StarHalf } from '@material-ui/icons'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    difficultyContainer: {
        height: "20px",
        display: "flex",
        margin: "5px 0",
    },
}));

const RatingBar = ({ rating }) => {
    const classes = useStyles();

    const ratingRounded = Math.floor(rating / 0.5) * 0.5;

    const renderScale = Array(5)
        .fill(5)
        .map((item, i) =>
            (i - ratingRounded + 1) <= 0 ? (
                <Star key={i} />
            ) : (
                (Math.abs(i - ratingRounded + 1) === 0.5) ? (
                    <StarHalf key={i} />
                ) : (
                    <StarBorder key={i} />
                )
            )
        );

    return <div className={classes.difficultyContainer}>
            {renderScale}
            <Typography variant="body1">
                {rating} / 5
            </Typography>
        </div>;
};

export default RatingBar;
