import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button, Checkbox } from 'semantic-ui-react';
import Image from 'components/Image';
import { IMAGE_BASE_URL } from 'config/defaults';

export const useBannerGrid = () => {
    const [banners, setBanners] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingBanner, setEditingBanner] = useState({});

    const fetchBanners = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/banners/admin/');
        const { data, status } = response;
        if (data.banners && status == 200) {
            setBanners(data.banners);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchBanners();
    }, []);

    const reloadData = useCallback( async () => {
        await fetchBanners();
    }, [fetchBanners])

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

    const handleDelete = useCallback(async(bannerId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/banners/admin/${bannerId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchBanners]);

    const handleEdit = useCallback( async (bannerId) => {
        const response: AxiosResponse = await axiosClient('get', `api/banners/admin/${bannerId}`)
        const { data } = response;
        if (response.status == 200 && data.banner) {
            setEditingBanner(data.banner);
            handleShowModal();
        }
    }, [axiosClient, fetchBanners])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Image",
            accessor: 'image',
            Cell: ({row}) => {
              return (
                  <div>
                      <img 
                          style={{maxWidth: "150px"}} 
                          src={`${IMAGE_BASE_URL}/banners/${row.original.image}`} 
                          alt="Banner image" 
                      />
                  </div>
              )
          }
          },
          {
            Header: "Content",
            accessor: 'content'
          },
          {
            Header: "Content Position",
            accessor: "contentPosition"
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
    }, [banners]);
    
    return {
        banners,
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