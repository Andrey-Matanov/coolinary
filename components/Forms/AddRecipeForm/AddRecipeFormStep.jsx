import React from "react";
import { Button, Card, CardContent, CardHeader, TextField } from "@material-ui/core";
import AddImageField from "./AddImageField";

const AddRecipeFormStep = ({
    index,
    name,
    description,
    image,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    removeCurrentStep,
}) => {
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
                            touched[index]?.name &&
                            typeof errors === "object" &&
                            Boolean(errors[index]?.name)
                        }
                        helperText={
                            typeof touched === "object" &&
                            touched[index]?.name &&
                            errors?.[index]?.name
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
                            touched[index]?.description &&
                            typeof errors === "object" &&
                            Boolean(errors[index]?.description)
                        }
                        helperText={
                            typeof touched === "object" &&
                            touched[index]?.description &&
                            errors?.[index]?.description
                        }
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <AddImageField
                        image={image}
                        fieldName={`steps[${index}].image`}
                        setFieldValue={setFieldValue}
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
