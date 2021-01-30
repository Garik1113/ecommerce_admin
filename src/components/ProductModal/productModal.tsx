import React from 'react';
import { Button, Checkbox, Input, Modal } from 'semantic-ui-react';
import { useCategoryModal } from 'src/talons/CategoryModal/useCategoryModal';
import { useProductModal } from 'src/talons/ProductModal/useProductModal';
import classes from './productModal.css';

interface IProductModalProps {
    visible: boolean,
    onClose: any,
    product?: any,
    reloadData?: any,
    handleHideModal?: any
}

const ProductModal = (props:IProductModalProps) => {
    const { visible, onClose, product, reloadData,  handleHideModal } = props;
    const talonProps = useProductModal({ product, reloadData, handleHideModal });
    const { formik } = talonProps;

    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Add new Product</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <Input 
                            type="text" 
                            name="name"
                            placeholder="Name"
                            className={classes.input}
                            value={formik.values.name} 
                            onChange={formik.handleChange}
                        />
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

export default ProductModal;