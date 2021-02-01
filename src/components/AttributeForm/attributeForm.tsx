import React from 'react';
import { Input } from 'semantic-ui-react';
import { useAttributeForm } from 'src/talons/AttributeForm/useAttributeForm';
import classes from './attributeForm.css';


const AttributeForm = () => {
    const { formik } = useAttributeForm();
    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
                {
                    formik.values.attributes.map((e, i) => {
                        return (
                            <div>
                                <Input
                                    key={i}
                                    value={e.label}
                                    name={e.label}
                                    onChange={formik.handleChange}
                                />
                                {
                                    e.values.map()
                                }
                            </div>
                            
                        )
                    })
                }
            </form>
        </div>

        // <div className={classes.newAttribute}>
        //     <div>
        //         <h3>New Attribute</h3>
        //     </div>
        //     <div className={classes.attributeLabel}>
        //         <Input 
        //             className={classes.input}
        //             type="text" 
        //             value={attribute.label} 
        //             placeholder="Attribute Name"
        //             onChange={(e, data) => handleChangeAttributeLabel(data.value)}
        //         />
        //     </div>
        //     {
        //         attribute.values.map((value, i) => {
        //             return (
        //                 <div key={i} onClick={() => setActiveValueId(value.id)} className={classes.valueField}>
        //                     <div className={classes.valueTitle}>
        //                         <h5>Add New Value</h5>
        //                     </div>
        //                     <Input
        //                         type="text" 
        //                         value={value.label}
        //                         onChange={(e, data) => handleChangeValueLabel(data.value)}
        //                         onClick={() => setActiveValueId(value.id)}
        //                         placeholder="Value name"
        //                         className={classes.valueInput}
        //                     />
        //                     <ImageUploader handleOnDrop={handleOnDropValueImage} />
        //                     {
        //                         value.images.map((image, index) => {
        //                             return (
        //                                 <div key={index}>
        //                                     <img
        //                                         src={`https://my-ecommerce-bucket.s3-eu-west-1.amazonaws.com/products/values/${image}`} 
        //                                         className={classes.image}
        //                                     />
        //                                 </div>
        //                             ) 
        //                         })
        //                     }
        //                     {
        //                         attributeError
        //                         ?   <Message error={true}>
        //                                 {attributeError}
        //                             </Message>
        //                         :   null
        //                     }
        //                 </div>
        //             )
        //         })
        //     }
        //     <div className={classes.actions}>
        //         <Button primary  type="button" onClick={handleAddNewValue}>Add New Value</Button>
        //         <Button primary  type="button" onClick={handleAddNewAttribute}>Save attribute</Button>
        //     </div>
        // </div>
    )
}

export default AttributeForm;