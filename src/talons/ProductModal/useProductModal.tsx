import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { uploadImage } from "src/helpers/uploadImage";
import { Attribute, } from "src/helpers/validateAttribute";
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useProductModal = (props) => {
    const { product = {}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showAddNewAttribute, setShowAddNewAttribute] = useState(false);
    const [activeValueId, setActiveValueId] = useState(null);
    const [activeAttributeId, setActiveAttributeId] = useState(null);
    const [attributeError, setAttributeError]= useState("");
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [values, setVariant] = useState([]);
    const fetchCategories = useCallback(async() => {
        const response: AxiosResponse = await axiosClient('GET', '/api/categories/admin/');
        const { data } = response;
        if (data.categories) {
            setCategories(data.categories)
        }
    }, [axiosClient, setCategories]);
    const fetchAttributes = useCallback(async() => {
        const response: AxiosResponse = await axiosClient('GET', 'api/attributes/admin/attributes/');
        const { data } = response;
        if (data.attributes) {
            setAttributes(data.attributes)
        }
    }, [axiosClient, setAttributes]);

    useEffect(() => {
        fetchCategories();
        fetchAttributes();
    }, [])
    
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

    const initialValues = useMemo(() => (
        product._id
        ?
        {
            name: product.name,
            pageTitle: product.pageTitle,
            description: product.description,
            metaDescription: product.metaDescription,
            price: product.price,
            discount: product.discount,
            discountedPrice: product.discountedPrice,
            categories: product.categories,
            images: product.images,
            quantity: product.quantity,
            variants: product.variants,
            attributes: product.attributes || [],
            configurableAttributes: [],
            attributeValues: []
        }
        : 
        {
            name: "",
            pageTitle: "",
            description: "",
            metaDescription: "",
            price: "",
            discountedPrice: "",
            discount: "",
            categories: [],
            images: [],
            quantity: 0,
            variants: [],
            attributes: [],
            configurableAttributes: [],
            attributeValues: []
        }
    ), [product]);
    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            console.log("VALUESSSSS", values);
            return
            let requestData;
            if (product._id) {
                requestData = {
                    ...product,
                    name: values.name,
                    pageTitle: values.pageTitle,
                    description: values.description,
                    metaDescription: values.metaDescription,
                    price: values.price,
                    discount: values.discount,
                    descountedPrice: values.discount ? values.price - (values.price * values.discount) / 100 : 0,
                    categories: values.categories,
                    images: values.images,
                    quantity: values.quantity
                }
            } else {
                requestData = {
                    name: values.name,
                    pageTitle: values.pageTitle,
                    description: values.description,
                    metaDescription: values.metaDescription,
                    price: values.price,
                    discount: values.discount,
                    discountedPrice: values.discount ? values.price - (values.price * values.discount) / 100 : 0,
                    categories: values.categories,
                    images: values.images,
                    quantity: values.quantity
                }
            };
            const method = product._id ? "PUT" : "POST";
            const url = product._id ? `api/products/admin/update/${product._id}` : `api/products/admin`;
            await axiosClient(method, url, requestData);
        },
        enableReinitialize: true
    });

    const handleOnDrop = useCallback( async(files: File[]) => {
        const afterUpload = (file: File, fileName: string) => {
            const preview = URL.createObjectURL(file);
            const newImagePreviews = [...imagePreviews, preview];
            const newImages = [...formik.values.images, fileName]
            formik.setFieldValue('images', newImages);
            setImagePreviews(newImagePreviews);
        };
        await uploadImage(
            axiosClient, 
            'api/products/admin/upload_image',
            files,
            afterUpload
        );
    }, [imagePreviews, setImagePreviews, formik]);
    const handleOnDropValueImage = useCallback( async(files: File[]) => {
        const afterUpload = (file: File, fileName: string) => {
            const images = formik.getFieldProps(`attributes[${activeAttributeId}].values[${activeValueId}].images`);
            
            const newImages = [...images.value, fileName];
            formik.setFieldValue(`attributes[${activeAttributeId}].values[${activeValueId}].images`, newImages);
        };
        await uploadImage(
            axiosClient, 
            'api/products/admin/upload_image',
            files,
            afterUpload
        );
    }, [activeAttributeId, setActiveAttributeId, uploadImage, formik, activeValueId, setActiveValueId]);

    const handleDeleteValue = useCallback((attributeIndex: number, valueIndex: number) => {
        // const attributes: Attribute[] = formik.values.attributes;
        // const values = formik.getFieldProps(`attributes[${attributeIndex}].values`).value;
        // const newValues = values.filter(val => values.indexOf(val) !== valueIndex);
        // formik.setFieldValue(`attributes[${attributeIndex}].values`, newValues);
    }, [formik])

    const handleAddNewAttribute = useCallback((data:any) => {
        // const configurableAttributes = formik.getFieldProps("configurableAttributes").value;
        // formik.setFieldValue('configurableAttributes')
    }, [formik]);

    const handleDeleteImageOfValue = useCallback((attributeIndex, valueIndex, imageIndex) => {
        const images = formik.getFieldProps(`attributes[${attributeIndex}].values[${valueIndex}].images`).value;
        const newImages = images.filter((image, index)=> index !==imageIndex);
        formik.setFieldValue(`attributes[${attributeIndex}].values[${valueIndex}].images`, newImages);
    }, [formik]);

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
        // const attributes: Attribute[] = formik.values.attributes;
        // const filteredAttributes = attributes.filter(e => attributes.indexOf(e) !== attributeIndex);
        // formik.setFieldValue("attributes", filteredAttributes)
    }, [formik]);
    
    const handleDeleteProductImage = useCallback((imageIndex: number) => {
        const images = formik.values.images;
        const newImages = images.filter((img, index) => {
            return index !== imageIndex;
        });
        formik.setFieldValue('images', newImages)
    }, [formik]);

    const categoryDropdowOptions = useMemo(() => {
        
        return categories.map((e) => {
            return {
                key: e._id,
                value: e._id,
                text: e.name
            }
        })
    }, [categories]);
    const attributeDropdowOptions = useMemo(() => {
        return attributes.map((e) => {
            return {
                key: e._id,
                value: e._id,
                text: e.name
            }
        })
    }, [attributes]);

    const increamentVariant = useCallback((attributeId, valueId) => {
        const seletedAttribute = attributes.find(a => a._id == attributeId);
        const selectedValue = seletedAttribute.values.find(v => v._id == valueId);
        const variants = formik.getFieldProps("variants").value;
        const variant = {
            price: 0,
            quantity: 0,
            discount: 0,
            discountedPrice: 0,
            image: "",
            options: [
                {
                    attribute: seletedAttribute,
                    value: selectedValue
                }
            ]
        };
        formik.setFieldValue("variants", [...variants, variant])
    }, [formik])

    const handleAddNewVariant = useCallback((attributeId, valueIds)  => {
        const seletedAttribute = attributes.find(a => a._id == attributeId);
        formik.setFieldValue("attributeValues", valueIds);
        const variants = formik.getFieldProps("variants").value || [];
        if(!variants.length) {
            for (let index = 0; index < valueIds.length; index++) {
                const valueId = valueIds[index]
                increamentVariant(attributeId, valueId)
            }
        } else {
            
        }
        // for (let index = 0; index < valueIds.length; index++) {
        //     const valueId = valueIds[index];
        //     const selectedValue = seletedAttribute.values.find(v => v._id == valueId);
        //      else {
        //         for (let index = 0; index < variants.length; index++) {
        //             const variant = variants[index];
        //             let attributeDontExistInOptions = true;
                    
        //             const { options } = variant;
        //             for (let index = 0; index < options.length; index++) {
        //                 const option = options[index];
        //                 if(option.attribute._id == attributeId) {
        //                     attributeDontExistInOptions = false
        //                     break;
        //                 }
        //             }
        //             if(attributeDontExistInOptions) {
        //                 const newOption = {
        //                     attribute: seletedAttribute,
        //                     value: selectedValue
        //                 };
        //                 variant.options = [...options, newOption]
        //             } else {
        //                 mustAddNewVariant = true
        //             }
        //         }
        //     }
        //     if(mustAddNewVariant) {
        //         const variant = {
        //             price: 0,
        //             quantity: 0,
        //             discount: 0,
        //             discountedPrice: 0,
        //             image: "",
        //             options: [
        //                 {
        //                     attribute: seletedAttribute,
        //                     value: selectedValue
        //                 }
        //             ]
        //         };
        //         newVariants = [...variants, variant];
        //     }
        //     formik.setFieldValue("variants", newVariants)
        // }
        // const newVariants = variants.map(v => {
        //     const { options } = v;
        //     options.map(o => {
        //         if(o.attribute._id == attributeId) {
        //             attributeExist = true;
        //             return;
        //         }
        //     });
        //     if(!attributeExist) {
        //         v.options = [...v.options, { attribute: seletedAttribute, value: selectedValue } ]
        //     }
        //     return v;
        // });
        // if(attributeExist || !variants.length) {
        //     const variant = {
        //         price: 0,
        //         quantity: 0,
        //         discount: 0,
        //         discountedPrice: 0,
        //         image: "",
        //         options: [
        //             {
        //                 attribute: seletedAttribute,
        //                 value: selectedValue
        //             }
        //         ]
        //     };
        //     formik.setFieldValue("variants", [...variants, variant]);
        // } else {
        //     formik.setFieldValue("variants", newVariants)
        // }
    }, [formik]);

    const handleChangeDiscount = useCallback((data: any) => {
        const price = formik.getFieldProps("price").value || 0;
        const discount = data.value;
        formik.setFieldValue('discount', discount);
        const discountedPrice = price - ((price * discount) / 100);
        formik.setFieldValue('discountedPrice', discountedPrice);
    }, [formik]);

    return {
        formik,
        handleShowAddNewAttribute,
        handleAddNewValue,
        handleOnDrop,
        handleOnDropValueImage,
        setActiveValueId,
        handleAddNewAttribute,
        attributeError,
        handleDeleteAttribute,
        handleDeleteValue,
        setActiveAttributeId,
        handleDeleteImageOfValue,
        handleDeleteProductImage,
        categoryDropdowOptions,
        attributeDropdowOptions,
        handleAddNewVariant,
        handleChangeDiscount,
        attributes
    }
}