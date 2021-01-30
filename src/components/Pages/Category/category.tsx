import CategoryGrid from 'components/CategoryGrid';
import React from 'react';
import classes from './category.css';

const Category = () => {
    return (
        <div className={classes.root}>
            <CategoryGrid/>
        </div>
    )
}

export default Category;