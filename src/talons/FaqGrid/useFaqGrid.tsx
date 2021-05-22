import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button } from 'semantic-ui-react';

export const useFaqGrid = (props) => {
  const { classes } = props;
    const [faqs, setBanners] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState({});

    const fetchFaqs = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/faqs/admin/');
        const { data, status } = response;
        if (data.faqs && status == 200) {
            setBanners(data.faqs);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchFaqs();
      window.scrollTo(0, 0)
    }, []);

    const reloadData = useCallback( async () => {
        await fetchFaqs();
    }, [fetchFaqs])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewBanner = useCallback(() => {
      setEditingFaq({});
      handleShowModal()
    }, [handleShowModal, setEditingFaq]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(bannerId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/faqs/admin/${bannerId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchFaqs]);

    const handleEdit = useCallback( async (bannerId) => {
        const response: AxiosResponse = await axiosClient('get', `api/faqs/admin/${bannerId}`)
        const { data } = response;
        if (response.status == 200 && data.faq) {
            setEditingFaq(data.faq);
            handleShowModal();
        }
    }, [axiosClient, fetchFaqs])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Հարց",
            accessor: 'question'
          },
          {
            Header: "Պատասխան",
            accessor: 'answer'
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
    }, [faqs]);
    
    return {
        faqs,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingFaq,
        handleAddNewBanner,
        reloadData
    }
}