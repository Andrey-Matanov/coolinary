import React from "react";
import { Button, Typography } from "@material-ui/core";
import { baseURL } from "../../../utils";

const AddImageField = ({
    label = "Изображение",
    formFieldName,
    setFieldValue,
    imageString,
    setImageString,
}) => {
    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = async () => {
            const response = await fetch(`${baseURL}/api/save2`, {
                method: "POST",
                body: JSON.stringify({
                    data: reader.result,
                }),
            });

            if (response.status === 500) {
                console.log("Ошибка");
            } else {
                const json = await response.json();
                const id = json.id;

                setFieldValue(formFieldName, `${id}`);
                setImageString(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography>{label}</Typography>
            <label htmlFor={`upload-photo-${formFieldName}`}>
                <input
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id={`upload-photo-${formFieldName}`}
                    name={`upload-photo-${formFieldName}`}
                    type="file"
                />

                <Button color="primary" variant="contained" component="span">
                    Загрузить изображение
                </Button>
            </label>

            {imageString ? (
                <img
                    src={imageString}
                    alt="recipeImage"
                    width="200"
                    height="200"
                />
            ) : null}
        </div>
    );
};

export default AddImageField;
