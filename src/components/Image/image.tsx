import React from 'react';
import { handleImageError } from 'src/helpers/handleImageError';
import classes from './image.css';

interface ImageProps {
    folder: string,
    imageName: string,
    onDelete: any
}
const Image = (props: ImageProps) => {
    const { folder, imageName, onDelete } = props;
    const src = `api/images/${folder}/${imageName}`

    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <img
                    src={src}
                    onError={handleImageError}
                />
            </div>
            <div className={classes.closeIcon} onClick={onDelete}>X</div>
        </div>
    )
};

export default Image;