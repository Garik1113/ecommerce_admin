import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button } from 'semantic-ui-react';
import get from 'lodash/get'
import queryString  from 'querystring';
import { useHistory } from 'react-router';

export const useProductGrid = ({classes}) => {
    const [products, setProducts] = useState([]);
    const [totals, setTotals] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState({});
    const history = useHistory();

    const queryParams = useMemo(() => {
      return queryString.parse(history.location.search);
    }, [history.location.search]);

    const fetchProducts = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', `api/products/admin/get_products?page=${queryParams["?page"]}`);
        const { data, status } = response;
        if (data.products && status == 200) {
            setProducts(data.products);
            if (data.totals) {
              setTotals(data.totals)
            }
        }
    }, [axiosClient, setTotals, history, queryParams]);

    useEffect(() => {
        fetchProducts();
        window.scrollTo(0, 0)
    }, [queryParams]);

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

    const handleHideModal = useCallback(async() => {
        setShowModal(false);
        await fetchProducts()
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
            Header: "Անուն",
            accessor: 'name'
          },
          {
            Header: "Ապրանքի Կոդ",
            accessor: '_id'
          },
          {
            Header: "Նկար",
            accessor: "images",
            Cell: ({row}) => {
              const imageSrc = get(row, "original.images[0].thumbnail_image");
              const src = `api/images/product/${imageSrc}`
              return (
                  <img className={classes.thumbnailImage} src={src}/>
              )
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
        reloadData,
        totals,
        queryParams
    }
}