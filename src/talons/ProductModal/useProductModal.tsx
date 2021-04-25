import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { uploadImage } from "src/helpers/uploadImage";
import { useAxiosClient } from "../Axios/useAxiosClient";


export const useProductModal = (props) => {
    const { product = {}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
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

    const initialValues = useMemo(() => (
        product._id
        ?
        {
            name: product.name,
            pageTitle: product.pageTitle,
            categories: product.categories,
            description: product.description,
            metaDescription: product.metaDescription,
            price: product.price,
            discount: product.discount,
            discountedPrice: product.discountedPrice,
            quantity: product.quantity,
            images: product.images,
            attributes: product.configurableAttributes.map(a => a.attribute._id),
            configurableAttributes: product.configurableAttributes
        }
        : 
        {
            name: "",
            pageTitle: "",
            categories: [],
            description: "",
            metaDescription: "",
            price: "",
            discountedPrice: "",
            discount: "",
            quantity: 0,
            images: [],
            attributes: [],
            configurableAttributes: [],
        }
    ), [product]);
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            let variables = {
                name: values.name,
                pageTitle: values.pageTitle,
                categories: values.categories,
                description: values.description,
                metaDescription: values.metaDescription,
                price: values.price,
                discount: values.discount,
                discountedPrice: values.discountedPrice,
                images: values.images,
                quantity: values.quantity,
                configurableAttributes: values.configurableAttributes
            }
            if (product._id) {
                variables = {
                    ...product,
                    ...variables
                }
            } 
            const method = product._id ? "PUT" : "POST";
            const url = product._id ? `api/products/admin/update/${product._id}` : `api/products/admin`;
            const response:AxiosResponse = await axiosClient(method, url, variables);
            const { status } = response;
            if(status == 200) {
                setMessage(`Product has been ${product._id ? "updated" : "added"}`);
            } else {
                setMessage(`Something wents wrong`);
            }
            
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

    const handleChangeAttributes = useCallback((attributes: any) => {
        formik.setFieldValue('attributes', attributes);
        const filteredConfAttrs = formik.values.configurableAttributes.filter(a => {
            return attributes.includes(a.attribute._id)
        });
        formik.setFieldValue("configurableAttributes", filteredConfAttrs);
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

    const handleAddNewConfigurableAttribute = useCallback((attribute: any, value: any) => {
        let configurableAttributes = formik.getFieldProps("configurableAttributes").value;
        const attributeId = attribute._id;
        const valueId = value._id;
        if(configurableAttributes.find(a => a.attribute._id == attributeId)) {
            configurableAttributes = configurableAttributes.map(a => {
                if(a.attribute._id == attributeId) {
                    a.selectedValue = value
                }
                return a;
            })
            formik.setFieldValue("configurableAttributes", configurableAttributes)
        } else {
            formik.setFieldValue("configurableAttributes", [...configurableAttributes, { attribute,  selectedValue:  value }]);
        }
        
    }, [formik]);

    const handleChangeDiscount = useCallback((data: any) => {
        const price = formik.getFieldProps("price").value || 0;
        const discount = Number(data.value);
        formik.setFieldValue('discount', discount);
        const discountedPrice = price - ((price * discount) / 100);
        formik.setFieldValue('discountedPrice', discountedPrice);
    }, [formik]);
    
    const getSelectedValue = useCallback((attributeId ) => {
        const value = formik.values.configurableAttributes
        .find(a => a.attribute._id == attributeId) 
        ? formik.values.configurableAttributes.find(a => a.attribute._id == attributeId).selectedValue._id 
        : null;
        return value
    }, [formik])

    return {
        formik,
        handleAddNewConfigurableAttribute,
        handleOnDrop,
        handleChangeAttributes,
        handleDeleteProductImage,
        categoryDropdowOptions,
        attributeDropdowOptions,
        handleChangeDiscount,
        attributes,
        getSelectedValue,
        message
    }
}