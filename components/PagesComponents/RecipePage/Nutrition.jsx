import React from "react";
import { List, ListItem, Box, Typography, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import DrumstickBiteIcon from "../../Icons/DrumstickBiteIcon";
import CheeseIcon from "../../Icons/CheeseIcon";
import CandyCaneIcon from "../../Icons/CandyCaneIcon";
import BoltIcon from "../../Icons/BoltIcon";

const Nutrition = ({ ingredients, ingredientsData }) => {
    const theme = useTheme();

    let nutritionValues = {
        calories: 0,
        protein: 0,
        fat: 0,
        carb: 0,
    };

    if (ingredients) {
        ingredients.map((item) => {
            const referencedIngredient = ingredientsData.find(
                (itemFind) => itemFind._id === item.id
            );
            nutritionValues.calories += referencedIngredient.calories * item.amount;
            nutritionValues.protein += referencedIngredient.protein * item.amount;
            nutritionValues.fat += referencedIngredient.fat * item.amount;
            nutritionValues.carb += referencedIngredient.carb * item.amount;
        });
    }

    nutritionValues
        ? Object.keys(nutritionValues).forEach((item) => {
              nutritionValues[item] = Math.ceil(nutritionValues[item], 0);
          })
        : null;

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
                                <BoltIcon color="secondary" fontSize="inherit" /> Энергетическая
                                ценность:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                {nutritionValues.calories / 100} ккал
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body1">
                                <DrumstickBiteIcon color="secondary" fontSize="inherit" /> Протеины:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                {nutritionValues.protein / 100} г
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body1">
                                <CandyCaneIcon color="secondary" fontSize="inherit" /> Углеводы:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">{nutritionValues.carb / 100} г</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body1">
                                <CheeseIcon color="secondary" fontSize="inherit" /> Жиры:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">{nutritionValues.fat / 100} г</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </div>
    );
};

export default Nutrition;
