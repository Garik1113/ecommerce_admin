import OrderGrid from 'components/OrderGrid';
import React from 'react';
import classes from './order.css';

const Order = () => {
    return (
        <div className={classes.root}>
            <OrderGrid/>
        </div>
    )
}

export default Order;