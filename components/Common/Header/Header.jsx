import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "./Menu";
import MenuAuthorized from "./MenuAuthorized";
import { AuthContext } from "../Authentication";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxHeight: "10vh",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const { isUserLoggedIn } = useContext(AuthContext);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div className="wrapper">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Coolинари
                        </Typography>
                        {isUserLoggedIn ? <MenuAuthorized /> : <Menu />}
                    </Toolbar>
                </div>
            </AppBar>
        </div>
    );
};

export default Header;
