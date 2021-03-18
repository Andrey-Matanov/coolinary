import { CloudinaryContext, Image } from "cloudinary-react";
import React from "react";

const CloudinaryImage = ({ image }) => {
    return (
        <CloudinaryContext cloudName="coolinary">
            <div className="App">
                <section>
                    {image.length ? (
                        <Image publicId={image} fetch-format="auto" quality="auto" />
                    ) : (
                        <img
                            src="https://via.placeholder.com/150x150"
                            width={width}
                            height={height}
                        />
                    )}
                </section>
            </div>
        </CloudinaryContext>
    );
};

export default CloudinaryImage;
