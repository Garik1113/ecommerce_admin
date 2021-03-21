import FilterGrid from 'components/FilterGrid';
import React from 'react';
import classes from './filter.css';

const Filter = () => {
    return (
        <div className={classes.root}>
            <FilterGrid/>
        </div>
    )
}

export default Filter;