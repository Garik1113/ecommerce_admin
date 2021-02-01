import React from 'react';
import { Button, Input, Message, Modal, TextArea } from 'semantic-ui-react';
import { useProductModal } from 'src/talons/ProductModal/useProductModal';
import classes from './productModal.css';
import ImageUploader from 'components/ImageUploader';
import AttributeList from 'components/AttributeList';
import AttributeForm from 'components/AttributeForm';
import Image from '../Image';

interface IProductModalProps {
    visible: boolean,
    onClose: any,
    product?: any,
    reloadData?: any,
    handleHideModal?: any
}

const ProductModal = (props:IProductModalProps) => {
    const { 
        visible, 
        onClose, 
        product, 
        reloadData,  
        handleHideModal
    } = props;
    const talonProps = useProductModal({ 
        product, 
        reloadData, 
        handleHideModal
    });
    const { 
        formik, 
        imagePreviews,
        handleShowAddNewAttribute,
        handleOnDrop,
        handleOnDropValueImage,
        setActiveValueId,
        handleAddNewAttribute,
        setActiveAttributeId,
        handleDeleteImageOfValue,
        handleDeleteValue,
        handleAddNewValue,
        handleDeleteAttribute,
        handleDeleteProductImage
    } = talonProps;

    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>Add new Product</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Product Title</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="text" 
                                    name="name"
                                    placeholder="Name"
                                    className={classes.input}
                                    value={formik.values.name} 
                                    onChange={formik.handleChange}
                                />
                                <Input 
                                    type="text" 
                                    name="pageTitle"
                                    placeholder="Page title"
                                    className={classes.input}
                                    value={formik.values.pageTitle} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>SEO</h4>
                            </div>
                            <TextArea 
                                type="text" 
                                name="metaDescription"
                                placeholder="Meta Description"
                                className={classes.input}
                                value={formik.values.metaDescription} 
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Price</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="text" 
                                    name="priceValue"
                                    placeholder="Price Value"
                                    className={classes.input}
                                    value={formik.values.priceValue} 
                                    onChange={formik.handleChange}
                                />
                                <Input 
                                    type="text" 
                                    name="priceCurrency"
                                    placeholder="Price Currency"
                                    className={classes.input}
                                    value={formik.values.priceCurrency} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Discount</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="text" 
                                    name="discountType"
                                    placeholder="Discount Type"
                                    className={classes.input}
                                    value={formik.values.discountType} 
                                    onChange={formik.handleChange}
                                />
                                <Input 
                                    type="text" 
                                    name="discountValue"
                                    placeholder="Discount Value"
                                    className={classes.input}
                                    value={formik.values.discountValue} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.attributeTitle} onClick={handleShowAddNewAttribute}>
                                <h3>Attributes</h3>
                            </div>
                            {
                                formik.values.attributes.map((e, i) => {
                                    return (
                                        <div key={i} className={classes.attribute}>
                                            <Input
                                                value={e.label}
                                                name={`attributes[${i}].label`}
                                                onChange={formik.handleChange}
                                                className={classes.attributeName}
                                                placeholder="Attribute Name"
                                            />
                                            {
                                                e.values.map((val, index) => {
                                                    return (
                                                        <div key={index} className={classes.value}>
                                                            <div className={classes.valueName}>
                                                                <Input
                                                                    placeholder="Value Name"
                                                                    value={val.label}
                                                                    name={`attributes[${i}].values[${index}].label`}
                                                                    onChange={formik.handleChange}
                                                                />
                                                            </div>
                                                            
                                                            <div onClick={() => {
                                                                setActiveAttributeId(i);
                                                                setActiveValueId(index)
                                                            }}>
                                                                <ImageUploader handleOnDrop={handleOnDropValueImage}/>
                                                            </div>
                                                            {
                                                                val.images.map((src, ind) => {
                                                                    return (
                                                                        <Image
                                                                            key={ind}
                                                                            baseUrl={"https://my-ecommerce-bucket.s3-eu-west-1.amazonaws.com/products/values"}
                                                                            imageName={src}
                                                                            onDelete={() => handleDeleteImageOfValue(i, index, ind)}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                            <div className={classes.closeIcon} onClick={() => handleDeleteValue(i, index)}>X</div>
                                                        </div>
                                                        
                                                    )
                                                })
                                            }
                                            <Button type="button" onClick={() =>handleAddNewValue(i)}>Add new value</Button>
                                            <div className={classes.deleteIcon}>
                                                <Button icon="delete" type="button" onClick={() => handleDeleteAttribute(i)}/>
                                            </div>
                                        </div>
                                    )
                                })
                                
                            }
                            <Button type="button" onClick={handleAddNewAttribute}>Add New Attribute</Button>
                        </div>
                        <div className={classes.media}>
                            <h3>Media</h3>
                            <ImageUploader handleOnDrop={handleOnDrop} />
                            {
                                formik.values.images 
                                ?   formik.values.images.map((image, index) => {
                                    return <Image
                                                key={index}
                                                baseUrl="https://my-ecommerce-bucket.s3-eu-west-1.amazonaws.com/products"
                                                imageName={image}
                                                onDelete={() => handleDeleteProductImage(index)}
                                            />
                                    // return <img 
                                    //             key={index}
                                    //             src={`https://my-ecommerce-bucket.s3-eu-west-1.amazonaws.com/products/${image}`} 
                                    //             className={classes.image}
                                    //         />
                                        })
                                :   imagePreviews.length
                                    ?   <div className={classes.images}>
                                                {imagePreviews.map((preview, index) => (
                                                    <div key={index}>
                                                        <img src={preview} className={classes.image}/>
                                                    </div>
                                                ))
                                                }
                                        </div>
                                    :   null  
                            }   
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

export default ProductModal;