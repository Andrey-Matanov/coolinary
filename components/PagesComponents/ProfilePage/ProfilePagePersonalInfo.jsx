import React, { useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { deleteUser, updateUserInfo } from "../../../redux/slices/profileSlice/thunks";
import { userLogout } from "../../../redux/slices/authorizationSlice";
import { firebaseRemoveCurrentUser, firebaseUpdateEmail } from "../../../utils/firebaseConfig";
import ChangePasswordForm from "../../Forms/ChangePasswordForm";
import DeleteDialog from "./DeleteDialog";
import ProfilePagePersonalInfoEmail from "./ProfilePagePersonalInfoEmail";

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
    const [newNameValue, setNewNameValue] = useState(userName);
    const [newEmailValue, setNewEmailValue] = useState(userEmail);
    const [nameChange, setNameChange] = useState(false);
    const [emailChange, setEmailChange] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);

    const applyEditName = () => {
        setNameChange(false);
        dispatch(
            updateUserInfo({
                userId,
                name: newNameValue,
            })
        );
    };

    const applyEditEmail = () => {
        setEmailChange(false);
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
        setOpenDeleteUser(false);

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
                {nameChange ? (
                    <Box minHeight="32px">
                        <TextField
                            placeholder="Новое имя"
                            onChange={(e) => setNewNameValue(e.target.value)}
                            value={newNameValue}
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
            {id === userId ? (
                <>
                    <ProfilePagePersonalInfoEmail
                        emailChange={emailChange}
                        userEmail={userEmail}
                        setEmailChange={setEmailChange}
                        setNewEmailValue={setNewEmailValue}
                        applyEditEmail={applyEditEmail}
                    />
                    <Grid item container alignItems="center" xs={12}>
                        <Button variant="contained" onClick={() => setOpenPassword(true)}>
                            Сменить пароль
                        </Button>
                    </Grid>
                    <Grid id item xs={12}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setOpenDeleteUser(true)}
                        >
                            Удалить профиль
                        </Button>
                    </Grid>
                </>
            ) : null}
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

export default ProfilePagePersonalInfo;
