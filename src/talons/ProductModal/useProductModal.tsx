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
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            setIsSubmitting(true)
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
            if (status == 200) {
                setMessage(`Ապրանքն ${product._id ? "Փոփոխված է" : "ավելացված է"}`);
            } else {
                setMessage(`Ինչ որ բան սխալ է`);
            }
            setIsSubmitting(false)
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
        const { configurableAttributes } = formik.values;
        const newConfAttributes = attributes.map(e => {
            if (configurableAttributes.find(c => c.attribute == e)) {
                return {
                    attribute: e,
                    value: configurableAttributes.find(c => c.attribute == e).value
                }
            } else {
                return {
                    attribute: e,
                    value: null
                }
            }
        })
        formik.setFieldValue("configurableAttributes", newConfAttributes);
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

    const handleAddNewConfigurableAttribute = useCallback((attributeId: string, valueId: string) => {
        let configurableAttributes = formik.getFieldProps("configurableAttributes").value;
        const findedAttribute = configurableAttributes.find(c => c.attribute == attributeId);
        if (findedAttribute) {
            configurableAttributes = configurableAttributes.map(e => {
                if (e.attribute == attributeId) {
                    e.value = valueId
                }
                return e;
            })
            formik.setFieldValue("configurableAttributes", configurableAttributes);
        } else {
            formik.setFieldValue("configurableAttributes", [...configurableAttributes, { attribute: attributeId, value: valueId }]);
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
        ? formik.values.configurableAttributes.find(a => a.attribute._id == attributeId).value._id 
        : null;
        return value
    }, [formik]);

    const baseCurrencyOptions = useMemo(() => {
        return [
            {
                text: "AMD",
                value: "amd",
                id: "amd"
            }
        ]
    }, []);

    const handleChangePrice = useCallback((price:number) => {
        formik.setFieldValue("price", price);
        const discount = formik.values.discount;
        if (discount) {
            const discountedPrice = price - (price * Number(discount) / 100);
            formik.setFieldValue("discountedPrice", discountedPrice)
        }
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
        message,
        baseCurrencyOptions,
        handleChangePrice,
        isSubmitting
    }
}