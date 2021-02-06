import { IMAGE_BASE_URL, NOT_FOUND_IMAGE_SRC } from 'config/defaults';
import React, { useEffect, useState } from 'react';
import { handleImageError } from 'src/helpers/handleImageError';
import classes from './image.css';

interface ImageProps {
    s3Folder: string,
    imageName: string,
    onDelete: any
}
const Image = (props: ImageProps) => {
    const { s3Folder, imageName, onDelete } = props;
    const [src, setSrc] = useState(`${IMAGE_BASE_URL}/${s3Folder}/${imageName}`);

    useEffect(() => {
        if (imageName === NOT_FOUND_IMAGE_SRC) {
            setSrc(imageName);
        }
    }, [imageName, NOT_FOUND_IMAGE_SRC]);

    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <img 
                    loading="lazy"
                    src={src}
                    onError={handleImageError}
                />
            </div>
            <div className={classes.closeIcon} onClick={onDelete}>X</div>
        </div>
    )
};

export default Image;