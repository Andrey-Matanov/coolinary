import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Box, Paper, TextField, Button, Typography } from '@material-ui/core'

const ChangePasswordFormik = ({ userId, handleClose }) => {
    const dispatch = useDispatch();

    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
        },
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string().required("Поле не должно быть пустым"),
            newPassword: Yup.string().min(
                8,
                "Пароль должен состоять минимум из 8 символов"
            ),
            newPasswordAgain: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Пароли должны быть одинаковыми!"),
        }),
        onSubmit: ({ newPassword }) => {
            console.log('accepted')
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={3}>
                <Box p={2}>
                    <Box py= {1}>
                        <Typography variant='body2'>Введите старый пароль</Typography>
                    </Box>
                    <Box py= {1}>
                        <TextField 
                            value={values.oldPassword}
                            onChange={handleChange}
                            name="oldPassword"
                            id="oldPassword"
                            type="password"
                        />
                        {errors.oldPassword && touched.oldPassword ? (
                            <Typography variant="body2">{errors.oldPassword}</Typography>
                        ) : null}
                    </Box>
                    <Box py= {1}>
                        <Typography variant='body2'>Введите новый пароль</Typography>
                    </Box>
                    <Box py= {1}>
                        <TextField 
                            value={values.newPassword}
                            onChange={handleChange}
                            name="newPassword"
                            id="newPassword"
                            type="password"
                        />
                        {errors.newPassword && touched.newPassword ? (
                            <Typography variant="body2">{errors.newPassword}</Typography>
                        ) : null}
                    </Box>
                    <Box py= {1}>
                        <Typography variant='body2'>Введите новый пароль ещё раз</Typography>
                    </Box>
                    <Box py= {1}>
                        <TextField 
                            value={values.newPasswordAgain}
                            onChange={handleChange}
                            name="newPasswordAgain"
                            id="newPasswordAgain"
                            type="password"
                        />
                        {errors.newPasswordAgain && touched.newPasswordAgain ? (
                            <Typography variant="body2">{errors.newPasswordAgain}</Typography>
                        ) : null}
                    </Box>
                    <Box py= { 1}>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Изменить
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </form>
    );
};

export default ChangePasswordFormik;