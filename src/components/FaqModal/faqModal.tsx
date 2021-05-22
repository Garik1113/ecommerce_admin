import React from 'react';
import { Button, Modal, Input, TextArea } from 'semantic-ui-react';
import { useFaqModal } from 'src/talons/FaqModal/useFaqModal';
import classes from './faqModal.css';

interface IFaqModalProps {
    visible: boolean,
    onClose: any,
    faq?: any,
    reloadData?: any,
    handleHideModal?: any
}

const FaqModal = (props:IFaqModalProps) => {
    const { visible, onClose, faq, reloadData,  handleHideModal} = props;
    const talonProps = useFaqModal({ faq, reloadData, handleHideModal });
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
                    <h1>Հաճախ տրվող հարցեր</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.field}>
                            <h3>Հարց</h3>
                            <TextArea 
                                type="text" 
                                name="question"
                                placeholder="Հարց"
                                className={classes.input}
                                value={formik.values.question} 
                                onChange={formik.handleChange}
                                rows={8}
                            />
                        </div>
                        <div className={classes.field}>
                            <h3>Պատասխան</h3>
                            <TextArea 
                                type="text" 
                                name="answer"
                                placeholder="Պատասխան"
                                className={classes.input}
                                value={formik.values.answer} 
                                onChange={formik.handleChange}
                                rows={8}
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

export default FaqModal;