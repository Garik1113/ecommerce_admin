import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button, Checkbox } from 'semantic-ui-react';
import safeGet from 'lodash/get';

type Props = {
  classes: any
}

export const useReviewGrid = (props: Props) => {
    const { classes } = props;
    const [reviews, setReviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingReview, setEditingReview] = useState({});

    const fetchReviews = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/reviews/admin/');
        const { data, status } = response;
        if (data.reviews && status == 200) {
            setReviews(data.reviews);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchReviews();
      window.scrollTo(0, 0)
    }, []);

    const reloadData = useCallback( async () => {
        await fetchReviews();
    }, [fetchReviews])

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

    const handleDelete = useCallback(async(reviewId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/reviews/admin/${reviewId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchReviews]);

    const handleEdit = useCallback( async (reviewId) => {
        const response: AxiosResponse = await axiosClient('get', `api/reviews/admin/${reviewId}`)
        const { data } = response;
        if (response.status == 200 && data.review) {
            setEditingReview(data.review);
            handleShowModal();
        }
    }, [axiosClient, fetchReviews])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Ապրանք",
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
            Header: "Օգտատեր",
            accessor: 'customer.email'
          },
          {
            Header: "Մեկնաբանություն",
            accessor: "comment"
          },
          {
            Header: "Վարկանիշ",
            accessor: "rating"
          },
          {
            Header: "Թույլատրված է",
            accessor: 'status',
            Cell: ({row}) => (
                <Checkbox 
                    checked={row.original.status == "enabled"}
                    value={row.original.status}
                    disabled={true}
                    onChange={() => {}}
                />
            )
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
    }, [reviews]);
    
    return {
        reviews,
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