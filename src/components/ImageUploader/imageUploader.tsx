import React from 'react';
import { useDropzone } from 'react-dropzone';
import classes from './imageUploader.css';

interface ImageUploaderProps {
    handleOnDrop: any
}

const ImageUploader = (props: ImageUploaderProps) => {
    const { handleOnDrop } = props;
    const { 
        getRootProps, 
        getInputProps 
    } = useDropzone({ 
            onDrop: handleOnDrop,
            multiple: false 
        });

    return (
        <div {...getRootProps({className: classes.dropzone})}>
            <input {...getInputProps()} />
            <p>Ավելացրեք նկար այստեղ</p>
        </div>
    )
}

export default ImageUploader;