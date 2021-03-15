import React, { useContext } from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebaseApp from "../utils/firebaseConfig";
import Register from "../components/PagesComponents/RegisterPage/Register";
import { AuthContext } from "../components/Common/Authentication";
import axios from "axios";
import { getUserIdByUID } from "../redux/actions/authorizationActions";
import { useDispatch } from "react-redux";

const register = () => {
    const dispatch = useDispatch();
    const { isUserLoggedIn } = useContext(AuthContext);

    if (isUserLoggedIn) {
        Router.push("/");
    }

    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(4, "Имя должно состоять минимум из 4 символов"),
            email: Yup.string().matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Введите корректный email"
            ),
            password: Yup.string().min(8, "Пароль должен состоять минимум из 8 символов"),
        }),
        onSubmit: async () => {
            try {
                const newFirebaseUser = await firebaseApp
                    .auth()
                    .createUserWithEmailAndPassword(values.email, values.password);
                const uid = newFirebaseUser.user.uid;
                console.log(uid);

                const newUserData = {
                    name: values.name,
                    email: values.email,
                    uid: uid,
                };

                await axios.post("/api/users", newUserData);
                dispatch(getUserIdByUID());
            } catch (error) {
                console.log("error: ", error);
            }
        },
    });

    return (
        <Register
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default register;
