import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RecipeIcon from "../../Icons/RecipeIcon";

const LinkDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Heading = styled.p`
    color: green;
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
}));

const Menu = () => {
    const classes = useStyles();

    return (
        <div className={classes.menu}>
            {/* <NavLink
                exact
                to="/"
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <HomeIcon color="secondary" />
                    <Heading>Главная</Heading>
                </LinkDiv>
            </NavLink> */}
            <Link
                to="/recipes"
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <RecipeIcon color="secondary" />
                    <Heading>Рецепты</Heading>
                </LinkDiv>
            </Link>
            <Link
                to="/authors"
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <PeopleIcon color="secondary" />
                    <Heading>Рейтинг авторов</Heading>
                </LinkDiv>
            </Link>
            {/* <Link to="/articles" className={classes.link} activeClassName={classes.selected_link}>
                <LinkDiv>
                    <HomeIcon color="secondary" />
                    <Heading>Все статьи</Heading>
                </LinkDiv>
            </Link> */}
            <Link
                to="/login"
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <AccountBoxIcon color="secondary" />
                    <Heading>Вход в личный кабинет</Heading>
                </LinkDiv>
            </Link>
        </div>
    );
};

export default Menu;
