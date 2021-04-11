import React from "react";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { deleteRecipe } from "../../../redux/slices/recipesListSlice.js";
import ConfirmationDialog from "../../Common/Dialogs/ConfirmationDialog.jsx";

const ProfilePageUserRecipes = ({ userRecipes, id, userId, dispatch }) => {
    const userOwnsRecipe = id === userId;

    return (
        <>
            <Grid item xs={12}>
                <Box py={1}>
                    <Typography variant="h4">
                        {userOwnsRecipe ? "Мои рецепты" : "Рецепты пользователя"}
                    </Typography>
                </Box>
            </Grid>
            {userRecipes?.length ? (
                userRecipes.map(({ id, name }) => (
                    <Grid item key={id} xs={12}>
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
                                                href={`/recipes/${id}`}
                                            >
                                                {name}
                                            </Link>
                                        </Box>
                                    </Grid>
                                    {userOwnsRecipe ? (
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary">
                                                <Link
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                    }}
                                                    href={`/edit_recipe/${id}`}
                                                >
                                                    Изменить рецепт
                                                </Link>
                                            </Button>
                                            <ConfirmationDialog
                                                dialogTitle="Удалить рецепт"
                                                dialogContentText={`Вы уверены что хотите удалить рецепт "${name}"?`}
                                                confirmActionLabel="Да"
                                                cancelActionLabel="Нет"
                                                actionConfirmationHandler={() => {
                                                    dispatch(deleteRecipe(id));
                                                }}
                                            />
                                        </Grid>
                                    ) : null}
                                </Grid>
                            </Paper>
                        </Box>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    {userOwnsRecipe ? (
                        <Typography variant="body2">Добавьте свой первый рецепт</Typography>
                    ) : (
                        <Typography variant="body2">
                            Пользователь еще не добавлял рецепты
                        </Typography>
                    )}
                </Grid>
            )}
            {userOwnsRecipe ? (
                <Grid item xs={12}>
                    <Box py={1}>
                        <Link style={{ textDecoration: "none" }} href="/add_recipe">
                            <Button variant="contained" size="small">
                                Добавить рецепт
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            ) : null}
        </>
    );
};

export default ProfilePageUserRecipes;
