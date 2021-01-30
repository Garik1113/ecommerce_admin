import { useFormik } from 'formik';
import React from 'react';
import { Button, Checkbox, Input, Modal } from 'semantic-ui-react';
import { useCategoryModal } from 'src/talons/CategoryModal/useCategoryModal';
import classes from './categoryModal.css';

interface ICatoryModalProps {
    visible: boolean,
    onClose: any,
    category?: any,
    reloadData?: any,
    handleHideModal?: any
}

const CategoryModal = (props:ICatoryModalProps) => {
    const { visible, onClose, category, reloadData,  handleHideModal} = props;
    const talonProps = useCategoryModal({ category, reloadData, handleHideModal });
    const { formik } = talonProps;

    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Add new Category</h1>
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
                        <Checkbox
                            checked={formik.values.include_in_menu || false}
                            type="checkbox"
                            id="include_in_menu"
                            name="include_in_menu"
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

export default CategoryModal;