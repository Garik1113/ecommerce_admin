import React from 'react';
import { Button, Modal, Input, Checkbox } from 'semantic-ui-react';
import { useFilterModal } from 'src/talons/FilterModal/useFilterModal';
import classes from './filterModal.css';

interface IProps {
    visible: boolean,
    onClose: any,
    filter?: any,
    reloadData?: any,
    handleHideModal?: any
}

const FileterModal = (props:IProps) => {
    const { visible, onClose, filter, reloadData,  handleHideModal} = props;
    const talonProps = useFilterModal({ filter, reloadData, handleHideModal });
    const { 
        formik,
        handleDeleteOption
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
                    <h1>Add new Filter</h1>
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
                        <div className={classes.flex}>
                            <span>Allowed</span>
                            <Checkbox
                                checked={formik.values.allowed || false}
                                type="checkbox"
                                id="allowed"
                                name={`allowed`}
                                value={formik.values.allowed}
                                onChange={formik.handleChange}
                            /> 
                        </div>
                        <div className={classes.list}>
                            <h3>Filter Options</h3>
                            {formik.values.options.map((option, index) => (
                                <div className={classes.flex}>
                                    <Input 
                                        className={classes.input}
                                        value={option.name}
                                        name={`options[${index}].name`}
                                        onChange={formik.handleChange}
                                    />
                                    <Button icon="delete" type="button" onClick={() => handleDeleteOption(index)}/>
                                </div>
                            ))}
                        </div>
                        <div className={classes.field}>
                            <Button 
                                primary
                                type="button"
                                onClick={() => formik.setFieldValue('options', [...formik.values.options, {name: "", allowed: false}])}
                            >
                                add new option
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

export default FileterModal;