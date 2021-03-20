import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import firebaseApp from "../utils/firebaseConfig";
import { userLogin } from "../redux/actions/authorizationActions";
import LoadingDataComponent from "../components/Common/LoadingDataComponent";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            setIsLoading(true);

            if (user) {
                setIsUserLoggedIn(true);
                dispatch(userLogin(user.email));
            } else {
                setIsUserLoggedIn(false);
            }

            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <LoadingDataComponent />;
    } else {
        return (
            <AuthContext.Provider value={{ isUserLoggedIn, isLoading }}>
                {children}
            </AuthContext.Provider>
        );
    }
};
