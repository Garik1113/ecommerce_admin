import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button, Checkbox } from 'semantic-ui-react';

export const useCategoryGrid = () => {
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState({});

    const fetchCategories = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/categories/admin');
        const { data, status } = response;
        if (data.categories && status == 200) {
            setCategories(data.categories);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchCategories();
    }, []);

    const reloadData = useCallback( async () => {
        await fetchCategories();
    }, [fetchCategories])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewCategory = useCallback(() => {
      setEditingCategory({});
      handleShowModal()
    }, [handleShowModal, setEditingCategory]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(categoryId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/categories/admin/${categoryId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchCategories]);

    const handleEdit = useCallback( async (categoryId) => {
        handleShowModal();
        const response: AxiosResponse = await axiosClient('get', `api/categories/admin/${categoryId}`)
        const { data } = response
        if (response.status == 200 && data.category) {
            setEditingCategory(data.category)
        } else {
          handleHideModal();
        }
    }, [axiosClient, fetchCategories])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Name",
            accessor: 'name'
          },
          {
            Header: "ID",
            accessor: '_id'
          },
          {
            Header: "Include In Menu",
            accessor: "include_in_menu",
            Cell: ({row}) => {
                return <Checkbox
                            checked={row.original.include_in_menu}
                        />
            }
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
    }, [categories]);
    
    return {
        categories,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingCategory,
        handleAddNewCategory,
        reloadData
    }
}