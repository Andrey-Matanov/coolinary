import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addCommentary } from "../../redux/actions/recipesListActions.js";
import { Box, Grid, Typography, TextField, Button } from "@material-ui/core";

const AddCommentaryForm = ({ userId, recipeId }) => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.authorization.userName);
    const formik = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit: ({ text }, actions) => {
            dispatch(addCommentary(recipeId, userId, userName, text));
            actions.resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Box p={1}>
                        <Typography variant="h5">Добавить комментарий</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box p={1}>
                        <TextField
                            value={formik.values.text}
                            onChange={formik.handleChange}
                            name="text"
                            placeholder="Введите комментарий..."
                            multiline
                            fullWidth
                            rows={4}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box p={1}>
                        <Button variant="contained" color="primary" type="submit">
                            Отправить
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddCommentaryForm;
