import React, { useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../../services/cloudinaryService.js";

import { Avatar, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => {
    return {
        avatar: {
            width: "70px",
            height: "70px",
        },
    };
});

const AvatarElement = ({ image, setAvatar }) => {
    const classes = useStyles();

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
            showSkipCropButton: false,
            language: "ru",
        };

        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                console.log(photos);
                if (photos.event === "success") {
                    setAvatar(photos.info.public_id);
                }
            } else {
                console.log(error);
            }
        });
    };

    return (
        <ButtonBase onClick={() => beginUpload()} disabled={!setAvatar}>
            <CloudinaryContext cloudName="coolinary">
                <div>
                    <section>
                        {image.length ? (
                            <Avatar
                                className={classes.avatar}
                                component={Image}
                                publicId={image}
                                fetch-format="auto"
                                quality="auto"
                            />
                        ) : (
                            <Avatar />
                        )}
                    </section>
                </div>
            </CloudinaryContext>
        </ButtonBase>
    );
};

export default AvatarElement;
