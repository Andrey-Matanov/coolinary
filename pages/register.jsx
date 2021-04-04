import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebaseApp from "../utils/firebaseConfig";
import Register from "../components/PagesComponents/RegisterPage/Register";
import { AuthContext } from "../providers/Authentication";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingDataComponent from "../components/Common/LoadingDataComponent";

const register = () => {
    const router = useRouter();
    const { isUserLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        router.prefetch("/login");
    }, []);

    const [registrationError, setRegistrationError] = useState(null);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
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
                const response = await firebaseApp
                    .auth()
                    .createUserWithEmailAndPassword(values.email, values.password); // Регистрация в Firebase

                response.user.updateProfile({
                    displayName: values.name,
                }); // Обновление имени пользователя в Firebase

                await firebaseApp.auth().signOut(); //

                await axios.post("/api/users", {
                    name: values.name,
                    email: values.email,
                }); // Создание нового пользователя в MongoDB

                router.push("/login"); // Редирект на страницу авторизации

                toast.success("Вы успешно зарегистрировались!"); // Уведомление об успешной регистрации
            } catch (error) {
                console.log(error);
                setRegistrationError(error);
            }
        },
    });

    return isUserLoggedIn ? (
        <LoadingDataComponent />
    ) : (
        <Register
            values={values}
            errors={errors}
            touched={touched}
            registrationError={registrationError}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
        />
    );
};

export default register;
