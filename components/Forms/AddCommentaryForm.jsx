import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { addCommentary } from "../../actions/recipesListActions"
import { Box, Grid, Typography, TextField, Button } from '@material-ui/core'
import {fetchRecipe} from "../../actions/recipeActions"

const AddCommentaryForm = () => {
    const dispatch = useDispatch();
    const recipeId = useSelector(state => state.recipe.recipe.id)
    const formik = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit: ({ text }, actions) => {
            dispatch(addCommentary(recipeId, text))
                .then(() => dispatch(fetchRecipe(recipeId)))
                .catch((err) => console.error(err));
            actions.resetForm()
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container>
                <Grid item xs={12}><Box p={1}><Typography variant="h5">Добавить комментарий</Typography></Box></Grid>
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
                <Grid item xs={12}><Box p={1}><Button variant="contained" color="primary" type="submit">Отправить</Button></Box></Grid>
            </Grid>
        </form>
    )
}

export default AddCommentaryForm
