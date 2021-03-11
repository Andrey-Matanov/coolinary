import React from "react";
import { Box, Grid, List, ListItem, Typography } from "@material-ui/core";
import BoltIcon from "../../Icons/BoltIcon";
import CheeseIcon from "../../Icons/CheeseIcon";
import DrumstickBiteIcon from "../../Icons/DrumstickBiteIcon";
import CandyCaneIcon from "../../Icons/CandyCaneIcon";

const AddRecipeNutrition = ({ calories, proteins, fat, carbs }) => {
    return (
        <div>
            <Box>
                <Typography variant="h5">Пищевая ценность</Typography>
                <Typography variant="caption">
                    Приблизительное значение на основе ингредиентов
                </Typography>
            </Box>
            <List>
                <ListItem>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body1">
                                <BoltIcon color="primary" fontSize="inherit" />{" "}
                                Энергетическая ценность:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                {calories} ккал
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body1">
                                <DrumstickBiteIcon
                                    color="primary"
                                    fontSize="inherit"
                                />
                                Протеины:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                {proteins} г
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body1">
                                <CandyCaneIcon
                                    color="primary"
                                    fontSize="inherit"
                                />
                                Углеводы:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">{carbs} г</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body1">
                                <CheeseIcon
                                    color="primary"
                                    fontSize="inherit"
                                />
                                Жиры:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">{fat} г</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </div>
    );
};

export default AddRecipeNutrition;
