import React from 'react';
import { Button, Modal, Input, Checkbox } from 'semantic-ui-react';
import { useAttributeModal } from 'src/talons/AttributeModal/useAttributeModal';
import classes from './attributeModal.css';

interface IProps {
    visible: boolean,
    onClose: any,
    attribute?: any,
    reloadData?: any,
    handleHideModal?: any
}

const AttributeModal = (props:IProps) => {
    const { visible, onClose, attribute, reloadData,  handleHideModal} = props;
    const talonProps = useAttributeModal({ attribute, reloadData, handleHideModal });
    const { 
        formik,
        handleDeleteValue
    } = talonProps;
    console.log(formik.values)
    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Add new Attribute</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.field}>
                            <Input 
                                type="text" 
                                name="name"
                                placeholder="Name"
                                className={classes.input}
                                value={formik.values.name} 
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={classes.field}>
                            <Input 
                                type="text" 
                                name="type"
                                placeholder="Type"
                                className={classes.input}
                                value={formik.values.type} 
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={classes.list}>
                            <h3>Attribute Values</h3>
                            {formik.values.values.map((option, index) => (
                                <div className={classes.flex} key={index}>
                                    <Input 
                                        className={classes.input}
                                        value={option.name}
                                        name={`values[${index}].name`}
                                        onChange={formik.handleChange}
                                    />
                                    <Button icon="delete" type="button" onClick={() => handleDeleteValue(index)}/>
                                </div>
                            ))}
                        </div>
                        <div className={classes.field}>
                            <Button 
                                primary
                                type="button"
                                onClick={() => formik.setFieldValue('values', [...formik.values.values, {name: ""}])}
                            >
                                add new value
                            </Button>
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

export default AttributeModal;