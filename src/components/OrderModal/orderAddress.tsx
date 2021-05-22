import React from 'react';
import classes from './orderAddress.css';

const OrderAddress = (props) => {
    const { address } = props;

    return (
        <div className={classes.root}>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    Երկիր:
                </div>
                <div className={classes.fieldValue}>
                    {address.country}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    Մարզ:
                </div>
                <div className={classes.fieldValue}>
                    {address.state}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    Քաղաք:
                </div>
                <div className={classes.fieldValue}>
                    {address.city}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    Հասցե:
                </div>
                <div className={classes.fieldValue}>
                    {address.address}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    Էլ հասցե:
                </div>
                <div className={classes.fieldValue}>
                    {address.email}
                </div>
            </div>
            <div className={classes.field}>
                <div className={classes.fieldTitle}>
                    Լրացուցիչ ինֆորմացիա:
                </div>
                <div className={classes.fieldValue}>
                    {address.additionalInformation}
                </div>
            </div>
        </div>
    )
}

export default OrderAddress