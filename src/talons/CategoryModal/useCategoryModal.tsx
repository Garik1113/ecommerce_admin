import { useFormik } from "formik";
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useCategoryModal = (props) => {
    const { category={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: category._id ? category : {
            name: "",
            include_in_menu: false,
        },
        onSubmit: async (values) => {
            let requestData;
            if (category._id) {
                requestData = {
                    ...category,
                    name: values.name,
                    include_in_menu: values.include_in_menu
                }
            } else {
                requestData = {
                    name: values.name,
                    include_in_menu: values.include_in_menu 
                }
            };
            const method = category._id ? "PUT" : "POST";
            const url = category._id ? `api/categories/admin/${category._id}` : `api/categories/admin`;
            const response = await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    })

    return {
        formik
    }
}