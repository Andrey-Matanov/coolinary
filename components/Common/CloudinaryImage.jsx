import { CloudinaryContext, Image } from "cloudinary-react";
import React from "react";

const CloudinaryImage = ({ image }) => {
    return (
        <CloudinaryContext cloudName="coolinary">
            {image?.length ? (
                <Image publicId={image} fetch-format="auto" quality="auto" />
            ) : (
                <img src="https://via.placeholder.com/150x150" />
            )}
        </CloudinaryContext>
    );
};

export default CloudinaryImage;
