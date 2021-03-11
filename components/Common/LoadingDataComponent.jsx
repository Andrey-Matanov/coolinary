import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import React from "react";

const LoadingDataComponent = () => {
    return (
        <Grid item xs={12}>
            <Box
                justifyContent="center"
                display="flex"
                style={{
                    position: "absolute",
                    top: "45vh",
                    left: "45vw",
                }}
            >
                <CircularProgress color="primary" />
                <Typography variant="body1" color="primary">
                    Загрузка данных...
                </Typography>
            </Box>
        </Grid>
    );
};

export default LoadingDataComponent;
