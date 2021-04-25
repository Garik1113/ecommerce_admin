import { useFormik } from "formik";
import { useMemo } from "react";
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useOrderModal = (props) => {
    const { order={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: order._id ? order : {},
        onSubmit: async (values) => {
            console.log("VALUESSS", values)
            return
            let requestData;
            if (order._id) {
                requestData = {
                    ...order,
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
            const method = order._id ? "PUT" : "POST";
            const url = order._id ? `api/banners/admin/${order._id}` : `api/banners/admin/create`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    });
    
    return {
        formik,
    }
}