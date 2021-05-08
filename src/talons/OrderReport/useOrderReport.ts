import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { useConfig } from "../Config/useConfig";

export const useOrderReport = () => {
    const { axiosClient } = useAxiosClient();
    const [orders, setOrders] = useState([]);
    const { getConfigValue } = useConfig();
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
    }, []);

    const currency = useMemo(() => {
        return getConfigValue("baseCurrency")
    }, [getConfigValue]);

    const lastOrder = useMemo(() => {
        if (orders && orders.length) {
            return orders[0]
        } else {
            return null
        }
    }, [orders]);

    return {
        totalOrders,
        totalSales,
        currency,
        lastOrder
    }
}