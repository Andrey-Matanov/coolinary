import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { baseURL } from "../utils";
import { useHistory } from "react-router-dom";
import Register from "../components/PagesComponents/RegisterPage/Register";
import { Field, useFormik } from "formik";
import styled from "styled-components";

const Error = styled.div`
    color: red;
`;

const RegisterPage = () => {
    const history = useHistory();

    const { values, errors, touched, handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(
                4,
                "Имя должно состоять минимум из 4 символов"
            ),
            email: Yup.string().matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Введите корректный email"
            ),
            password: Yup.string().min(
                8,
                "Пароль должен состоять минимум из 8 символов"
            ),
        }),
        onSubmit: (values) => {
            axios.post(`${baseURL}/api/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
            });
            history.push("/login");
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

export default RegisterPage;
