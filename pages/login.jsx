import React, { useContext, useState } from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebaseApp from "../utils/firebaseConfig";
import Login from "../components/PagesComponents/LoginPage/Login";
import { AuthContext } from "../providers/Authentication";

const LoginPage = () => {
    const { isUserLoggedIn } = useContext(AuthContext);

    if (isUserLoggedIn) {
        Router.push("/");
    }

    const [authorizationError, setAuthorizationError] = useState(null);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Введите корректный email"
            ),
            password: Yup.string().min(8, "Пароль должен состоять минимум из 8 символов"),
        }),
        onSubmit: async () => {
            try {
                await firebaseApp.auth().signInWithEmailAndPassword(values.email, values.password);
            } catch (error) {
                setAuthorizationError(error.message);
            }
        },
    });

    return (
        <Login
            onSigninSubmit={handleSubmit}
            onEmailChange={handleChange}
            onPasswordChange={handleChange}
            email={values.email}
            password={values.password}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            authorizationError={authorizationError}
        />
    );
};

export default LoginPage;
