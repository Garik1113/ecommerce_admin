import { useFormik } from "formik";
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useProductModal = (props) => {
    const { product = {}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: product._id ? product : {
            name: "",
            category_id: ""
        },
        onSubmit: async (values) => {
            let requestData;
            if (product._id) {
                requestData = {
                    ...product,
                    name: values.name,
                    category_id: values.category_id
                }
            } else {
                requestData = {
                    name: values.name,
                    category_id: values.category_id 
                }
            };
            const method = product._id ? "PUT" : "POST";
            const url = product._id ? `api/products/admin/update//${product._id}` : `api/products/admin`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData();
        },
        enableReinitialize: true
    })

    return {
        formik
    }
}