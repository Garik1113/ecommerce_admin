import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import { uploadImage } from "src/helpers/uploadImage";
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useBannerModal = (props) => {
    const { banner={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: banner._id ? banner : {
            image: "",
            content: "",
            contentPosition: ""
        },
        onSubmit: async (values) => {
            let requestData;
            if (banner._id) {
                requestData = {
                    ...banner,
                    image: values.image,
                    content: values.content,
                    contentPosition: values.contentPosition
                }
            } else {
                requestData = {
                    image: values.image,
                    content: values.content,
                    contentPosition: values.contentPosition
                }
            };
            const method = banner._id ? "PUT" : "POST";
            const url = banner._id ? `api/banners/admin/${banner._id}` : `api/banners/admin/create`;
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
            'api/banners/admin/add_banner_image',
            files,
            afterUpload
        );
    }, [formik]);
    const handleDeleteBannerImage= useCallback((imageIndex: number) => {
        formik.setFieldValue('image', "")
    }, [formik]);
    const contentPositions = useMemo(() => {
        return [
            "top-left", 
            "top-center", 
            "top-right",
            "center-left", 
            "center-center", 
            "center-right",
            "bottom-left", 
            "bottom-center", 
            "bottom-right"
        ]
    }, []);

    const handleImageError = useCallback(() => {
        formik.setFieldValue('image', 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg')
    }, [formik]);
    
    return {
        formik,
        handleOnDrop,
        handleDeleteBannerImage,
        contentPositions,
        handleImageError
    }
}