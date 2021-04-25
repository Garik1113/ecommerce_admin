import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button, Checkbox } from 'semantic-ui-react';
import Image from 'components/Image';
import { IMAGE_BASE_URL } from 'config/defaults';

export const useCustomerGrid = (props) => {
    const { classes } = props;
    const [customers, setCustomers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingBanner, setEditingBanner] = useState({});

    const fetchCustomers = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/customers/admin/');
        const { data, status } = response;
        if (data.customers && status == 200) {
            setCustomers(data.customers);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchCustomers();
    }, []);

    const reloadData = useCallback( async () => {
        await fetchCustomers();
    }, [fetchCustomers])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewBanner = useCallback(() => {
      setEditingBanner({});
      handleShowModal()
    }, [handleShowModal, setEditingBanner]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(customerId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/customers/admin/${customerId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchCustomers]);

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Email",
            accessor: 'email',
        },
          {
            Header: "First Name",
            accessor: 'firstName'
          },
          {
            Header: "Last Name",
            accessor: 'lastName'
          },
          {
            Header: "ID",
            accessor: '_id'
          },
          {
            Header: "Actions",
            Cell: ({row}) => {
                return (
                    <div>
                        <Button icon="delete" onClick={() => handleDelete(row.original._id)}/>
                    </div>
                )
            }
          }
        ]
    }, [customers]);
    
    return {
        customers,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingBanner,
        handleAddNewBanner,
        reloadData
    }
}