import React from 'react';
import classes from './orderAddress.css';

const OrderAddress = (props) => {
    const { address } = props;

    return (
        <div className={classes.root}>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    Country:
                </div>
                <div className={classes.fieldValue}>
                    {address.country}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    State:
                </div>
                <div className={classes.fieldValue}>
                    {address.state}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    City:
                </div>
                <div className={classes.fieldValue}>
                    {address.city}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    First Address:
                </div>
                <div className={classes.fieldValue}>
                    {address.firstAddress}
                </div>
            </div>
        </div>
    )
}

export default OrderAddress