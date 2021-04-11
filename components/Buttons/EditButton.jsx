import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const EditButton = ({ handler }) => {
    return (
        <IconButton variant="contained" size="small" onClick={handler}>
            <EditIcon fontSize="small" />
        </IconButton>
    );
};

export default EditButton;
