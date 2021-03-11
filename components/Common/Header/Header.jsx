import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { getUserIdByToken } from "../../../actions/authorizationActions";
import Menu from "./Menu";
import MenuAuthorized from "./MenuAuthorized";

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
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authorization.userId);

    useEffect(() => {
        if (
            process.browser &&
            !userId &&
            window.localStorage.getItem("currentUserToken")
        ) {
            dispatch(getUserIdByToken());
        }
    });

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div className="wrapper">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Coolинари
                        </Typography>
                        {window.localStorage.getItem("currentUserToken") ? (
                            <MenuAuthorized />
                        ) : (
                            <Menu />
                        )}
                    </Toolbar>
                </div>
            </AppBar>
        </div>
    );
};

export default Header;
