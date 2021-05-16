import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button } from 'semantic-ui-react';
import safeGet from 'lodash/get';

type Props = {
  classes: any
}

export const useProductSubscribersGrid = (props: Props) => {
    const { classes } = props;
    const [productSubscriptions, setProductSubscriptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingReview, setEditingReview] = useState({});

    const fetchProductSubscriptions = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/productSubscriptions/admin/');
        const { data, status } = response;
        if (data.productSubscriptions && status == 200) {
            setProductSubscriptions(data.productSubscriptions);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchProductSubscriptions();
    }, []);

    const reloadData = useCallback( async () => {
        await fetchProductSubscriptions();
    }, [fetchProductSubscriptions])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewBanner = useCallback(() => {
      setEditingReview({});
      handleShowModal()
    }, [handleShowModal, setEditingReview]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(productSubscriptionId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/productSubscriptions/admin/${productSubscriptionId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchProductSubscriptions]);

    const handleEdit = useCallback( async (productSubscriptionId) => {
        const response: AxiosResponse = await axiosClient('get', `api/productSubscriptions/admin/${productSubscriptionId}`)
        const { data } = response;
        if (response.status == 200 && data.productSubscription) {
            setEditingReview(data.productSubscription);
            handleShowModal();
        }
    }, [axiosClient, fetchProductSubscriptions])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Product",
            accessor: 'productId',
            Cell: ({row}) => {
              const product = row.original.productId || {};
              const imageSrc = safeGet(product, 'images[0].thumbnail_image', '');
              return (
                  <div className={classes.product}>
                      <img src={`api/images/product/${imageSrc}`} className={classes.image}/>
                      <span className={classes.productName}>{product.name}</span>
                  </div>
              )
            }
          },
          {
            Header: "Product ID",
            accessor: 'productId._id',
          },
          {
            Header: "Customer",
            accessor: 'customerId.email'
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
    }, [productSubscriptions]);
    
    return {
        productSubscriptions,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingReview,
        handleAddNewBanner,
        reloadData
    }
}