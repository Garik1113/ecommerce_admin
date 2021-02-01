import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { uploadImage } from "src/helpers/uploadImage";
import { Attribute, validateAttribute } from "src/helpers/validateAttribute";
import { useAxiosClient } from "../Axios/useAxiosClient";


export const useProductModal = (props) => {
    const { product = {}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showAddNewAttribute, setShowAddNewAttribute] = useState(false);
    const [activeValueId, setActiveValueId] = useState(null);
    const [activeAttributeId, setActiveAttributeId] = useState(null);
    const [attributeError, setAttributeError]=useState("");
    const [attribute, setNewAttribute] = useState(
        {
            label: "",
            id: 1,
            values: [
                {
                    id: 1,
                    label: "",
                    images: []
                }
            ]
        }    
    )

    const handleShowAddNewAttribute = useCallback(() => {
        setShowAddNewAttribute(!showAddNewAttribute);
    }, [setShowAddNewAttribute, showAddNewAttribute, setNewAttribute, attribute]);
    const handleHideAddNewAttribute = useCallback(() => {
        setShowAddNewAttribute(false)
    }, [setShowAddNewAttribute, showAddNewAttribute])
    const initialValues = useMemo(() => (
        product._id
        ?
        {
            name: product.name,
            pageTitle: product.pageTitle,
            metaDescription: product.metaDescription,
            priceValue: product.price.value,
            priceCurrency: product.price.currency,
            discountType: product.discount.type,
            discountValue: product.discount.value,
            categories: product.categories,
            attributes: product.attributes,
            images: product.images
        }
        : 
        {
            name: "",
            pageTitle: "",
            metaDescription: "",
            priceValue: "",
            priceCurrency: "",
            discountType: "",
            discountValue: "",
            categories: [],
            attributes: [],
            images: []
        }
    ), [product]);
    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            let requestData;
            if (product._id) {
                requestData = {
                    ...product,
                    name: values.name,
                    pageTitle: values.pageTitle,
                    metaDescription: values.metaDescription,
                    price: {
                        currency: values.priceCurrency,
                        value: values.priceValue
                    },
                    discount: {
                        type: values.discountType,
                        value: values.discountValue
                    },
                    categories: values.categories,
                    attributes: values.attributes,
                    images: values.images
                }
            } else {
                requestData = {
                    name: values.name,
                    pageTitle: values.pageTitle,
                    metaDescription: values.metaDescription,
                    price: {
                        currency: values.priceCurrency,
                        value: values.priceValue
                    },
                    discount: {
                        type: values.discountType,
                        value: values.discountValue
                    },
                    categories: values.categories,
                    attributes: values.attributes,
                    images: values.images
                }
            };
            const method = product._id ? "PUT" : "POST";
            const url = product._id ? `api/products/admin/update/${product._id}` : `api/products/admin`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData();
        },
        enableReinitialize: true
    });

    const handleOnDrop = useCallback( async(files: File[]) => {
        const afterUpload = (file: File) => {
            const preview = URL.createObjectURL(file);
            const newImagePreviews = [...imagePreviews, preview];
            const newImages = [...formik.values.images, file.name + new Date().getTime()]
            formik.setFieldValue('images', newImages);
            setImagePreviews(newImagePreviews);
        };
        await uploadImage(
            axiosClient, 
            'api/products/admin/upload_product_image',
            files,
            afterUpload
        );
    }, [imagePreviews, setImagePreviews, formik]);
    const handleOnDropValueImage = useCallback( async(files: File[]) => {
        const afterUpload = (file: File) => {
            const images = formik.getFieldProps(`attributes[${activeAttributeId}].values[${activeValueId}].images`);
            const newImages = [...images.value, file.name + new Date().getTime()];
            formik.setFieldValue(`attributes[${activeAttributeId}].values[${activeValueId}].images`, newImages);
        };
        await uploadImage(
            axiosClient, 
            'api/products/admin/values/upload_product_image',
            files,
            afterUpload
        );
    }, [activeAttributeId, setActiveAttributeId, uploadImage, formik, activeValueId, setActiveValueId]);

    const handleChangeValueLabel = useCallback((text: string, attributeId?: number, valueId?: number) => {
        if(attributeId && valueId) {
            const formikAttributes: Attribute[] = formik.values.attributes;
            
            const selectedAttribute = formikAttributes.find(e => e.id == attributeId);
            const { values } = selectedAttribute;
            const currentValue = values.find(e => e.id == valueId);
            console.log(activeValueId, values);
            currentValue.label = text;
            const filtedValues = values.filter(e => e.id !== valueId);
            const newValues = [...filtedValues, currentValue];
            selectedAttribute.values = newValues;
            const filteredAttributes:Attribute[] = formikAttributes.filter(e => e.id !== attributeId);
            const newAttributes = [...filteredAttributes, selectedAttribute];
            formik.setFieldValue("attributes", newAttributes);
        } else {
            const { values } = attribute;
            const currentValue = values.find(e => e.id == activeValueId);
            const filtedValues = values.filter(e => e.id !== activeValueId);
            const newValue = {...currentValue, label: text};
            setNewAttribute({...attribute, values: [...filtedValues, newValue]});
        }
        
    }, [attribute, setNewAttribute, activeValueId, formik])

    const handleChangeAttributeLabel = useCallback((text: string, attributeId?: number) => {
        if (attributeId) {
            const formikAttributes: Attribute[] = formik.values.attributes;
            const selectedAttribute = formikAttributes.find(e => e.id == attributeId);
            selectedAttribute.label = text;
            const filtedValues = formikAttributes.filter(e => e.id !== attributeId);
            const newAttributes = [...filtedValues, selectedAttribute]
            formik.setFieldValue("attributes", newAttributes);
        } else {
            const newAttribute = {...attribute, label: text};
            setNewAttribute(newAttribute);
        }
        
    }, [attribute, setNewAttribute, activeValueId, formik]);

    const handleDeleteValue = useCallback((attributeIndex: number, valueIndex: number) => {
        const attributes: Attribute[] = formik.values.attributes;
        const values = formik.getFieldProps(`attributes[${attributeIndex}].values`).value;
        const newValues = values.filter(val => values.indexOf(val) !== valueIndex);
        formik.setFieldValue(`attributes[${attributeIndex}].values`, newValues);
        // console.log(formik.values.attributes)
    }, [formik])

    const handleAddNewAttribute = useCallback(() => {
        const attributes: Attribute[] = formik.values.attributes;
        const newAttribute = {
            id: attributes.length+1,
            label: "",
            values: [
                {
                    id: attributes.length+1,
                    label: "",
                    images: []
                }
            ]
        }
        formik.setFieldValue('attributes', [...attributes, newAttribute])
    }, [formik]);

    const handleDeleteImageOfValue = useCallback((attributeIndex, valueIndex, imageIndex) => {
        console.log(formik.values.attributes)
        // const attributes: Attribute[] = formik.values.attributes;
        const images = formik.getFieldProps(`attributes[${attributeIndex}].values[${valueIndex}].images`).value;
        const newImages = images.filter(image => images.indexOf(image) !==imageIndex);
        formik.setFieldValue(`attributes[${attributeIndex}].values[${valueIndex}].images`, newImages)
        console.log(formik.values.attributes)
    }, [formik])

    const handleAddNewValue = useCallback((attributeIndex) => {
        const values = formik.getFieldProps(`attributes[${attributeIndex}].values`).value;
        const newValues = [...values, {
            id: values.length + 1,
            label: "",
            images: []
        }]
        formik.setFieldValue(`attributes[${attributeIndex}].values`, newValues)
    }, [formik])

    const handleDeleteAttribute = useCallback((attributeIndex: number) => {
        const attributes: Attribute[] = formik.values.attributes;
        const filteredAttributes = attributes.filter(e => attributes.indexOf(e) !== attributeIndex);
        formik.setFieldValue("attributes", filteredAttributes)
    }, [formik]);
    
    const handleDeleteProductImage = useCallback((imageIndex: number) => {
        const images = formik.values.images;
        const newImages = images.filter(img => images.indexOf(img) !== imageIndex);
        formik.setFieldValue('images', newImages)
    }, [formik])
    return {
        formik,
        imagePreviews,
        handleShowAddNewAttribute,
        handleHideAddNewAttribute,
        showAddNewAttribute,
        attribute,
        handleAddNewValue,
        handleOnDrop,
        handleOnDropValueImage,
        setActiveValueId,
        handleChangeValueLabel,
        handleChangeAttributeLabel,
        handleAddNewAttribute,
        attributeError,
        handleDeleteAttribute,
        handleDeleteValue,
        setActiveAttributeId,
        handleDeleteImageOfValue,
        handleDeleteProductImage
    }
}