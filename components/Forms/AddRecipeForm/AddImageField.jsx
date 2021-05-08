import React, { useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../../services/cloudinaryService";

const AddImageField = ({ image, fieldName, setFieldValue }) => {
    useEffect(() => {
        console.log(image);
    }, [image]);

    const beginUpload = (tag) => {
        const uploadOptions = {
            cloudName: "coolinary",
            tags: [tag],
            uploadPreset: "coolinary_images",
            multiple: false,
            cropping: true,
            croppingAspectRatio: 1,
            language: "ru",
        };

        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                console.log(photos);
                if (photos.event === "success") {
                    setFieldValue(fieldName, photos.info.public_id);
                }
            } else {
                console.log(error);
            }
        });
    };

    return (
        <div>
            <CloudinaryContext cloudName="coolinary">
                <div className="App">
                    <section>
                        {image.length ? (
                            <Image publicId={image} fetch-format="auto" quality="auto" />
                        ) : null}
                    </section>
                </div>
            </CloudinaryContext>

            <button type="button" onClick={() => beginUpload()}>
                Upload Image
            </button>
        </div>
    );
};

export default AddImageField;
