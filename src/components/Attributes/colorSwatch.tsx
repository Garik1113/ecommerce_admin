import React from 'react';
import classes from './colorSwatch.css';


const ColorSwatch = (props: any) => {
    const { value } = props;

    return (
        <div className={classes.root} style={{background: value.name}}></div>
    )
}

export default ColorSwatch;