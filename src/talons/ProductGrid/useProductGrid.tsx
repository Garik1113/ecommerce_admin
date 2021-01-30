import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button } from 'semantic-ui-react';

export const useProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState({});

    const fetchProducts = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/products/admin/get_products');
        const { data, status } = response;
        if (data.products && status == 200) {
            setProducts(data.products);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchProducts();
    }, []);

    const reloadData = useCallback( async () => {
        await fetchProducts();
    }, [fetchProducts])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewProduct = useCallback(() => {
      setEditingProduct({});
      handleShowModal()
    }, [handleShowModal, setEditingProduct]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(productId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/products/admin/${productId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchProducts]);

    const handleEdit = useCallback( async (productId) => {
        handleShowModal();
        const response: AxiosResponse = await axiosClient('get', `api/products/admin/get_product/${productId}`)
        const { data } = response
        if (response.status == 200 && data.product) {
            setEditingProduct(data.product)
        } else {
          handleHideModal();
        }
    }, [axiosClient, fetchProducts])

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
            Header: "Category",
            accessor: "category_id"
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
    }, [products]);
    
    return {
        products,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingProduct,
        handleAddNewProduct,
        reloadData
    }
}