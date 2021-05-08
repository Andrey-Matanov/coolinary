import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditButton from "../../Buttons/EditButton";

const DateDialog = ({
    initialValue,
    dialogTitle,
    dialogContentText,
    confirmActionLabel,
    cancelActionLabel,
    propertyName,
    actionConfirmationHandler,
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleDateChange = (date) => {
        setValue(date);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAndSubmit = () => {
        setOpen(false);
        actionConfirmationHandler(propertyName, value);
    };

    return (
        <div>
            <EditButton handler={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    {dialogContentText ? (
                        <DialogContentText>{dialogContentText}</DialogContentText>
                    ) : null}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            // label="Date picker inline"
                            value={value}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    {/* <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type={inputType}
                        placeholder={placeholder}
                        autoFocus
                        fullWidth
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {cancelActionLabel}
                    </Button>
                    <Button onClick={handleCloseAndSubmit} color="primary">
                        {confirmActionLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DateDialog;
