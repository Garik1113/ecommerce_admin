import React from 'react';
import { Button, Modal, Input, Checkbox, Dropdown } from 'semantic-ui-react';
import { useAttributeModal } from 'src/talons/AttributeModal/useAttributeModal';
import classes from './attributeModal.css';
import { SketchPicker } from 'react-color';

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
        handleDeleteValue,
        typeDropDownOptions
    } = talonProps;
console.log(formik.errors)
    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>{attribute._id ? "Փոփոխել"  : "Ավելացնել նորը"}</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.field}>
                            <div>
                                Անուն
                            </div>
                            <Input 
                                type="text" 
                                name="name"
                                placeholder="Անուն"
                                className={classes.input}
                                value={formik.values.name} 
                                onChange={formik.handleChange}
                            />
                            { formik.errors.name
                                ?   <div className={classes.errorMessage}>{formik.errors.name}</div>
                                :   null
                            }
                        </div>
                        
                        <div className={classes.field}>
                            <div>
                            Ատրիբուտի կոդ
                            </div>
                            <Input 
                                type="text" 
                                name="code"
                                placeholder="Անուն"
                                className={classes.input}
                                value={formik.values.code} 
                                onChange={formik.handleChange}
                            />
                            { formik.errors.code
                                ?   <div className={classes.errorMessage}>{formik.errors.code}</div>
                                :   null
                            }
                        </div>
                        
                        <div className={classes.field}>
                            <div>
                                Տեսակ
                            </div>
                            <Dropdown
                                onChange={(e, data) => formik.setFieldValue('type', data.value)}
                                value={formik.values.type}
                                name="type"
                                selection
                                fluid
                                id="categories"
                                options={typeDropDownOptions}
                            />
                        </div>
                        <div className={classes.list}>
                            <h3>Արժեքներ</h3>
                            {
                                formik.values.values.map((option, index) => {
                                    console.log()
                                return  (
                                    <div className={classes.flex} key={index}>
                                        {
                                            formik.values.type == "colorSwatch"
                                            ?   <div className={classes.colorPicker}>
                                                    <div style={{
                                                            width: "40px", 
                                                            height:"40px", 
                                                            background: option.name}
                                                        }
                                                    ></div>
                                                    <SketchPicker
                                                        className={classes.picker}
                                                        color={option.name}
                                                        onChange={(e, d) => formik.setFieldValue(`values[${index}].name`, e.hex)}
                                                    />
                                                </div>
                                            :   <Input 
                                                    className={classes.input}
                                                    value={option.name}
                                                    name={`values[${index}].name`}
                                                    onChange={formik.handleChange}
                                                />
                                        }
                                        <Button icon="delete" type="button" onClick={() => handleDeleteValue(index)}/>
                                    </div>
                                )
                            })
                            }
                            {   
                                formik.errors.values
                                ?   <div className={classes.errorMessage}>{formik.errors.values}</div> 
                                :   null
                            }
                        </div>
                        <div className={classes.field}>
                            <Button 
                                primary
                                type="button"
                                onClick={() => formik.setFieldValue('values', [...formik.values.values, {name: ""}])}
                            >
                                Ավելացնել նորը
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

export default AttributeModal;