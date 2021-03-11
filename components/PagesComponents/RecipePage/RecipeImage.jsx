import React, { useLayoutEffect, useState } from "react";
import { baseURL } from "../../../utils";

const RecipeImage = ({ image, name, className }) => {
    const [src, setSrc] = useState(image);

    useLayoutEffect(() => {
        const getImage = async () => {
            if (!isNaN(parseInt(image))) {
                const response = await fetch(`${baseURL}/api/image/${image}`);
                const json = await response.json();

                setSrc(json.data);
            } else {
                setSrc(image);
            }
        };

        getImage();
    }, [image]);

    return <img src={src} alt={name} className={className} />;
};

export default RecipeImage;
