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
                text: "Նոր",
                value: 'new'
            },
            {
                id: "pending",
                text: "Ընթացքի մեջ",
                value: 'pending'
            },
            {
                id: "done",
                text: "Ավարտված",
                value: 'done'
            },
        ]
    }, [formik]);

    const setOrderStatus = useCallback(async(statusValue) => {
        const statusItem = orderStatusOptions.find(e => e.id == statusValue);
        setStatus(statusItem);
        const status = {
            name: statusItem.text,
            value: statusItem.id
        }
        await axiosClient('PUT', 'api/orders/admin/status', { status, orderId: order._id });
    }, [order, orderStatusOptions])

    return {
        formik,
        currency,
        orderStatusOptions,
        status, 
        setOrderStatus
    }
}