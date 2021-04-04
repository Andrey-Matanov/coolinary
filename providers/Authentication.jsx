import React, { useEffect, useState } from "react";
import firebaseApp from "../utils/firebaseConfig";
import LoadingDataComponent from "../components/Common/LoadingDataComponent";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            setIsLoading(true);

            if (user !== null && user?.displayName !== null) {
                setIsUserLoggedIn(true);
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
