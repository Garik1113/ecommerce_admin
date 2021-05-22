import React, { useMemo } from 'react';
import classes from './orderReport.css';
import 'react-vis/dist/style.css';
import { useOrderReport } from 'src/talons/OrderReport/useOrderReport';
import OrderAddress from 'components/OrderModal/orderAddress';
import ItemList from 'components/OrderModal/productList';
import getDate from 'src/helpers/getDate';
import { Dropdown } from 'semantic-ui-react';

const OrderReport = () => {
    const { 
        totalOrders, 
        totalSales, 
        currency, 
        lastOrder,
        orderStatusOptions,
        status, 
        setOrderStatus
    } = useOrderReport();

    return (
        <div className={classes.root}>
            <div className={classes.reportHeader}>
                <div className={classes.reportField}>
                    <div className={classes.valueField}>
                        <span className={classes.orderText}>Ընդհանուր Վաճառք: </span> 
                        <span className={classes.orderValue}>{totalSales}{currency.name}</span>
                    </div>
                </div>
                <div className={classes.reportField}>
                    <div className={classes.valueField}>
                        <span className={classes.orderText}>Ընդհանուր պատվերների քանակ: </span> 
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
                                        Ամսաթիվ
                                    </div>
                                    <span>
                                        {getDate(lastOrder.createdAt)}
                                    </span>
                                </div>
                                <div className={classes.headerField}>
                                    <div className={classes.headerTitle}>
                                        Ընդհանուր արժեք
                                    </div>
                                    <span>
                                        {lastOrder.totalPrice} {currency.name}
                                    </span>
                                </div>
                                <div className={classes.headerField}>
                                    <div className={classes.headerTitle}>
                                        Պատվերի համար
                                    </div>
                                    <span>
                                        {lastOrder._id}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className={classes.items}>
                                    <div className={classes.productsTitle}>
                                        Ապրանքներ
                                    </div>
                                    {
                                        <ItemList items={lastOrder.items} currency={currency}/>
                                    }
                                </div>
                                <div className={classes.payment}>
                                        <div className={classes.paymentHeader}>
                                            Կարգավիճակ
                                        </div>
                                        <Dropdown
                                            value={status.value || lastOrder.status.value}
                                            options={orderStatusOptions}
                                            onChange={(e, data) => setOrderStatus(data.value)}
                                        />
                                </div>
                                <div className={classes.addressField}>
                                    <div className={classes.shipping}>
                                        <div className={classes.addressTitle}>
                                            Առաքման հասցե
                                        </div>
                                        <div>
                                            <OrderAddress address={lastOrder.shippingAddress}/>
                                        </div>
                                    </div>
                                    <div className={classes.billing}>
                                        <div className={classes.addressTitle}>
                                            Վճարման հասցե
                                        </div>
                                        <OrderAddress address={lastOrder.billingAddress}/>
                                    </div>
                                </div>
                                {
                                    lastOrder.customer ?
                                    <div className={classes.customer}>
                                        <div className={classes.addressTitle}>
                                            Օգտատեր
                                        </div>
                                        <div className={classes.field}>
                                                <div className={classes.fieldTitle}>
                                                    Էլ հասցե:
                                                </div>
                                                <div className={classes.fieldValue}>
                                                    {lastOrder.customer.email}
                                                </div>
                                            </div>
                                        <div className={classes.field}>
                                            <div className={classes.fieldTitle}>
                                                Անուն:
                                            </div>
                                            <div className={classes.fieldValue}>
                                                {lastOrder.customer.firstName}
                                            </div>
                                        </div>
                                        <div className={classes.field}>
                                            <div className={classes.fieldTitle}>
                                                Ազգանուն:
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
                                        Վճարման եղանակ
                                    </div>
                                    <div className={classes.value}>
                                        {lastOrder.paymentMethod.methodName}
                                    </div>
                                </div>
                                <div className={classes.payment}>
                                    <div className={classes.paymentHeader}>
                                        Առաքման եղանակ
                                    </div>
                                    <div className={classes.value}>
                                        {lastOrder.shippingMethod.price} {currency.name}
                                    </div>
                                    <div className={classes.value}>
                                        {lastOrder.shippingMethod.methodName}
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