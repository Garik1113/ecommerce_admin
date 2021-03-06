import Image from 'components/Image';
import ImageUploader from 'components/ImageUploader';
import React from 'react';
import { Button, Modal, Input, Checkbox } from 'semantic-ui-react';
import { useSliderModal } from 'src/talons/SliderModal/useSliderModal';
import classes from './sliderModal.css';

interface IProps {
    visible: boolean,
    onClose: any,
    slider?: any,
    reloadData?: any,
    handleHideModal?: any
}

const SliderModal = (props:IProps) => {
    const { visible, onClose, slider, reloadData,  handleHideModal} = props;
    const talonProps = useSliderModal({ slider, reloadData, handleHideModal });
    const { 
        formik,
        handleDeleteSlide,
        handleOnDrop,
        setActiveSlideId
    } = talonProps;
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
                        <div className={classes.field}>
                            <Input 
                                type="text" 
                                name="name"
                                placeholder="Անուն"
                                className={classes.input}
                                value={formik.values.name} 
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={classes.flex}>
                            <span>Ավելացնել գլխավոր էջում</span>
                            <Checkbox
                                checked={formik.values.includeInHomePage || false}
                                type="checkbox"
                                id="includeInHomePage"
                                name={`includeInHomePage`}
                                value={formik.values.includeInHomePage}
                                onChange={formik.handleChange}
                            /> 
                        </div>
                        <div className={classes.list}>
                            <h3>Սլայդներ</h3>
                            {formik.values.slides.map((slide, index) => {
                                return (
                                    <div className={classes.slide} key={index} onClick={() => setActiveSlideId(index)}>
                                        <ImageUploader handleOnDrop={handleOnDrop} />
                                        {
                                            slide.image 
                                            ?   <Image
                                                    folder={"slider"}
                                                    imageName={slide.image}
                                                    onDelete={() => {}}
                                                />
                                            :   null
                                        }
                                        <Button icon="delete" type="button" onClick={() => handleDeleteSlide(index)}/>
                                    </div>
                                )
                                })
                           }
                        </div>
                        <div className={classes.field}>
                            <Button 
                                primary
                                type="button"
                                onClick={() => formik.setFieldValue('slides', [...formik.values.slides, { image: "" }])}
                            >
                                նոր Սլայդ
                            </Button>
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

export default SliderModal;