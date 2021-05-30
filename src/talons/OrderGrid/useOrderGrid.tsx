import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button } from 'semantic-ui-react';

export const useOrderGrid = (props) => {
  const { classes } = props;
    const [orders, setOrders] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState({});

    const fetchOrders = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/orders/admin/');
        const { data, status } = response;
        if (data.orders && status == 200) {
            setOrders(data.orders);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchOrders();
      window.scrollTo(0, 0)
    }, []);

    const reloadData = useCallback( async () => {
        await fetchOrders();
    }, [fetchOrders])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewBanner = useCallback(() => {
      setEditingOrder({});
      handleShowModal()
    }, [handleShowModal, setEditingOrder]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(orderId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/orders/admin/${orderId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchOrders]);

    const handleEdit = useCallback( async (orderId) => {
        const response: AxiosResponse = await axiosClient('get', `api/orders/admin/${orderId}`)
        const { data } = response;
        if (response.status == 200 && data.order) {
            setEditingOrder(data.order);
            handleShowModal();
        }
    }, [axiosClient, fetchOrders])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Պատվերի համար",
            accessor: '_id'
          },
          {
              Header: "Օգտատիրոջ Էլ հասցե",
              Cell: ({row}) => {
                  const { customer, billingAddress } = row.original;
                  if (customer) {
                    return <span>{customer.email}</span>
                  } else {
                    return <span>{billingAddress.email}</span>
                  }
              }
          },
          {
            Header: "Օգտատիրոջ Անուն",
            Cell: ({row}) => {
                const { customer, billingAddress } = row.original;
                if (customer) {
                  return <span>{customer.firstName}</span>
                } else {
                  return <span>{billingAddress.firstName}</span>
                }
            }
          },
          {
              Header: "Օգտատիրոջ Ազգանուն",
              Cell: ({row}) => {
                  const { customer, billingAddress } = row.original;
                  if (customer) {
                    return <span>{customer.lastName}</span>
                  } else {
                    return <span>{billingAddress.lastName}</span>
                  }
              }
          },
          {
            Header: "Գործողություններ",
            Cell: ({row}) => {
                return (
                    <div>
                        <Button icon="edit" onClick={() => handleEdit(row.original._id)}/>
                        <Button icon="delete" onClick={() => handleDelete(row.original._id)}/>
                    </div>
                )
            }
          }
        ]
    }, [orders]);
    
    return {
        orders,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingOrder,
        handleAddNewBanner,
        reloadData
    }
}