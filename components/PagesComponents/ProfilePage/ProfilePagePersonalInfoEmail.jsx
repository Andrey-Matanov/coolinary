import React from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

const ProfilePagePersonalInfoEmail = ({
    emailChange,
    userEmail,
    setEmailChange,
    setNewEmailValue,
    applyEditEmail,
}) => {
    return (
        <>
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
        </>
    );
};

export default ProfilePagePersonalInfoEmail;
