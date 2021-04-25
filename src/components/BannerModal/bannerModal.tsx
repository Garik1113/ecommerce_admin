import Image from 'components/Image/image';
import ImageUploader from 'components/ImageUploader';
import Wysiwyg from 'components/Wysiwyg/wysiwyg';
import React from 'react';
import { Button, Radio, Modal } from 'semantic-ui-react';
import { handleImageError } from 'src/helpers/handleImageError';
import { useBannerModal } from 'src/talons/BannerModal/useBannerModal';
import classes from './bannerModal.css';

interface IBannerModalProps {
    visible: boolean,
    onClose: any,
    banner?: any,
    reloadData?: any,
    handleHideModal?: any
}

const BannerModal = (props:IBannerModalProps) => {
    const { visible, onClose, banner, reloadData,  handleHideModal} = props;
    const talonProps = useBannerModal({ banner, reloadData, handleHideModal });
    const { 
        formik, 
        handleOnDrop, 
        handleDeleteBannerImage,
        contentPositions
    } = talonProps;
    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Add new Banner</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.media}>
                            <div className={classes.title}>
                                <h3>Media</h3>
                            </div>
                            <ImageUploader handleOnDrop={handleOnDrop} />
                            {
                                formik.values.image 
                                ?   <Image
                                        folder="banner"
                                        imageName={formik.values.image}
                                        onDelete={handleDeleteBannerImage}
                                    />
                                :   null
                            }   
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h3>Content</h3>
                            </div>
                            <Wysiwyg
                                value={formik.values.content}
                                onChange={(value) => formik.setFieldValue("content", value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h3>Content Position</h3>
                            </div>
                            <div className={classes.radioFields}>
                                {
                                    contentPositions.map((position, index) => {
                                        return  <Radio
                                                    key={index}
                                                    id={index}
                                                    label={position}
                                                    name='contentPosition'
                                                    value={position}
                                                    checked={formik.values.contentPosition===position}
                                                    onChange={formik.handleChange}
                                                />
                                    })
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

export default BannerModal;