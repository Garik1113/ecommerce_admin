import SliderGrid from 'components/SliderGrid';
import React from 'react';
import classes from './slider.css';

const Slider = () => {
    return (
        <div className={classes.root}>
            <SliderGrid/>
        </div>
    )
}

export default Slider;