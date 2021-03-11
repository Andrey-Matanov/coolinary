import React from "react";

import { Typography, Button, Box } from "@material-ui/core"

const DeleteDialog = ({ handleDelete, handleClose }) => {
    const deleteUser = () => {
        handleDelete()
    }
    const closeDialog = () => {
        handleClose();
    }
    return (
        <Box p={2}>
            <Typography variant="h3">Вы уверены?</Typography>
            <Button
                variant="contained"
                onClick={deleteUser}
            >
                Да
            </Button>
            <Button
                variant="contained"
                onClick={closeDialog}
            >
                Нет
            </Button>
        </Box>
    );
};

export default DeleteDialog;