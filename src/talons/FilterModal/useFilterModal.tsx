import { useFormik } from "formik";
import { useCallback } from 'react';
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useFilterModal = (props) => {
    const { filter={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: filter._id ? filter : {
            name: "",
            options: []
        },
        onSubmit: async (values) => {
            let requestData;
            if (filter._id) {
                requestData = {
                    ...filter,
                    name: values.name,
                    allowed: values.allowed,
                    options: values.options.filter(e => !!e.name)
                }
            } else {
                requestData = {
                    name: values.name,
                    allowed: values.allowed,
                    options: values.options.filter(e => !!e.name)
                }
            };
            const method = filter._id ? "PUT" : "POST";
            const url = filter._id ? `api/filters/admin/filters/${filter._id}` : `api/filters/admin/filters`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    });

    const handleDeleteOption = useCallback((optionIndex: number) => {
        const options = formik.values.options;
        const filteredAttributes = options.filter(e => options.indexOf(e) !== optionIndex);
        formik.setFieldValue("options", filteredAttributes)
    }, [formik])
    
    return {
        formik,
        handleDeleteOption
    }
}