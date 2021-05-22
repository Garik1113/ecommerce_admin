import ImageUploader from 'components/ImageUploader';
import Image from 'components/Image';
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
    const { formik, handleOnDrop } = talonProps;

    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Ավելացնել նորը</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.fields}>
                            <div className={classes.field}>
                                <div className={classes.title}>Անուն</div>
                                <Input 
                                    type="text" 
                                    name="name"
                                    placeholder="Անուն"
                                    className={classes.input}
                                    value={formik.values.name} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={classes.checkbox}>
                                <Checkbox
                                    checked={formik.values.include_in_menu || false}
                                    type="checkbox"
                                    label="Ավելացնել ցանկում"
                                    id="include_in_menu"
                                    name="include_in_menu"
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.media}>
                            <h3>Էջի Նկար</h3>
                            <ImageUploader handleOnDrop={handleOnDrop} />
                            {
                                formik.values.image
                                ?   <Image
                                        folder="category"
                                        imageName={typeof formik.values.image == 'string' ? formik.values.image : formik.values.image.small_image}
                                        onDelete={() => formik.setFieldValue('image', "")}
                                    />
                                :   null
                            }   
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

export default CategoryModal;