import ProductSubscribersGrid from 'components/ProductSubscribersGrid';
import React from 'react';
import classes from './productSubscribers.css';

const ProductSubscribers = () => {
    return (
        <div className={classes.root}>
            <ProductSubscribersGrid/>
        </div>
    )
}

export default ProductSubscribers;