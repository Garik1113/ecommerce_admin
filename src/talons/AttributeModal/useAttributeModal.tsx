import { useFormik } from "formik";
import { useCallback, useMemo } from 'react';
import { useAxiosClient } from "../Axios/useAxiosClient";
import  * as Yup from 'yup';

export const useAttributeModal = (props) => {
    const { attribute={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const ValidationSchema = useMemo(() => Yup.object().shape({
        name: Yup.string().required("Name is required"),
        code: Yup.string().required("Code is required"),
    }), [Yup]);
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
            code: "",
            values: []
        },
        validationSchema: ValidationSchema,
        onSubmit: async (values) => {
            if (!values.values || !values.values.length) {
                formik.setErrors({"values": "Please enter values"});
                return;
            }
            let requestData;
            if (attribute._id) {
                requestData = {
                    ...attribute,
                    type: values.type,
                    name: values.name,
                    code: values.code,
                    values: values.values.filter(e => !!e.name).map((v, i)=> { 
                        if (v.id) {
                            return v;
                        } else {
                            return { 
                               ...v, 
                               id:  new Date().getTime() + i + v.name.replace("#", "") 
                            }  
                        }
                         
                    })
                }
            } else {
                requestData = {
                    type: values.type,
                    name: values.name,
                    code: values.code,
                    values: values.values.filter(e => !!e.name).map((v, i)=> { return { name: v.name, id:  new Date().getTime() + i + v.name.replace("#", "") } })
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