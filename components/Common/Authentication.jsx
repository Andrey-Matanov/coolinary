import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserIdByUID, userLogout } from "../../redux/actions/authorizationActions";
import firebaseApp from "../../utils/firebaseConfig";
import LoadingDataComponent from "./LoadingDataComponent";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            setIsUserLoggedIn(user);
            setIsLoading(false);
        });
    });

    useEffect(() => {
        const setUID = async () => {
            if (isUserLoggedIn) {
                if (!window.localStorage.getItem("currentUserUID")) {
                    firebaseApp.auth().onAuthStateChanged((user) => {
                        if (user) {
                            window.localStorage.setItem("currentUserUID", user.uid);
                            dispatch(getUserIdByUID());
                        }
                    });
                } else {
                    dispatch(getUserIdByUID());
                }
            } else {
                window.localStorage.removeItem("currentUserUID");
                dispatch(userLogout());
            }
        };

        setUID();
    }, [isUserLoggedIn]);

    if (isLoading) {
        return <LoadingDataComponent />;
    } else {
        return <AuthContext.Provider value={{ isUserLoggedIn }}>{children}</AuthContext.Provider>;
    }
};
