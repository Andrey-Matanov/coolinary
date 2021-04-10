import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import RecipeIcon from "../../Icons/RecipeIcon";
import firebaseApp from "../../../utils/firebaseConfig";
import { userLogout } from "../../../redux/slices/authorizationSlice";

const LinkDiv = styled.a`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Heading = styled.p`
    color: white;
`;

const useStyles = makeStyles((theme) => ({
    menu: {
        padding: "20px 0",
        display: "flex",
        alignItems: "center",
    },
    "menu a": {
        textDecoration: "none",
        color: "black",
        padding: "0 20px",
    },

    selected_link: {
        color: "#999",
    },
    link: {
        marginLeft: "5px",
    },
    button: {
        display: "flex",
        alignItems: "center",
        marginLeft: "5px",
        border: "none",
        background: "none",
        textDecoration: "underline",
        cursor: "pointer",
    },
}));

const Menu = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const id = useSelector((state) => state.authorization.userId);

    return (
        <div className={classes.menu}>
            <Link href="/" className={classes.link} activeClassName={classes.selected_link}>
                <LinkDiv>
                    <HomeIcon color="action" />
                    <Heading>Главная</Heading>
                </LinkDiv>
            </Link>
            <Link href="/recipes" className={classes.link} activeClassName={classes.selected_link}>
                <LinkDiv>
                    <RecipeIcon color="action" />
                    <Heading>Рецепты</Heading>
                </LinkDiv>
            </Link>
            <Link href="/authors" className={classes.link} activeClassName={classes.selected_link}>
                <LinkDiv>
                    <PeopleIcon color="action" />
                    <Heading>Рейтинг авторов</Heading>
                </LinkDiv>
            </Link>
            {/* <Link
                exact
                href="/articles" className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <HomeIcon color="action" />
                    <Heading>Все статьи</Heading>
                </LinkDiv>
            </Link> */}
            <Link
                href={`/profile/${id}`}
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <AccountBoxIcon color="action" />
                    <Heading>Личный кабинет</Heading>
                </LinkDiv>
            </Link>
            <button
                onClick={() => {
                    firebaseApp.auth().signOut();
                    dispatch(userLogout());
                }}
                className={classes.button}
            >
                <ExitToAppIcon color="action" />
                <Heading>Выход</Heading>
            </button>
        </div>
    );
};

export default Menu;
