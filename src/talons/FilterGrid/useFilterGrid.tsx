import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button, Checkbox } from 'semantic-ui-react';

export const useFilterGrid = () => {
    const [filters, setFilters] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingFilter, setEditingFilter] = useState({});

    const fetchFilters = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/filters/admin/filters/');
        const { data, status } = response;
        if (data.filters && status == 200) {
            setFilters(data.filters);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchFilters();
    }, []);

    const reloadData = useCallback( async () => {
        await fetchFilters();
    }, [fetchFilters])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewBanner = useCallback(() => {
      setEditingFilter({});
      handleShowModal()
    }, [handleShowModal, setEditingFilter]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(filterId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/filters/admin/filters/${filterId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchFilters]);

    const handleEdit = useCallback( async (filterId) => {
        const response: AxiosResponse = await axiosClient('get', `api/filters/admin/filters/${filterId}`)
        const { data } = response;
        if (response.status == 200 && data.filter) {
            setEditingFilter(data.filter);
            handleShowModal();
        }
    }, [axiosClient, fetchFilters])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Name",
            accessor: 'name'
          },
          {
            Header: "Id",
            accessor: "_id"
          },
          {
            Header: "Allowed",
            accessor: 'allowed',
            Cell: ({row}) => (
                <Checkbox 
                    checked={row.original.allowed}
                    value={row.original.allowed}
                    disabled={true}
                    onChange={() => {}}
                />
            )
          },
          {
            Header: "Actions",
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
    }, [filters]);
    
    return {
        filters,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingFilter,
        handleAddNewBanner,
        reloadData
    }
}