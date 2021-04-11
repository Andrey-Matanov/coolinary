import React from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { deleteUser, updateUserInfo } from "../../../redux/slices/profileSlice";
import { userLogout } from "../../../redux/slices/authorizationSlice";
import { firebaseRemoveCurrentUser, firebaseUpdateEmail } from "../../../utils/firebaseConfig";
import ConfirmationDialog from "../../Common/Dialogs/ConfirmationDialog";
import ChangePasswordDialog from "../../Common/Dialogs/ChangePasswordDialog";
import SingleInputDialog from "../../Common/Dialogs/SingleInputDialog";

const useStyles = makeStyles((theme) => {
    return {
        avatar: {
            width: "50px",
            height: "50px",
        },
    };
});

const ProfilePagePersonalInfo = ({ id, userId, userName, userEmail, router, dispatch }) => {
    const classes = useStyles();

    const applyEditName = (newNameValue) => {
        dispatch(
            updateUserInfo({
                userId,
                name: newNameValue,
            })
        );
    };

    const applyEditEmail = (newEmailValue) => {
        firebaseUpdateEmail(newEmailValue)
            .then(() =>
                dispatch(
                    updateUserInfo({
                        userId,
                        email: newEmailValue,
                    })
                )
            )
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };

    const handleDeleteUser = () => {
        firebaseRemoveCurrentUser()
            .then(() => {
                router.push("/");
                dispatch(deleteUser(userId));
                dispatch(userLogout());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Grid item xs={12}>
                <Box pt={3} pb={1}>
                    <Typography variant="h4">Личная информация</Typography>
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
                <Grid item container xs={8}>
                    <Grid item>
                        <Box pr={1} minHeight="32px" lineHeight="32px">
                            <Typography variant="body1">{userName} </Typography>
                        </Box>
                    </Grid>
                    {id === userId ? (
                        <SingleInputDialog
                            initialValue={userName}
                            dialogTitle="Изменить имя"
                            inputType="text"
                            placeholder="Введите новое имя"
                            confirmActionLabel="Изменить"
                            cancelActionLabel="Отмена"
                            actionConfirmationHandler={applyEditName}
                        />
                    ) : null}
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                    {id === userId ? (
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
                                    <SingleInputDialog
                                        initialValue={userEmail}
                                        dialogTitle="Изменить email"
                                        inputType="email"
                                        placeholder="Введите новый email"
                                        confirmActionLabel="Изменить"
                                        cancelActionLabel="Отмена"
                                        actionConfirmationHandler={applyEditEmail}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
            {id === userId ? (
                <>
                    <ChangePasswordDialog userEmail={userEmail} />
                    <ConfirmationDialog
                        dialogTitle="Удалить профиль"
                        dialogContentText="Вы уверены, что хотите свой удалить профиль?"
                        confirmActionLabel="Да"
                        cancelActionLabel="Нет"
                        actionConfirmationHandler={handleDeleteUser}
                    />
                </>
            ) : null}
        </>
    );
};

export default ProfilePagePersonalInfo;
