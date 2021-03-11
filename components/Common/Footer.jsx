import React from "react";
import Link from "@material-ui/core/Link";
import { grey } from "@material-ui/core/colors";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: "10px 0",
        backgroundColor: "#4caf50",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        maxHeight: "5vh",
    },
    footerWrapper: {
        minWidth: "700px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    content: {
        color: "lightgray",
        textAlign: "center",
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <div className={classes.footerWrapper}>
                <div
                    className={classes.content}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <i
                        className="fa fa-youtube fa-2x"
                        style={{ padding: 10 }}
                        href="https://youtube.com"
                        target="_blank"
                    ></i>
                    <i
                        className="fa fa-vk"
                        style={{ padding: 10 }}
                        href="https://vk.com"
                        target="_blank"
                        rel="nofollow"
                    ></i>
                    <i
                        className="fa fa-odnoklassniki"
                        style={{ padding: 10 }}
                        href="https://ok.ru"
                        target="_blank"
                        rel="nofollow"
                    ></i>
                    <i
                        className="fa fa-skype"
                        style={{ padding: 10 }}
                        href="https://skype.ru"
                        target="_blank"
                        rel="nofollow"
                    ></i>
                    <i
                        className="fa fa-paper-plane"
                        style={{ padding: 10 }}
                        href="https://telegram.org"
                        target="_blank"
                        rel="nofollow"
                    ></i>
                </div>
                <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ color: grey[300] }}
                >
                    email@email.com
                </Link>
                <p className={classes.content}>
                    Coolинари © 2021. Все Права Защищены.
                </p>
            </div>
        </div>
    );
};

export default Footer;
