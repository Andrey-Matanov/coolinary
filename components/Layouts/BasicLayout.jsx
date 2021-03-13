import React from "react";
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer";

const BasicLayout = ({ children }) => {
    return (
        <>
            <main>
                <Header />
                {children}
            </main>
            <Footer />
        </>
    );
};

export default BasicLayout;
