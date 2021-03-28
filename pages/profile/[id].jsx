import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeUserName,
    changeEmail,
    deleteUser,
    fetchUserData,
    updateUserInfo,
    userDataIsLoading,
} from "../../redux/actions/profileActions";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm.jsx";
import DeleteDialog from "../../components/PagesComponents/ProfilePage/DeleteDialog.jsx";
import {
    Container,
    Grid,
    Box,
    Paper,
    Typography,
    IconButton,
    Button,
    Dialog,
    TextField,
    Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { userLogout } from "../../redux/actions/authorizationActions";
import RequestError from "../../components/Common/RequestError.jsx";
import { deleteRecipe } from "../../redux/actions/recipesListActions";
import { useRouter } from "next/router";
import Link from "next/link";
import firebaseApp from "../../utils/firebaseConfig";
import LoadingDataComponent from "../../components/Common/LoadingDataComponent";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: "50px",
        height: "50px",
    },
}));

// import { fetchRecipe } from "../actions/recipeActions";

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const classes = useStyles();
    const { profileUserId, userName, userEmail, userRecipes, status } = useSelector(
        (state) => state.profile
    );
    const { userId } = useSelector((state) => state.authorization);

    const [openPassword, setOpenPassword] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);
    const [nameChange, setNameChange] = useState(false);
    const [emailChange, setEmailChange] = useState(false);
    const [newNameValue, setNewNameValue] = useState(userName);
    const [newEmailValue, setNewEmailValue] = useState(userEmail);

    useLayoutEffect(() => {
        if (id !== null && profileUserId !== id) dispatch(userDataIsLoading());
    }, [id]);

    useEffect(() => {
        if (status === "loading") dispatch(fetchUserData(id));
    }, [status]);

    const applyEditName = () => {
        setNameChange(false);
        dispatch(updateUserInfo(userId, { name: newNameValue }));
    };

    const applyEditEmail = () => {
        setEmailChange(false);
        dispatch(changeEmail(userId, newEmailValue));
    };

    const handleDeleteUser = () => {
        setOpenDeleteUser(false);

        const user = firebaseApp.auth().currentUser;

        user.delete()
            .then(() => {
                router.push("/");
                dispatch(deleteUser(userId));
                dispatch(userLogout());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const renderedRecipes = userRecipes?.length ? (
        userRecipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12}>
                <Box py={1}>
                    <Paper elevation={1}>
                        <Grid container alignItems="center">
                            <Grid item xs={9}>
                                <Box p={1}>
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                        href={`/recipes/${recipe.id}`}
                                    >
                                        {recipe.name}
                                    </Link>
                                </Box>
                            </Grid>
                            {id === userId ? (
                                <Grid item xs={3}>
                                    <Button variant="contained" size="small">
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                            href={`/edit_recipe/${recipe.id}`}
                                        >
                                            Изменить рецепт
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => {
                                            dispatch(deleteRecipe(recipe.id));
                                        }}
                                    >
                                        Удалить рецепт
                                    </Button>
                                </Grid>
                            ) : (
                                <div />
                            )}
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
        ))
    ) : (
        <Grid item xs={12}>
            {id === userId ? (
                <Typography variant="body2">Добавьте свой первый рецепт</Typography>
            ) : (
                <Typography variant="body2">Пользователь еще не добавлял рецепты</Typography>
            )}
        </Grid>
    );

    const emailAndPasswordRender = () => {
        return (
            <div>
                <Grid item container alignItems="center" xs={12}>
                    {emailChange ? (
                        <Box minHeight="32px">
                            <TextField
                                placeholder="Новый email"
                                onInput={(e) => setNewEmailValue(e.target.value)}
                            />
                            <IconButton variant="contained" size="small" onClick={applyEditEmail}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                variant="contained"
                                size="small"
                                onClick={() => setEmailChange(false)}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <Grid item container>
                            <Grid item>
                                <Box pr={1} minHeight="32px" lineHeight="32px">
                                    <Typography variant="body1">
                                        <b>E-mail: </b>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box pr={1}>
                                    <Typography variant="body1">{userEmail} </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box pr={1}>
                                    <IconButton
                                        variant="contained"
                                        size="small"
                                        onClick={() => setEmailChange(true)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                    <Grid item>
                        <Box pr={1}>
                            <Typography variant="body1">
                                <b>Пароль: </b>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box pr={1}>
                            <Typography variant="body1">******</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box pr={1}>
                            <IconButton
                                variant="contained"
                                size="small"
                                onClick={() => setOpenPassword(true)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        );
    };

    const renderSucceed = () => {
        return (
            <Grid container>
                <Grid item xs={2}>
                    <Box pt={3} pb={1}>
                        <Typography variant="h4">Профиль</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Avatar alt={userName} className={classes.avatar}></Avatar>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                    <Grid item>
                        <Box pr={1} minHeight="32px">
                            <Typography variant="body1">
                                <b>Имя: </b>
                            </Typography>
                        </Box>
                    </Grid>
                    {nameChange ? (
                        <Box minHeight="32px">
                            <TextField
                                placeholder="Новое имя"
                                onInput={(e) => setNewNameValue(e.target.value)}
                            />
                            <IconButton variant="contained" size="small" onClick={applyEditName}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                variant="contained"
                                size="small"
                                onClick={() => setNameChange(false)}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Box>
                    ) : id === userId ? (
                        <Grid item container xs={8}>
                            <Grid item>
                                <Box pr={1} minHeight="32px" lineHeight="32px">
                                    <Typography variant="body1">{userName} </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box pr={1} minHeight="32px">
                                    <IconButton
                                        variant="contained"
                                        size="small"
                                        onClick={() => setNameChange(true)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item>
                            <Box pr={1}>
                                <Typography variant="body1">{userName} </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
                {id === userId ? emailAndPasswordRender() : <div />}
                <Grid item xs={12}>
                    <Box py={1}>
                        <Typography variant="h5">Рецепты</Typography>
                    </Box>
                </Grid>
                {renderedRecipes}
                {id === userId ? (
                    <Grid item xs={12}>
                        <Box py={1}>
                            <Link style={{ textDecoration: "none" }} href="/add_recipe">
                                <Button variant="contained" size="small">
                                    Добавить рецепт
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                ) : (
                    <div />
                )}
                {id === userId ? (
                    <Grid item xs={12}>
                        <Button size="small" onClick={() => setOpenDeleteUser(true)}>
                            Удалить профиль
                        </Button>
                    </Grid>
                ) : (
                    <div />
                )}
            </Grid>
        );
    };

    const renderMainContent = () => {
        switch (status) {
            case "failed": {
                <RequestError retryFunction={() => fetchData(id)} />;
                return;
            }
            case "ok": {
                return renderSucceed();
            }
            case "loading": {
                return <LoadingDataComponent />;
            }
            default: {
                return null;
            }
        }
    };

    return (
        <>
            <Container maxWidth="lg">{renderMainContent()}</Container>
            <Dialog
                open={openPassword}
                onClose={() => setOpenPassword(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ChangePasswordForm email={userEmail} handleClose={() => setOpenPassword(false)} />
            </Dialog>
            <Dialog
                open={openDeleteUser}
                onClose={() => setOpenDeleteUser(true)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <DeleteDialog
                    handleClose={() => setOpenDeleteUser(false)}
                    handleDelete={handleDeleteUser}
                />
            </Dialog>
        </>
    );
};

export default Profile;
