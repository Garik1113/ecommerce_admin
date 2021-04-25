import CustomerGrid from 'components/CustomerGrid';
import React from 'react';
import classes from './customer.css';

const Customer = () => {
    return (
        <div className={classes.root}>
            <CustomerGrid/>
        </div>
    )
}

export default Customer;