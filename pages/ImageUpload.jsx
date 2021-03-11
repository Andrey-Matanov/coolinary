import React, { useState } from "react";

const ImageUpload = () => {
    const [base64String, setBase64String] = useState("");

    const uploadImage = () => {
        console.log(base64String);
    };

    const onImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setBase64String(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <input type="file" onChange={onImageChange} />
            {base64String.length ? (
                <img src={base64String} alt="image" />
            ) : null}
            <button onClick={uploadImage}>Show value</button>
        </div>
    );
};

export default ImageUpload;
