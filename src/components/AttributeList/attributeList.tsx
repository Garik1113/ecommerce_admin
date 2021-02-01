import ImageUploader from 'components/ImageUploader';
import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { Attribute } from 'src/helpers/validateAttribute';
import classes from './attributeList.css';

interface AttributeProps {
    attributes: Attribute[],
    formik: any,
    handleChangeAttributeLabel: any,
    handleChangeValueLabel: any,
    handleDeleteAttribute: any,
    handleDeleteValue: any
}

const AttributeList = (props: AttributeProps) => {
    const { 
        attributes,
        formik,
        handleChangeAttributeLabel,
        handleChangeValueLabel,
        handleDeleteAttribute,
        handleDeleteValue
    } = props;
    return (
        <div className={classes.root}>
            {
                attributes.map((attribute, index) => {
                    return (
                        <div className={classes.attribute} key={index}>
                            <div className={classes.closeIcon}>
                                <Button 
                                    icon="close" 
                                    onClick={() => handleDeleteAttribute(attribute.id)}
                                    type="button"
                                />
                            </div>
                            <div>
                                <div className={classes.attributeField}>
                                    <Input
                                        type="text"
                                        className={classes.attributeInput}
                                        name={formik.values.attributes[index].id}
                                        value={formik.values.attributes[index].label}
                                        onChange={(e, data) => handleChangeAttributeLabel(data.value, attribute.id)}
                                    /> 
                                </div>
                                {
                                    attribute.values.map((value, index) => {
                                        return (
                                            <div key={index} className={classes.value}>
                                                <div className={classes.grid}>
                                                    <Input
                                                        className={classes.input}
                                                        name={formik.values.attributes[index].values[index].label}
                                                        value={formik.values.attributes[index].values[index].label}
                                                        onChange={(e, data) => handleChangeValueLabel(data.value, attribute.id, value.id)}
                                                    
                                                    />
                                                    <div className={classes.valueCloseIcon}>
                                                        <Button 
                                                            icon="close" 
                                                            onClick={() => handleDeleteValue(value.id, attribute.id)}
                                                            type="button"
                                                        />
                                                    </div> 
                                                </div>
                                                <div className={classes.imageField}>
                                                    {
                                                        value.images.map((e, i) => {
                                                            return <img 
                                                                        src={e} 
                                                                        key={i}
                                                                        className={classes.image}
                                                                    />
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        ) 
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
        
    )
}


export default AttributeList;