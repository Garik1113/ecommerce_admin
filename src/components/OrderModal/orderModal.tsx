import React from 'react';
import { Button, Radio, Modal } from 'semantic-ui-react';
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
    } = talonProps;
    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Order</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                    <div className={classes.header}>
                    <div className={classes.headerField}>
                        <div className={classes.headerTitle}>
                            Date
                        </div>
                        <span>
                            {order.createdAt}
                        </span>
                    </div>
                    <div className={classes.headerField}>
                        <div className={classes.headerTitle}>
                            Grand total
                        </div>
                        <span>
                            {order.totalPrice}
                        </span>
                    </div>
                    <div className={classes.headerField}>
                        <div className={classes.headerTitle}>
                            Order number
                        </div>
                        <span>
                            {order._id}
                        </span>
                    </div>
                </div>
                 <div>
                            <div className={classes.addressField}>
                                <div className={classes.shipping}>
                                    <div className={classes.addressTitle}>
                                        Shipping Address
                                    </div>
                                    <div>
                                        <OrderAddress address={order.shippingAddress}/>
                                    </div>
                                </div>
                                <div className={classes.billing}>
                                    <div className={classes.addressTitle}>
                                        Billing Address
                                    </div>
                                    <OrderAddress address={order.billingAddress}/>
                                </div>
                            </div>
                            {
                                order.customer ?
                                <div className={classes.customer}>
                                    <div className={classes.addressTitle}>
                                        Customer
                                    </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                                Email:
                                            </div>
                                            <div className={classes.fieldValue}>
                                                {order.customer.email}
                                            </div>
                                        </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                            First Name:
                                        </div>
                                        <div className={classes.fieldValue}>
                                            {order.customer.firstName}
                                        </div>
                                    </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                            Last Name:
                                        </div>
                                        <div className={classes.fieldValue}>
                                            {order.customer.lastName}
                                        </div>
                                    </div>
                                </div>
                                :  null
                            }
                            <div className={classes.payment}>
                                <div className={classes.paymentHeader}>
                                    Payment Method
                                </div>
                                <span className={classes.status}>
                                    {order.paymentMethod}
                                </span>
                            </div>
                            <div className={classes.payment}>
                                <div className={classes.paymentHeader}>
                                    Status
                                </div>
                                <span className={classes.status}>
                                    {order.status}
                                </span>
                            </div>
                            <div className={classes.items}>
                                <div className={classes.paymentHeader}>
                                    Products
                                </div>
                                {
                                    <ItemList items={order.items}/>
                                }
                            </div>
                        </div>
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary type="submit"onClick={() => formik.handleSubmit()}>Save</Button>
                    <Button secondary onClick={()=> onClose()}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default OrderModal;