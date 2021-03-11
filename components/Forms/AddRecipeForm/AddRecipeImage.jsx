import React, { useState } from "react";
import AddImageField from "./AddImageField";

const AddRecipeImage = ({ setFieldValue }) => {
    const [imageString, setImageString] = useState("");

    return (
        <div>
            <AddImageField
                label="Изображение рецепта"
                formFieldName="image"
                setFieldValue={setFieldValue}
                imageString={imageString}
                setImageString={setImageString}
            />
        </div>
    );
};

export default AddRecipeImage;
