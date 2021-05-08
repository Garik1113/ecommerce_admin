import React, { useMemo } from 'react';
import classes from './orderReport.css';
import 'react-vis/dist/style.css';
import { useOrderReport } from 'src/talons/OrderReport/useOrderReport';
import OrderAddress from 'components/OrderModal/orderAddress';
import ItemList from 'components/OrderModal/productList';

const OrderReport = () => {
    const { totalOrders, totalSales, currency, lastOrder } = useOrderReport();
    
    return (
        <div className={classes.root}>
            <div className={classes.reportHeader}>
                <div className={classes.reportField}>
                    <div className={classes.valueField}>
                        <span className={classes.orderText}>Total Sales: </span> 
                        <span className={classes.orderValue}>{totalSales}{currency.name}</span>
                    </div>
                </div>
                <div className={classes.reportField}>
                    <div className={classes.valueField}>
                        <span className={classes.orderText}>Total Orders: </span> 
                        <span className={classes.orderValue}>{totalOrders}</span>
                    </div>
                </div>
            </div>
            <div className={classes.body}>
                {
                    lastOrder 
                    ?   <form onSubmit={(e) => e.preventDefault()}>
                        <div className={classes.header}>
                        <div className={classes.headerField}>
                            <div className={classes.headerTitle}>
                                Date
                            </div>
                            <span>
                                {lastOrder.createdAt}
                            </span>
                        </div>
                        <div className={classes.headerField}>
                            <div className={classes.headerTitle}>
                                Grand total
                            </div>
                            <span>
                                {lastOrder.totalPrice} {currency.name}
                            </span>
                        </div>
                        <div className={classes.headerField}>
                            <div className={classes.headerTitle}>
                                Order number
                            </div>
                            <span>
                                {lastOrder._id}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className={classes.items}>
                            <div className={classes.productsTitle}>
                                Products
                            </div>
                            {
                                <ItemList items={lastOrder.items} currency={currency}/>
                            }
                        </div>
                            <div className={classes.addressField}>
                                <div className={classes.shipping}>
                                    <div className={classes.addressTitle}>
                                        Shipping Address
                                    </div>
                                    <div>
                                        <OrderAddress address={lastOrder.shippingAddress}/>
                                    </div>
                                </div>
                                <div className={classes.billing}>
                                    <div className={classes.addressTitle}>
                                        Billing Address
                                    </div>
                                    <OrderAddress address={lastOrder.billingAddress}/>
                                </div>
                            </div>
                            {
                                lastOrder.customer ?
                                <div className={classes.customer}>
                                    <div className={classes.addressTitle}>
                                        Customer
                                    </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                                Email:
                                            </div>
                                            <div className={classes.fieldValue}>
                                                {lastOrder.customer.email}
                                            </div>
                                        </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                            First Name:
                                        </div>
                                        <div className={classes.fieldValue}>
                                            {lastOrder.customer.firstName}
                                        </div>
                                    </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                            Last Name:
                                        </div>
                                        <div className={classes.fieldValue}>
                                            {lastOrder.customer.lastName}
                                        </div>
                                    </div>
                                </div>
                                :  null
                            }
                            <div className={classes.payment}>
                                <div className={classes.paymentHeader}>
                                    Payment Method
                                </div>
                                <div className={classes.value}>
                                    {lastOrder.paymentMethod.methodName}
                                </div>
                            </div>
                            <div className={classes.payment}>
                                <div className={classes.paymentHeader}>
                                    Shipping Method
                                </div>
                                <div className={classes.value}>
                                    {lastOrder.shippingMethod.price} {currency.name}
                                </div>
                                <div className={classes.value}>
                                    {lastOrder.shippingMethod.methodName}
                                </div>
                            </div>
                            <div className={classes.payment}>
                                <div className={classes.paymentHeader}>
                                    Status
                                </div>
                                <div className={classes.value}>
                                    {lastOrder.status}
                                </div>
                            </div>
                        </div>
                        </form>
                    :   null
                }
                
            </div>
        </div>
    )
}


export default OrderReport