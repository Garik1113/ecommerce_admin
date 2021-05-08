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
        handleOnDrop,
        handleAddNewConfigurableAttribute,
        handleChangeAttributes,
        handleDeleteProductImage,
        categoryDropdowOptions,
        attributeDropdowOptions,
        handleChangeDiscount,
        attributes,
        getSelectedValue,
        message,
        baseCurrencyOptions
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
                                <h4>Description</h4>
                            </div>
                            <div className={classes.wysiwyg}>
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
                                <h4>Price</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="number" 
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
                                    type="number" 
                                    name="discountedPrice"
                                    placeholder="Discounted Price"
                                    className={classes.input}
                                    value={formik.values.discountedPrice} 
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
                                onChange={(e, data) => handleChangeAttributes(data.value)}
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
                            attributes.map((e, i) => {
                                if (formik.values.attributes.includes(e._id)) {
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
                                            name="configurableAttributes"
                                            value={getSelectedValue(e._id)}
                                            options={options}
                                            fluid
                                            selection
                                            onChange={(l, data) => handleAddNewConfigurableAttribute(e, values.find(v => v._id == data.value))}
                                        />
                                    )
                                }
                            })
                        }
                        <div className={classes.fieldTitle}>
                            Base Currency
                        </div>
                        <Dropdown
                            onChange={(e, data) => {}}
                            value={baseCurrencyOptions[0].value}
                            name="baseCurrency"
                            selection
                            fluid
                            id="baseCurrency"
                            options={baseCurrencyOptions}
                        />
                        <div className={classes.media}>
                            <h3>Media</h3>
                            <ImageUploader handleOnDrop={handleOnDrop} />
                            {
                                formik.values.images 
                                ?   formik.values.images.map((image, index) => {
                                        return  <Image
                                                    key={index}
                                                    folder="product"
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
                    {
                        message
                        ?   <div className={classes.message}>{message}</div>
                        :   null
                    }
                    <Button primary type="submit"onClick={() => formik.handleSubmit()}>Save</Button>
                    <Button secondary onClick={()=> onClose()}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default ProductModal;