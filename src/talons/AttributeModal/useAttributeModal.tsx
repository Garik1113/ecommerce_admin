import { useFormik } from "formik";
import { useCallback, useMemo } from 'react';
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useAttributeModal = (props) => {
    const { attribute={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const typeDropDownOptions = useMemo(() => {
        return [
            {
                text: "Swatch",
                value: "swatch",
                id: "swatch"
            },
            {
                text: "Color Swatch",
                value: "colorSwatch",
                id: "colorSwatch"
            },
            {
                text: "Select",
                value: "select",
                id: "select"
            },
        ]
    }, []);
    const formik = useFormik({
        initialValues: attribute._id ? {...attribute, type: attribute.type ? attribute.type: ""} : {
            name: "",
            type: "",
            values: []
        },
        onSubmit: async (values) => {
            let requestData;
            if (attribute._id) {
                requestData = {
                    ...attribute,
                    type: values.type,
                    name: values.name,
                    values: values.values.filter(e => !!e.name)
                }
            } else {
                requestData = {
                    type: values.type,
                    name: values.name,
                    values: values.values.filter(e => !!e.name)
                }
            };
            const method = attribute._id ? "PUT" : "POST";
            const url = attribute._id ? `api/attributes/admin/attributes/${attribute._id}` : `api/attributes/admin/attributes`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    });

    const handleDeleteValue = useCallback((valueIndex: number) => {
        const values = formik.values.values;
        const filteredAttributes = values.filter(e => values.indexOf(e) !== valueIndex);
        formik.setFieldValue("values", filteredAttributes)
    }, [formik])
    
    return {
        formik,
        handleDeleteValue,
        typeDropDownOptions
    }
}