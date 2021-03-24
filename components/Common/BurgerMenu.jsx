import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const BurgerMenu = () => {
    return (
        <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
    );
};

export default BurgerMenu;
