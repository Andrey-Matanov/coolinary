import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList } from "../redux/slices/userListSlice";

import LoadingDataComponent from "../components/Common/LoadingDataComponent.jsx";
import RequestError from "../components/Common/RequestError.jsx";
import AuthorsItem from "../components/PagesComponents/Authors/AuthorsItem.jsx";

import { Container, Box, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    list: {
        width: "100%",
        maxWidth: "800ch",
        backgroundColor: theme.palette.background.paper,
    },
}));

const Authors = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const rating = useSelector((state) => state.usersList);

    useEffect(() => {
        if (rating.status === "loading") {
            dispatch(fetchUsersList());
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <Box mt={2}>
                <Typography variant="h5">Рейтинг авторов</Typography>
            </Box>
            <List className={classes.list}>
                {rating.status === "loading" ? (
                    <LoadingDataComponent />
                ) : rating.status === "failed" ? (
                    <RequestError retryFunction={() => dispatch(fetchUsersList())} />
                ) : (
                    rating.usersList.map(({ _id, name, avatar, userRecipes, rating }, i) => {
                        return (
                            <ListItem key={i + 1}>
                                <AuthorsItem
                                    position={i + 1}
                                    id={_id}
                                    name={name}
                                    avatar={avatar}
                                    recipesCount={userRecipes.length}
                                    rating={rating}
                                />
                            </ListItem>
                        );
                    })
                )}
            </List>
        </Container>
    );
};

export default Authors;
