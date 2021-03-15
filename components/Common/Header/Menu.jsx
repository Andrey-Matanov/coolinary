import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RecipeIcon from "../../Icons/RecipeIcon";

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
        cursor: "pointer",
        marginLeft: "5px",
    },
}));

const Menu = () => {
    const classes = useStyles();

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
            {/* <Link href="/articles" className={classes.link} activeClassName={classes.selected_link}>
                <LinkDiv>
                    <HomeIcon color="action" />
                    <Heading>Все статьи</Heading>
                </LinkDiv>
            </Link> */}
            <Link href="/login" className={classes.link} activeClassName={classes.selected_link}>
                <LinkDiv>
                    <AccountBoxIcon color="action" />
                    <Heading>Вход в личный кабинет</Heading>
                </LinkDiv>
            </Link>
        </div>
    );
};

export default Menu;
