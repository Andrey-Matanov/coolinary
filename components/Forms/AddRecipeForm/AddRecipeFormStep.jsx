import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
} from "@material-ui/core";
import styled from "styled-components";
import FormInput from "../../Inputs/FormInput";
import FormTextarea from "../../Inputs/FormTextArea";
import AddImageField from "./AddImageField";

const Error = styled.div`
    color: red;
`;

const AddRecipeFormStep = ({
    index,
    name,
    description,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    removeCurrentStep,
}) => {
    const [imageString, setImageString] = useState("");

    return (
        <Card variant="outlined" style={{ marginBottom: "10px" }}>
            <CardContent>
                <CardHeader title={`Шаг № ${index + 1}`} />

                <div style={{ marginBottom: "10px" }}>
                    <TextField
                        fullwidth="true"
                        id={`steps[${index}].name`}
                        name={`steps[${index}].name`}
                        label="Название шага"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            typeof touched === "object" &&
                            touched[index] &&
                            touched[index].name &&
                            typeof errors === "object" &&
                            Boolean(errors[index]) &&
                            Boolean(errors[index].name)
                        }
                        helperText={
                            typeof touched === "object" &&
                            touched[index] &&
                            touched[index].name &&
                            errors &&
                            errors[index] &&
                            errors[index].name
                        }
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <TextField
                        fullwidth="true"
                        id={`steps[${index}].description`}
                        multiline={true}
                        name={`steps[${index}].description`}
                        label="Описание шага"
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            typeof touched === "object" &&
                            touched[index] &&
                            touched[index].description &&
                            typeof errors === "object" &&
                            Boolean(errors[index]) &&
                            Boolean(errors[index].description)
                        }
                        helperText={
                            typeof touched === "object" &&
                            touched[index] &&
                            touched[index].description &&
                            errors &&
                            errors[index] &&
                            errors[index].description
                        }
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <AddImageField
                        label="Изображение шага"
                        formFieldName={`steps[${index}].image`}
                        setFieldValue={setFieldValue}
                        imageString={imageString}
                        setImageString={setImageString}
                    />
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth={true}
                    onClick={removeCurrentStep}
                >
                    Удалить текущий шаг
                </Button>
            </CardContent>
        </Card>
    );
};

export default AddRecipeFormStep;
