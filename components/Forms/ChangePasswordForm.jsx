import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebaseApp from "../../utils/firebaseConfig.js"
import firebase from "firebase"

import { Box, Paper, TextField, Button, Typography } from "@material-ui/core";

const ChangePasswordFormik = ({ email, handleClose }) => {
    const user = firebaseApp.auth().currentUser;

    const [updateFailed, setUpdateFailed] = useState(false);
    const [updateSucceed, setUpdateSucceed] = useState(false);
    const [authenticateFailed, setAuthenticateFailed] = useState(false);

    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
        },
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string().required("Поле не должно быть пустым"),
            newPassword: Yup.string().min(8, "Пароль должен состоять минимум из 8 символов"),
            newPasswordAgain: Yup.string().oneOf(
                [Yup.ref("newPassword"), null],
                "Пароли должны быть одинаковыми!"
            ),
        }),
        onSubmit: ({ oldPassword, newPassword }) => {
            user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, oldPassword)).then(() => {
                user.updatePassword(newPassword).then(() => {
                    setAuthenticateFailed(false);
                    setUpdateFailed(false);
                    setUpdateSucceed(true);
                    setTimeout(() => { handleClose() }, 2000);
                }).catch(err => {
                    setAuthenticateFailed(false);
                    setUpdateSucceed(false);
                    setUpdateFailed(true);
                    console.log(err)
                })
            }).catch(err => {
                setAuthenticateFailed(true);
                setUpdateSucceed(false);
                setUpdateFailed(false);
                console.log(err)
            })
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={3}>
                <Box p={2}>
                    <Box py={1}>
                        <Typography variant="body2">Введите старый пароль</Typography>
                    </Box>
                    <Box py={1}>
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
                    <Box py={1}>
                        <Typography variant="body2">Введите новый пароль</Typography>
                    </Box>
                    <Box py={1}>
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
                    <Box py={1}>
                        <Typography variant="body2">Введите новый пароль ещё раз</Typography>
                    </Box>
                    <Box py={1}>
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
                    <Box py={1}>
                        <Button type="submit" variant="contained">
                            Изменить
                        </Button>
                    </Box>
                    <Box py={1}>
                        {(updateSucceed) ? <Typography variant="body2" color="primary">Пароль успешно изменён</Typography> : null}
                        {(updateFailed) ? <Typography variant="body2" color="error">Ошибка, попробуйте снова</Typography> : null} 
                        {(authenticateFailed) ? <Typography variant="body2" color="error">Неверный пароль</Typography> : null} 
                    </Box>
                </Box>
            </Paper>
        </form>
    );
};

export default ChangePasswordFormik;
