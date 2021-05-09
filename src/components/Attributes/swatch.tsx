import React from 'react';
import classes from './swatch.css';


const Swatch = (props: any) => {
    const { value } = props;

    return (
        <div className={classes.root}>
            {value.name}
        </div>
    )
}

export default Swatch;