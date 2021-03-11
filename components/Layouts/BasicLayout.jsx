import React from "react";
// import RootRouter from "../../pages/RootRouter";
import Footer from "../../components/Common/Footer";
// import Header from "../../components/Common/Header/Header";

const BasicLayout = ({ children }) => {
    return (
        <>
            <main>
                {/* <Header /> */}
                {/* <div className="wrapper">
                    <RootRouter />
                </div> */}
                {children}
            </main>
            <Footer />
        </>
    );
};

export default BasicLayout;
