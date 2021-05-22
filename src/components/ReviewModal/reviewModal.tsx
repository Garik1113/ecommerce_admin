import React from 'react';
import { Button, Modal, Input, Dropdown } from 'semantic-ui-react';
import { useReviewModal } from 'src/talons/ReviewModal/useReviewModal';
import classes from './reviewModal.css';

interface IProps {
    visible: boolean,
    onClose: any,
    review?: any,
    reloadData?: any,
    handleHideModal?: any
}

const ReviewModal = (props:IProps) => {
    const { visible, onClose, review, reloadData,  handleHideModal } = props;
    const talonProps = useReviewModal({ review, reloadData, handleHideModal });
    const { 
        formik,
        allowedOptions,
        product
    } = talonProps;
    
    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Մեկնաբանություն</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        {
                            product
                            ?   <div className={classes.field}>
                                    <h2>Ապրանք</h2>
                                    <div className={classes.product}>
                                        <img src={`api/images/product/${product.image}`} className={classes.image}/>
                                        <span className={classes.productName}>{product.name}</span>
                                    </div>
                                </div>
                            :   null
                        }
                        
                        <div className={classes.field}>
                            <h2>Օգտատեր</h2>
                            <div className={classes.customerDetails}>
                                Անուն: <span className={classes.value}>{review.customer.firstName}</span> 
                            </div>
                            <div className={classes.customerDetails}>
                                Ազգանուն: <span className={classes.value}>{review.customer.lastName}</span> 
                            </div>
                            <div className={classes.customerDetails}>
                                Էլ հասցե: <span className={classes.value}>{review.customer.email}</span> 
                            </div>
                        </div>
                        <div className={classes.field}>
                            <h2>Ընդհանուր</h2>
                            <div className={classes.customerDetails}>
                                Մեկնաբանություն: <span className={classes.value}>{review.comment}</span> 
                            </div>
                            <div className={classes.customerDetails}>
                                Վարկանիշ: <span className={classes.value}>{review.rating}</span> 
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.allowed}>Թույլատրված է</div>
                            <Dropdown
                                onChange={(e, data) =>  formik.setFieldValue("status", data.value)}
                                value={formik.values.status}
                                name="status"
                                selection
                                fluid
                                id="status"
                                options={allowedOptions}
                            />
                        </div>
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary type="submit"onClick={() => formik.handleSubmit()}>Պահպանել</Button>
                    <Button secondary onClick={()=> onClose()}>Չեղարկել</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default ReviewModal;