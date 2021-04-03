import AttributeGrid from 'components/AttributeGrid';
import React from 'react';
import classes from './attribute.css';

const Attribute = () => {
    return (
        <div className={classes.root}>
            <AttributeGrid/>
        </div>
    )
}

export default Attribute;