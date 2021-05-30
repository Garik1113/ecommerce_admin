import React, { useMemo } from 'react';
import { Button, Radio, Modal, Dropdown } from 'semantic-ui-react';
import getDate from 'src/helpers/getDate';
import { useOrderModal } from 'src/talons/OrderModal/useOrderModal';
import OrderAddress from './orderAddress';
import classes from './orderModal.css';
import ItemList from './productList';

interface IOrderModalProps {
    visible: boolean,
    onClose: any,
    order?: any,
    reloadData?: any,
    handleHideModal?: any
}

const OrderModal = (props:IOrderModalProps) => {
    const { visible, onClose, order, reloadData,  handleHideModal} = props;
    const talonProps = useOrderModal({ order, reloadData, handleHideModal });
    const { 
        formik,
        currency,
        orderStatusOptions,
        status, 
        setOrderStatus
    } = talonProps;
    const customer = useMemo(() => {
        if (order.customer) {
            return order.customer;
        } else {
            const { email, firstName, lastName } = order.billingAddress;
            return {
                email,
                firstName,
                lastName
            }
        }
    }, [order])
    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Պատվեր</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.header}>
                            <div className={classes.headerField}>
                                <div className={classes.headerTitle}>
                                    Ամսաթիվ
                                </div>
                                <span>
                                    {getDate(order.createdAt)}
                                </span>
                            </div>
                            <div className={classes.headerField}>
                                <div className={classes.headerTitle}>
                                    Ընդհանուր արժեք
                                </div>
                                <span>
                                    {order.totalPrice} {currency.name}
                                </span>
                            </div>
                            <div className={classes.headerField}>
                                <div className={classes.headerTitle}>
                                    Պատվերի համար
                                </div>
                                <span>
                                    {order._id}
                                </span>
                            </div>
                        </div>
                            <div>
                                <div className={classes.items}>
                                    <div className={classes.productsTitle}>
                                        Ապրանքներ
                                    </div>
                                    {
                                        <ItemList items={order.items} currency={currency}/>
                                    }
                                </div>
                                <div className={classes.payment}>
                                    <div className={classes.paymentHeader}>
                                        Կարգավիճակ
                                    </div>
                                    <Dropdown
                                        value={status.value || order.status.value}
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
                                            <OrderAddress address={order.shippingAddress}/>
                                        </div>
                                    </div>
                                    <div className={classes.billing}>
                                        <div className={classes.addressTitle}>
                                            Վճարման հասցե
                                        </div>
                                        <OrderAddress address={order.billingAddress}/>
                                    </div>
                                </div>
                                {
                                    <div className={classes.customer}>
                                        <div className={classes.addressTitle}>
                                            Օգտատեր
                                        </div>
                                        <div className={classes.field}>
                                                <div className={classes.fieldTitle}>
                                                    Էլ հասցե:
                                                </div>
                                                <div className={classes.fieldValue}>
                                                    {customer.email}
                                                </div>
                                            </div>
                                        <div className={classes.field}>
                                            <div className={classes.fieldTitle}>
                                                Անուն:
                                            </div>
                                            <div className={classes.fieldValue}>
                                                {customer.firstName}
                                            </div>
                                        </div>
                                        <div className={classes.field}>
                                            <div className={classes.fieldTitle}>
                                                Ազգանուն:
                                            </div>
                                            <div className={classes.fieldValue}>
                                                {customer.lastName}
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className={classes.payment}>
                                    <div className={classes.paymentHeader}>
                                        Վճարման եղանակ
                                    </div>
                                    <div className={classes.value}>
                                        {order.paymentMethod.methodName}
                                    </div>
                                </div>
                                <div className={classes.payment}>
                                    <div className={classes.paymentHeader}>
                                        Առաքման եղանակ
                                    </div>
                                    <div className={classes.value}>
                                        {order.shippingMethod.price} {currency.name}
                                    </div>
                                    <div className={classes.value}>
                                        {order.shippingMethod.methodName}
                                    </div>
                                </div>
                            </div>
                        </form>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default OrderModal;