import React from "react";
import {
    List,
    ListItem,
    Divider,
    Box,
    Typography,
    Grid,
} from "@material-ui/core";
import { Fragment } from "react";

const Ingredients = ({ ingredients, ingredientsData, unitsData }) => {
    const renderIngredientsList = (ingredients, ingredientsData) => {
        if (ingredients && ingredientsData && unitsData) {
            return ingredients.map((item) => 
                {
                    const unitNames = [].concat(unitsData.find(unitsItem => unitsItem._id === item.unit_id).name);
                    let unitName;
                    switch (item.amount%10) {
                        case 1: {
                            unitName = unitNames[0];
                            break;
                        }
                        case 2, 3, 4: {
                            unitName = unitNames[1];
                            break;
                        }
                        default: {
                            unitName = unitNames[2];
                        }
                    }
                    return (
                        <Fragment key={ item.id }>
                        <ListItem>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Typography variant="body1">
                                        { ingredientsData.find(itemFind => itemFind._id === item.id).name }:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        { item.amount } { unitName }
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* <ListItemText variant="body1">{item.ingredient_name}: {item.count} {item.unit_name}</ListItemText> */}
                        </ListItem>
                        <Divider />
                    </Fragment>)
                }
            );
        } else {
            return [];
        }
    };

    return (
        <div>
            <Box>
                <Typography variant="h5">Ингредиенты</Typography>
            </Box>
            <List>{renderIngredientsList(ingredients, ingredientsData)}</List>
        </div>
    );
};

export default Ingredients;
