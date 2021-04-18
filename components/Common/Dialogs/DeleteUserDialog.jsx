import { Button, Dialog, Grid } from "@material-ui/core";
import React, { useState } from "react";
import DeleteUserForm from "../../Forms/DeleteUserFrom.jsx";

const DeleteUserDialog = ({ userEmail, handleDeleteUser }) => {
    const [openPassword, setOpenPassword] = useState(false);

    return (
        <>
            <Grid item container alignItems="center" xs={12}>
                <Button variant="contained" onClick={() => setOpenPassword(true)}>
                    Удалить профиль
                </Button>
            </Grid>
            <Dialog
                open={openPassword}
                onClose={() => setOpenPassword(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <DeleteUserForm
                    email={userEmail}
                    handleDeleteUser={handleDeleteUser}
                    handleClose={() => setOpenPassword(false)}
                />
            </Dialog>
        </>
    );
};

export default DeleteUserDialog;
