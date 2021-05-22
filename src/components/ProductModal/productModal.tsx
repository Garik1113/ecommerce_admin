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
        baseCurrencyOptions,
        handleChangePrice
    } = talonProps;
    
    return (
        <div className={classes.root}>
            <Modal 
                open={visible}
                onClose={onClose}
                closeIcon
            >
                <Modal.Header>
                    <h1>{product._id ? "Փոփոխել"  : "Ավելացնել նորը"}</h1>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Անուն</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="text" 
                                    name="name"
                                    placeholder="Անուն"
                                    className={classes.input}
                                    value={formik.values.name} 
                                    onChange={formik.handleChange}
                                />
                                <Input 
                                    type="text" 
                                    name="pageTitle"
                                    placeholder="Էջի Անուն"
                                    className={classes.input}
                                    value={formik.values.pageTitle} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Նկարագրություն (SEO)</h4>
                            </div>
                            <TextArea 
                                type="text" 
                                name="metaDescription"
                                placeholder="Նկարագրություն"
                                className={classes.input}
                                value={formik.values.metaDescription} 
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Նկարագրություն</h4>
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
                                <h4>Քանակ</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="number" 
                                    name="quantity"
                                    placeholder="Քանակ"
                                    className={classes.input}
                                    value={formik.values.quantity} 
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Գին</h4>
                            </div>
                            <div className={classes.flex}>
                                <Input 
                                    type="number" 
                                    name="price"
                                    placeholder="Գին"
                                    className={classes.input}
                                    value={formik.values.price} 
                                    onChange={(e, data) => handleChangePrice(Number(data.value))}
                                />
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.flex}>
                                <div className={classes.discountedField}>
                                    <div className={classes.title}>
                                        <h4>Զեղջ</h4>
                                    </div>
                                    <Input 
                                        type="number" 
                                        name="discount"
                                        placeholder="Զեղջ"
                                        className={classes.input}
                                        value={formik.values.discount}
                                        onChange={(e, data) => handleChangeDiscount(data)}
                                    />
                                </div>
                                <div className={classes.discountedFieldRight}>
                                    <div className={classes.title}>
                                        <h4>Զեղջված գին</h4>
                                    </div>
                                    <Input 
                                        type="number" 
                                        name="discountedPrice"
                                        placeholder="Զեղջված գին"
                                        className={classes.input}
                                        value={formik.values.discountedPrice} 
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.field}>
                            <div className={classes.title}>
                                <h4>Կատեգորիաներ</h4>
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
                                <h4>Ատրիբուտներ</h4>
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
                                    if (e.type && e.type.includes("color")) {
                                        return (
                                            <div>
                                                <div className={classes.currencyfieldTitle}>{e.name}</div>
                                                <div className={classes.colorList}>
                                                    {
                                                        values.map(((v, y )=> {
                                                            let isSelected = false
                                                            const currentAttr = formik.values.configurableAttributes.find(l => l.attribute._id == e._id);
                                                            if(currentAttr) {
                                                                const selectedVal = currentAttr.selectedValue;
                                                                if (selectedVal) {
                                                                    isSelected = selectedVal.name == v.name
                                                                }
                                                            }
                                                            return (
                                                                <div 
                                                                    key={y} 
                                                                    className={classes.swatch}
                                                                    style={{
                                                                        border: isSelected ? "2px solid red" : null
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                                width: "40px", 
                                                                                height: "40px",
                                                                                borderRadius: "50%",
                                                                                background: v.name, 
                                                                                cursor: "pointer",
                                                                            }}
                                                                        onClick={() => handleAddNewConfigurableAttribute(e, values.find(va => va.name == v.name))}
                                                                    ></div>
                                                                </div>
                                                                
                                                            )
                                                        }))
                                                    }   
                                                </div>
                                            </div>
                                            
                                        )
                                    } else {
                                        return (
                                            <div>
                                                <div className={classes.currencyfieldTitle}>{e.name}</div>
                                                <Dropdown
                                                    key={e._id}
                                                    name="configurableAttributes"
                                                    value={getSelectedValue(e._id)}
                                                    options={options}
                                                    fluid
                                                    selection
                                                    onChange={(l, data) => handleAddNewConfigurableAttribute(e, values.find(v => v._id == data.value))}
                                                />
                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                        <div className={classes.currencyfieldTitle}>
                            Արժույթ
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
                            <h3>Նկարներ</h3>
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
                    <Button primary type="submit"onClick={() => formik.handleSubmit()}>Պահպանել</Button>
                    <Button secondary onClick={()=> onClose()}>Չեղարկել</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default ProductModal;