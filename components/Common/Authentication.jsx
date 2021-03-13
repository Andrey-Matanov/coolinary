import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserIdByToken, userLogout } from "../../redux/actions/authorizationActions";
import createToken from "../../services/createToken";
import firebaseApp from "../../utils/firebaseConfig";
import LoadingDataComponent from "./LoadingDataComponent";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const setToken = async () => {
            if (isUserLoggedIn && !window.localStorage.getItem("currentUserToken")) {
                const token = await createToken();

                window.localStorage.setItem("currentUserToken", token);
                dispatch(getUserIdByToken());
            } else {
                window.localStorage.removeItem("currentUserToken");
                dispatch(userLogout());
            }
        };

        setToken();
    }, [isUserLoggedIn]);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            setIsUserLoggedIn(user);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <LoadingDataComponent />;
    } else {
        return <AuthContext.Provider value={{ isUserLoggedIn }}>{children}</AuthContext.Provider>;
    }
};
