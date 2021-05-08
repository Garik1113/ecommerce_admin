import { useFormik } from "formik";
import { useMemo } from "react";
import { useConfig } from "../Config/useConfig";

export const useOrderModal = (props) => {
    const { order={}, reloadData, handleHideModal } = props;
    const { getConfigValue } = useConfig();
    const formik = useFormik({
        initialValues: order._id ? order : {},
        onSubmit: async (values) => {
            return
        },
        enableReinitialize: true
    });

    const currency = useMemo(() => {
        return getConfigValue("baseCurrency")
    }, [getConfigValue])
    
    return {
        formik,
        currency
    }
}