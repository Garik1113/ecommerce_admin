import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useAxiosClient } from '../Axios/useAxiosClient';
import { useConfig } from "../Config/useConfig";

export const useOrderModal = (props) => {
    const { order={} } = props;
    const { getConfigValue } = useConfig();
    const [status, setStatus] = useState<any>({});
    const { axiosClient } = useAxiosClient();

    const formik = useFormik({
        initialValues: order._id ? order : {},
        onSubmit: async () => {
            return;
        },
        enableReinitialize: true
    });

    const currency = useMemo(() => {
        return getConfigValue("baseCurrency")
    }, [getConfigValue])
    
    const orderStatusOptions = useMemo(() => {
        return [
            {
                id: "new",
                text: "New",
                value: 'new'
            },
            {
                id: "pending",
                text: "Pending",
                value: 'pending'
            },
            {
                id: "done",
                text: "Done",
                value: 'done'
            },
        ]
    }, [formik]);

    const setOrderStatus = useCallback(async(statusData) => {
        setStatus(statusData);
        await axiosClient('PUT', 'api/orders/admin', { orderData: { ...order, status: statusData }});
    }, [order])

    return {
        formik,
        currency,
        orderStatusOptions,
        status, 
        setOrderStatus
    }
}