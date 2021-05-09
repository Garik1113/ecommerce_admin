import { useFormik } from "formik";
import { useCallback } from "react";
import { uploadImage } from "src/helpers/uploadImage";
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useCategoryModal = (props) => {
    const { category={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: category._id ? {...category, image: category.image || ""} : {
            name: "",
            image: "",
            include_in_menu: false,
        },
        onSubmit: async (values) => {
            let requestData;
            if (category._id) {
                requestData = {
                    ...category,
                    name: values.name,
                    image: values.image,
                    include_in_menu: values.include_in_menu
                }
            } else {
                requestData = {
                    name: values.name,
                    image: values.image,
                    include_in_menu: values.include_in_menu 
                }
            };
            const method = category._id ? "PUT" : "POST";
            const url = category._id ? `api/categories/admin/${category._id}` : `api/categories/admin`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    });

    const handleOnDrop = useCallback( async(files: File[]) => {
        const afterUpload = (file: File, fileName: string) => {
            formik.setFieldValue('image', fileName);
        };
        await uploadImage(
            axiosClient, 
            'api/categories/admin/upload_image',
            files,
            afterUpload
        );
    }, [formik]);

    return {
        formik,
        handleOnDrop
    }
}