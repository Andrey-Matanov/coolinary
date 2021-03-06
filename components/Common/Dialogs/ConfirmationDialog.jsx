import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmationDialog = ({
    dialogTitle,
    dialogContentText,
    confirmActionLabel,
    cancelActionLabel,
    actionConfirmationHandler,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmAndClose = () => {
        setOpen(false);
        actionConfirmationHandler();
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {dialogTitle}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {cancelActionLabel}
                    </Button>
                    <Button onClick={handleConfirmAndClose} color="primary" autoFocus>
                        {confirmActionLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmationDialog;
