import { Button, Dialog, Grid } from "@material-ui/core";
import React, { useState } from "react";
import ChangePasswordForm from "../../Forms/ChangePasswordForm";

const ChangePasswordDialog = ({ userEmail }) => {
    const [openPassword, setOpenPassword] = useState(false);

    return (
        <>
            <Grid item container alignItems="center" xs={12}>
                <Button variant="contained" onClick={() => setOpenPassword(true)}>
                    Сменить пароль
                </Button>
            </Grid>
            <Dialog
                open={openPassword}
                onClose={() => setOpenPassword(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ChangePasswordForm email={userEmail} handleClose={() => setOpenPassword(false)} />
            </Dialog>
        </>
    );
};

export default ChangePasswordDialog;
