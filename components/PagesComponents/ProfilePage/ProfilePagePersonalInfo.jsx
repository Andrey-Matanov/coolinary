import React from "react";
import { toast } from "react-toastify";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { deleteUser, updateUserInfo } from "../../../redux/slices/profileSlice";
import { userLogout } from "../../../redux/slices/authorizationSlice";
import { firebaseRemoveCurrentUser, firebaseUpdateEmail } from "../../../utils/firebaseConfig";
import DeleteUserDialog from "../../Common/Dialogs/DeleteUserDialog";
import ChangePasswordDialog from "../../Common/Dialogs/ChangePasswordDialog";
import SingleInputDialog from "../../Common/Dialogs/SingleInputDialog";
import DateDialog from "../../Common/Dialogs/DateDialog.jsx";
import AvatarElement from "../../PagesComponents/ProfilePage/AvatarElement.jsx";
import Head from "next/head";

const ProfilePagePersonalInfo = ({
    id,
    userId,
    userName,
    userEmail,
    avatar,
    userBorn,
    userFrom,
    router,
    dispatch,
}) => {
    const applyEditValue = (valueName, newValue) => {
        dispatch(
            updateUserInfo({
                userId,
                [valueName]: newValue,
            })
        );
    };
    const applyEditEmail = (valueName, newEmailValue) => {
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

    const setAvatar = (avatar) => {
        dispatch(
            updateUserInfo({
                userId,
                avatar: avatar,
            })
        );
    };

    return (
        <>
            <Head>
                <script
                    src="https://widget.cloudinary.com/v2.0/global/all.js"
                    type="text/javascript"
                ></script>
            </Head>
            <Grid item xs={12}>
                <Box pt={3} pb={1}>
                    <Typography variant="h4">Личная информация</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {id === userId ? (
                    <AvatarElement image={avatar} setAvatar={setAvatar} />
                ) : (
                    <AvatarElement image={avatar} setAvatar={null} />
                )}
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
                            propertyName="name"
                            actionConfirmationHandler={applyEditValue}
                        />
                    ) : null}
                </Grid>
                <Grid item container>
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
                <Grid item container>
                    <Grid item>
                        <Box pr={1} minHeight="32px" lineHeight="32px">
                            <Typography variant="body1">
                                <b>Дата рождения: </b>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box pr={1}>
                            <Typography variant="body1">
                                {`${userBorn.getDate()}/${
                                    userBorn.getMonth() + 1
                                }/${userBorn.getYear()}`}
                            </Typography>
                        </Box>
                    </Grid>
                    {id === userId ? (
                        <Grid item>
                            <Box pr={1}>
                                <DateDialog
                                    initialValue={userBorn}
                                    dialogTitle="Изменить дату рождения"
                                    confirmActionLabel="Изменить"
                                    cancelActionLabel="Отмена"
                                    propertyName="userBorn"
                                    actionConfirmationHandler={applyEditValue}
                                />
                            </Box>
                        </Grid>
                    ) : null}
                </Grid>
                <Grid item>
                    <Box pr={1} minHeight="32px">
                        <Typography variant="body1">
                            <b>Город: </b>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item container xs={8}>
                    <Grid item>
                        <Box pr={1} minHeight="32px" lineHeight="32px">
                            <Typography variant="body1">{userFrom} </Typography>
                        </Box>
                    </Grid>
                    {id === userId ? (
                        <SingleInputDialog
                            initialValue={userFrom}
                            dialogTitle="Изменить город"
                            inputType="text"
                            placeholder="Введите новый город"
                            confirmActionLabel="Изменить"
                            cancelActionLabel="Отмена"
                            propertyName="userFrom"
                            actionConfirmationHandler={applyEditValue}
                        />
                    ) : null}
                </Grid>
            </Grid>
            {id === userId ? (
                <>
                    <ChangePasswordDialog userEmail={userEmail} />
                    <DeleteUserDialog userEmail={userEmail} handleDeleteUser={handleDeleteUser} />
                </>
            ) : null}
        </>
    );
};

export default ProfilePagePersonalInfo;
