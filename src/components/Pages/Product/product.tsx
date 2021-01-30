import ProductGrid from 'components/ProductGrid';
import React from 'react';
import classes from './product.css';

const Product = () => {
    return (
        <div className={classes.root}>
            <ProductGrid/>
        </div>
    )
}

export default Product;