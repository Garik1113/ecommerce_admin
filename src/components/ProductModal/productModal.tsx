import React, { useCallback } from 'react';
import { Button, Dropdown, Input, Modal, TextArea } from 'semantic-ui-react';
import { useProductModal } from 'src/talons/ProductModal/useProductModal';
import classes from './productModal.css';
import ImageUploader from 'components/ImageUploader';
import Image from '../Image';
import Wysiwyg from 'components/Wysiwyg/wysiwyg';

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
        handleDeleteProductImage,
        categoryDropdowOptions,
        attributeDropdowOptions,
        handleAddNewVariant,
        handleChangeDiscount,
        attributes
    } = talonProps;
    const getAttributeAndValueById = useCallback((id) => {
        let value = null;
        attributes.map(attr => {
            const valueIds = attr.values.map(v => v._id);
            if (valueIds.includes(id)) {
                value = attr.values.find(v => v._id == id);
                value = { 
                    attributeId: attr._id,
                    value
                };
            }
        });
        return value

    }, [formik, attributes])
    console.log(formik.values.variants)
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
                                    name="price"
                                    placeholder="Price"
                                    className={classes.input}
                                    value={formik.values.price} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Description</h4>
                            </div>
                            <div className={classes.flex}>
                                <Wysiwyg
                                    value={formik.values.description}
                                    onChange={(value) => formik.setFieldValue("description", value)}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Quantity</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="number" 
                                    name="quantity"
                                    placeholder="Quantity"
                                    className={classes.input}
                                    value={formik.values.quantity} 
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
                                    type="number" 
                                    name="discount"
                                    placeholder="Discount"
                                    className={classes.input}
                                    value={formik.values.discount}
                                    onChange={(e, data) => handleChangeDiscount(data)}
                                />
                                <Input 
                                    type="text" 
                                    name="discountedPrice"
                                    placeholder="Discounted Price"
                                    className={classes.input}
                                    value={formik.values.discount && formik.values.price - (formik.values.price * formik.values.discount / 100)} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Categories</h4>
                            </div>
                            <Dropdown
                                onChange={(e, data) => formik.setFieldValue('categories', data.value)}
                                value={formik.values.categories}
                                name="categories"
                                selection
                                fluid
                                id="categories"
                                options={categoryDropdowOptions}
                                multiple
                            />
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Attributes</h4>
                            </div>
                            <Dropdown
                                onChange={(e, data) => formik.setFieldValue('attributes', data.value)}
                                value={formik.values.attributes}
                                name="attributes"
                                selection
                                fluid
                                id="attributes"
                                options={attributeDropdowOptions}
                                multiple
                            />
                        </div>
                        {
                            attributes.map((e, i)=> {
                                if(formik.values.attributes.includes(e._id)) {
                                    const values = e.values;
                                    const options = values.map(val => {
                                        return {
                                            text: val.name,
                                            id: val._id,
                                            value: val._id
                                        }
                                    });
                                    return (
                                        <Dropdown
                                            key={e._id}
                                            name="attributeValues"
                                            options={options}
                                            fluid
                                            multiple
                                            selection
                                            onChange={(l,data) => handleAddNewVariant(e._id, data.value)}
                                        />
                                    )
                                }
                            })
                        }
                        {/* <div className={classes.field}>
                            <div className={classes.attributeTitle} onClick={handleShowAddNewAttribute}>
                                <h3>Attributes</h3>
                            </div>
                            {
                                formik.values.attributes.map((e, attributeIndex) => {
                                    return (
                                        <div key={attributeIndex} className={classes.attribute}>
                                            <Input
                                                value={e.label}
                                                name={`attributes[${attributeIndex}].label`}
                                                onChange={formik.handleChange}
                                                className={classes.attributeName}
                                                placeholder="Attribute Name"
                                            />
                                            {
                                                e.values.map((val, valueIndex) => {
                                                    return (
                                                        <div key={valueIndex} className={classes.value}>
                                                            <div className={classes.valueName}>
                                                                <Input
                                                                    placeholder="Value Name"
                                                                    value={val.label}
                                                                    name={`attributes[${attributeIndex}].values[${valueIndex}].label`}
                                                                    onChange={formik.handleChange}
                                                                />
                                                            </div>
                                                            
                                                            <div onClick={() => {
                                                                setActiveAttributeId(attributeIndex);
                                                                setActiveValueId(valueIndex)
                                                            }}>
                                                                <ImageUploader handleOnDrop={handleOnDropValueImage}/>
                                                            </div>
                                                            {
                                                                val.images.map((src, valueImageIndex) => {
                                                                    return (
                                                                        <Image
                                                                            key={valueImageIndex}
                                                                            s3Folder={"products"}
                                                                            imageName={typeof src == 'string' ? src : src.small_image}
                                                                            onDelete={() => handleDeleteImageOfValue(attributeIndex, valueIndex, valueImageIndex)}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                            <div className={classes.closeIcon} onClick={() => handleDeleteValue(attributeIndex, valueIndex)}>X</div>
                                                        </div>
                                                        
                                                    )
                                                })
                                            }
                                            <Button type="button" onClick={() =>handleAddNewValue(attributeIndex)}>Add new value</Button>
                                            <div className={classes.deleteIcon}>
                                                <Button icon="delete" type="button" onClick={() => handleDeleteAttribute(attributeIndex)}/>
                                            </div>
                                        </div>
                                    )
                                })
                                
                            }
                            <Button type="button" onClick={handleAddNewAttribute}>Add New Attribute</Button>
                        </div> */}
                        <div className={classes.media}>
                            <h3>Media</h3>
                            <ImageUploader handleOnDrop={handleOnDrop} />
                            {
                                formik.values.images 
                                ?   formik.values.images.map((image, index) => {
                                        return  <Image
                                                    key={index}
                                                    s3Folder="products"
                                                    imageName={typeof image == 'string' ? image : image.small_image}
                                                    onDelete={() => handleDeleteProductImage(index)}
                                                />
                                    })
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