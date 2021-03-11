import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Typography, IconButton } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles((theme) => ({
    smile: {
        height: "100px",
        width: "100px",
    }
}));

const RequestError = ({ retryFunction }) => {
    const classes = useStyles();

    return <Box p={2}>
            <Paper elevation={3}>
                <Box
                    justifyContent="center"
                    textAlign="center"
                    p={3}
                >
                    <Typography variant="h5">Ой!</Typography>
                    <SentimentVeryDissatisfiedIcon className={classes.smile} />
                    <Typography variant="body2">Что-то пошло не так</Typography>
                    <Typography variant="body2">Попробуйте снова</Typography>
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={retryFunction}
                    >
                        <ReplayIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
};

export default RequestError;