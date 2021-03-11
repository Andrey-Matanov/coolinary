import React, { useEffect, useState } from "react";

const ImagePage = () => {
    const [image, setImage] = useState("");

    useEffect(async () => {
        const response = await fetch("http://cookingsite.loc/api/image/3");
        const json = await response.json();

        const image = json.data;
        console.log(image);
        setImage(image);
    }, []);

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        console.log(reader.result);
                    };

                    reader.readAsDataURL(e.target.files[0]);
                }}
            />

            <img src={image} alt="image" />
        </div>
    );
};

export default ImagePage;
