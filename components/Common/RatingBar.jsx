import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Star, StarBorder, StarHalf } from "@material-ui/icons";
import { Typography, ButtonBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    difficultyContainer: {
        height: "20px",
        display: "flex",
        margin: "5px 0",
    },

    ratingLink: {
        cursor: "pointer",
        width: "30px",
        margin: "-5px",
        color: "inherit",
    }
}));

const RatingBar = ({ rating, isRated, clickFunction }) => {
    const classes = useStyles();

    const ratingRounded = Math.floor(rating.average / 0.5) * 0.5;

    const [hoveredOn, setHoveredOn] = useState(0);

    const hovered = e => {
        if (!isRated) {
            let val = 0;
            if (e && e.target && e.target.getAttribute('data-star-id')) {
                val = e.target.getAttribute('data-star-id');
            }
            setHoveredOn(val);
        }
    };

    const clicked = e => {
        if (!isRated) {
            const mark = parseInt(e.target.getAttribute("data-star-id"))
            clickFunction(mark);
        }
    }

    const ScaleElement = ({ value, id, isRated }) => {
        return (
            <div data-star-id = { id } className={classes.hover}>
                <ButtonBase disabled = { isRated } style={{pointerEvents: "none", cursor: "pointer"}}>
                    {id - value <= 0 ? (
                        // <a className = "ratingLink">
                            <Star className = {classes.ratingLink} />
                        // </a>
                    ) : Math.abs(id - value) === 0.5 ? (
                        // <a className = "ratingLink">
                            <StarHalf className = {classes.ratingLink} />
                        // </a>
                    ) : (
                        // <a className = "ratingLink">
                            <StarBorder className = {classes.ratingLink} />
                        // </a>
                    )}
                </ButtonBase>
            </div>
    )}

    return (
        <div 
            className={classes.difficultyContainer}
            onMouseOut = { () => hovered(null) }
            onClick = { clicked }
            onMouseOver = { hovered }
        >
            { Array(5).fill(5).map((item, i) => 
                <ScaleElement 
                    id = { i+1 }
                    key = { i }
                    value = { hoveredOn ? parseInt(hoveredOn) : ratingRounded }
                    isRated = { isRated }
                />
            ) }
            <Typography variant="body1">{Math.round(rating.average*10)/10} / 5</Typography>
        </div>
    );
};

export default RatingBar;
