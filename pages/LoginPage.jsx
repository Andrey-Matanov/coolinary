import React, { useState } from "react";
import { baseURL } from "../utils";
import Login from "../components/PagesComponents/LoginPage/Login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../actions/profileActions";
import { useHistory } from "react-router-dom";
import { userLogin } from "../actions/authorizationActions";

const WelcomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordChahge = (e) => {
        setPassword(e.target.value);
    };

    const onSigninSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        const loginResponse = await axios.post(
            `${baseURL}/api/login`,
            userData
        );
        const token = loginResponse.data.token;
        window.localStorage.setItem("currentUserToken", token);

        const userDataResponse = await axios.get(`${baseURL}/api/get-user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const userId = userDataResponse.data.user.id;

        dispatch(userLogin(userId));
        history.push(`/profile/${userId}`);
    };

    return (
        <Login
            onSigninSubmit={onSigninSubmit}
            onEmailChange={onEmailChange}
            onPasswordChahge={onPasswordChahge}
            email={email}
            password={password}
        />
    );
};

export default WelcomePage;
