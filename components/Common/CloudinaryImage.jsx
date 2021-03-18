import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import React from "react";

const CloudinaryImage = ({ image, width = 400, height = 200 }) => {
    return (
        <CloudinaryContext cloudName="coolinary">
            <div className="App">
                <section>
                    {image.length ? (
                        <Image publicId={image} fetch-format="auto" quality="auto">
                            <Transformation width={width} height={height} crop="scale" />
                        </Image>
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
