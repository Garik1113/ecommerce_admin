import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { useConfig } from "../Config/useConfig";

export const useOrderReport = () => {
    const { axiosClient } = useAxiosClient();
    const [orders, setOrders] = useState([]);
    const { getConfigValue } = useConfig();
    const [status, setStatus] = useState<any>({});
    const fetchOrders = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/orders/admin/');
        const { data, status } = response;
        if (data.orders && status == 200) {
            setOrders(data.orders);
        }
    }, [axiosClient]);

    const totalOrders = useMemo(() => {
        return orders.length;
    }, [orders]);

    const totalSales = useMemo(() => {
        return orders.reduce((state, current) => {
            const totalSale = state + current.totalPrice;
            return totalSale
        }, 0)
    }, [orders])

    useEffect(() => {
      fetchOrders();
      window.scrollTo(0, 0)
    }, []);

    const currency = useMemo(() => {
        return getConfigValue("baseCurrency")
    }, [getConfigValue]);

    const lastOrder = useMemo(() => {
        if (orders && orders.length) {
            return orders[0]
        } else {
            return undefined
        }
    }, [orders]);

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
    }, []);

    const setOrderStatus = useCallback(async(statusValue) => {
        const statusItem = orderStatusOptions.find(e => e.id == statusValue);
        setStatus(statusItem);
        const status = {
            name: statusItem.text,
            value: statusItem.id
        }
        await axiosClient('PUT', 'api/orders/admin/status', { status, orderId: lastOrder._id });
    }, [lastOrder, orderStatusOptions])

    return {
        totalOrders,
        totalSales,
        currency,
        lastOrder,
        orderStatusOptions,
        status, 
        setOrderStatus
    }
}