import React from 'react';
import classes from './image.css';
const BASE_URL = "https://my-ecommerce-bucket.s3-eu-west-1.amazonaws.com/products/values/";
interface ImageProps {
    baseUrl: string,
    imageName: string,
    onDelete: any
}
const Image = (props: ImageProps) => {
    const { baseUrl, imageName, onDelete } = props;
    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <img src={`${baseUrl}/${imageName}`}/>
            </div>
            <div className={classes.closeIcon} onClick={onDelete}>X</div>
        </div>
    )
};

export default Image;