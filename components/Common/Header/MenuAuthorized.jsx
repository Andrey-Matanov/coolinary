import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../actions/authorizationActions";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
    const history = useHistory();
    const currentUserId = useSelector((state) => state.authorization.userId);
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
            <NavLink
                to="/recipes"
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <RecipeIcon color="secondary" />
                    <Heading>Рецепты</Heading>
                </LinkDiv>
            </NavLink>
            <NavLink
                to="/authors"
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <PeopleIcon color="secondary" />
                    <Heading>Рейтинг авторов</Heading>
                </LinkDiv>
            </NavLink>
            {/* <NavLink
                exact
                to="/articles" className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <HomeIcon color="secondary" />
                    <Heading>Все статьи</Heading>
                </LinkDiv>
            </NavLink> */}
            <NavLink
                to={`/profile/${currentUserId}`}
                className={classes.link}
                activeClassName={classes.selected_link}
            >
                <LinkDiv>
                    <AccountBoxIcon color="secondary" />
                    <Heading>Личный кабинет</Heading>
                </LinkDiv>
            </NavLink>
            <button
                onClick={() => {
                    window.localStorage.removeItem("currentUserToken");
                    dispatch(userLogout());
                    history.push("/");
                }}
                className={classes.button}
            >
                <ExitToAppIcon color="secondary" />
                <Heading>Выход</Heading>
            </button>
        </div>
    );
};

export default Menu;
