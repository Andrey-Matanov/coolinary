import React from "react";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { authorizationUpdateCurrentUserCollections } from "../../../redux/actions/authorizationActions";

const ProfilePageUserCollections = ({ userCollections, currentUserId, dispatch }) => {
    const { recipes, articles } = userCollections;

    return (
        <>
            <Grid item xs={12}>
                <Box pt={3} pb={1}>
                    <Typography variant="h4">Сохранённые коллекции</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box pt={3} pb={1}>
                    <Typography variant="h5">Рецепты</Typography>
                </Box>
                {recipes?.length ? (
                    <Box pr={1} minHeight="32px">
                        {recipes.map((recipe) => (
                            <Grid item key={recipe.id} xs={12}>
                                <Box py={1}>
                                    <Paper elevation={1}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={9}>
                                                <Box p={1}>
                                                    <Link
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "inherit",
                                                        }}
                                                        href={`/recipes/${recipe.id}`}
                                                    >
                                                        {recipe.name}
                                                    </Link>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        dispatch(
                                                            authorizationUpdateCurrentUserCollections(
                                                                "remove_recipe",
                                                                currentUserId,
                                                                recipe.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    Удалить из коллекции
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Grid>
                        ))}
                    </Box>
                ) : (
                    <Box pr={1} minHeight="32px">
                        <Typography variant="body1">
                            Вы еще не сохранили ни одного рецепта в свою коллекцию
                        </Typography>
                    </Box>
                )}
            </Grid>
            <Grid item xs={12}>
                <Box pt={3} pb={1}>
                    <Typography variant="h5">Статьи</Typography>
                </Box>
                {articles?.length ? (
                    <Box pr={1} minHeight="32px">
                        <Typography variant="body1">
                            <b>Имя: </b>
                        </Typography>
                    </Box>
                ) : (
                    <Box pr={1} minHeight="32px">
                        <Typography variant="body1">
                            Вы еще не сохранили ни одной статьи в свою коллекцию
                        </Typography>
                    </Box>
                )}
            </Grid>
        </>
    );
};

export default ProfilePageUserCollections;
