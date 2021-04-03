import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button, Checkbox } from 'semantic-ui-react';

export const useAttributeGrid = () => {
    const [attributes, setAttributess] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingAttribute, setEditingAttribute] = useState({});

    const fetchAttributes = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/attributes/admin/attributes/');
        const { data, status } = response;
        if (data.attributes && status == 200) {
            setAttributess(data.attributes);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchAttributes();
    }, []);

    const reloadData = useCallback( async () => {
        await fetchAttributes();
    }, [fetchAttributes])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewBanner = useCallback(() => {
      setEditingAttribute({});
      handleShowModal()
    }, [handleShowModal, setEditingAttribute]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(filterId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/attributes/admin/attributes/${filterId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchAttributes]);

    const handleEdit = useCallback( async (attributeId) => {
        const response: AxiosResponse = await axiosClient('get', `api/attributes/admin/attributes/${attributeId}`)
        const { data } = response;
        if (response.status == 200 && data.attribute) {
            setEditingAttribute(data.attribute);
            handleShowModal();
        }
    }, [axiosClient, fetchAttributes])

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
    }, [attributes]);
    
    return {
        attributes,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingAttribute,
        handleAddNewBanner,
        reloadData
    }
}