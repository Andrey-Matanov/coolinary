import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebaseApp from "../../utils/firebaseConfig.js";
import firebase from "firebase";

import { Box, Paper, TextField, Button, Typography } from "@material-ui/core";

const DeleteUserFormik = ({ email, handleDeleteUser, handleClose }) => {
    const user = firebaseApp.auth().currentUser;

    const [updateFailed, setUpdateFailed] = useState(false);
    const [authenticateFailed, setAuthenticateFailed] = useState(false);

    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required("Поле не должно быть пустым"),
        }),
        onSubmit: ({ password }) => {
            user.reauthenticateWithCredential(
                firebase.auth.EmailAuthProvider.credential(email, password)
            )
                .then(() => {
                    console.log("reauthentication succeed");
                    handleDeleteUser();
                    setAuthenticateFailed(false);
                    setUpdateFailed(false);
                    handleClose();
                })
                .catch((err) => {
                    setAuthenticateFailed(true);
                    setUpdateFailed(false);
                    console.log(err);
                });
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={3}>
                <Box p={2}>
                    <Box py={1}>
                        <Typography variant="body2">Введите пароль для подтверждения</Typography>
                    </Box>
                    <Box py={1}>
                        <TextField
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                            id="password"
                            type="password"
                        />
                        {errors.password && touched.password ? (
                            <Typography variant="body2">{errors.password}</Typography>
                        ) : null}
                    </Box>
                    <Box py={1}>
                        <Button type="submit" variant="contained">
                            Удалить профиль
                        </Button>
                    </Box>
                    <Box py={1}>
                        {updateFailed ? (
                            <Typography variant="body2" color="error">
                                Ошибка, попробуйте снова
                            </Typography>
                        ) : null}
                        {authenticateFailed ? (
                            <Typography variant="body2" color="error">
                                Неверный пароль
                            </Typography>
                        ) : null}
                    </Box>
                </Box>
            </Paper>
        </form>
    );
};

export default DeleteUserFormik;
