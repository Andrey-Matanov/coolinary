import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const colors = [
    "#5aad53",
    "#5aad53",
    "#b1cd4c",
    "#b1cd4c",
    "#fce148",
    "#fce148",
    "#f39451",
    "#f39451",
    "#f39451",
    "#f39451",
];

const useStyles = makeStyles((theme) => ({
    difficultyContainer: {
        height: "20px",
        display: "flex",
        margin: "5px 0",
    },
    difficultyElement: {
        width: "10px",
        height: "20px",
        margin: "0 1px",
    },
    difficultyElementInactive: {
        backgroundColor: "#a5a5a5",
    },
}));

const DifficultyBar = ({ diff }) => {
    const classes = useStyles();
    const difficultyColor = colors[diff - 1];

    const renderScale = Array(10)
        .fill(0)
        .map((item, i) =>
            i < diff ? (
                <div
                    key={i}
                    className={classes.difficultyElement}
                    style={{ backgroundColor: difficultyColor }}
                ></div>
            ) : (
                <div
                    key={i}
                    className={`${classes.difficultyElement} ${classes.difficultyElementInactive}`}
                ></div>
            )
        );

    return <div className={classes.difficultyContainer}>{renderScale}</div>;
};

export default DifficultyBar;
