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

const Ingredients = (props) => {
    const { ingredients } = props;

    const renderIngredientsList = (ingredients) => {
        if (ingredients) {
            return ingredients.map((item) => (
                <Fragment key={item.id}>
                    <ListItem>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography variant="body1">
                                    {item.name}:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">
                                    {item.amount} {item.unit_name}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* <ListItemText variant="body1">{item.ingredient_name}: {item.count} {item.unit_name}</ListItemText> */}
                    </ListItem>
                    <Divider />
                </Fragment>
            ));
        } else {
            return [];
        }
    };

    return (
        <div>
            <Box>
                <Typography variant="h5">Ингредиенты</Typography>
            </Box>
            <List>{renderIngredientsList(ingredients)}</List>
        </div>
    );
};

export default Ingredients;
