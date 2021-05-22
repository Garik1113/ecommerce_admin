import React from 'react';
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Column } from "react-table";
import { useAxiosClient } from "../Axios/useAxiosClient";
import { Button, Checkbox } from 'semantic-ui-react';

export const useSliderGrid = () => {
    const [sliders, setSliders] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosClient } = useAxiosClient();
    const [showModal, setShowModal] = useState(false);
    const [editingSlider, setEditingSlider] = useState({});

    const fetchSliders = useCallback( async () => {
        const response: AxiosResponse = await axiosClient('GET', 'api/sliders/admin/');
        const { data, status } = response;
        if (data.sliders && status == 200) {
            setSliders(data.sliders);
        }
    }, [axiosClient]);

    useEffect(() => {
      fetchSliders();
      window.scrollTo(0, 0)
    }, []);

    const reloadData = useCallback( async () => {
        await fetchSliders();
    }, [fetchSliders])

    const handleShowModal = useCallback(() => {
        setShowModal(true)
    }, [setShowModal, showModal]);

    const handleAddNewSlider = useCallback(() => {
      setEditingSlider({});
      handleShowModal()
    }, [handleShowModal, setEditingSlider]);

    const handleHideModal = useCallback(() => {
        setShowModal(false)
    }, [setShowModal, showModal]);

    const handleDelete = useCallback(async(filterId) => {
        setIsSubmitting(true)
        await axiosClient("delete", `api/sliders/admin/${filterId}`);
        setIsSubmitting(false)
        reloadData();
    }, [axiosClient, fetchSliders]);

    const handleEdit = useCallback( async (filterId) => {
        const response: AxiosResponse = await axiosClient('get', `api/sliders/admin/${filterId}`)
        const { data } = response;
        if (response.status == 200 && data.slider) {
            setEditingSlider(data.slider);
            handleShowModal();
        }
    }, [axiosClient, fetchSliders])

    const columns = useMemo((): Column<any>[] => {
        return [
          {
            Header: "Անուն",
            accessor: 'name'
          },
          {
            Header: "ID",
            accessor: "_id"
          },
          {
            Header: "Ավելացնել գլխավոր էջում",
            accessor: 'includeInHomePage',
            Cell: ({row}) => (
                <Checkbox 
                    checked={row.original.includeInHomePage}
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
    }, [sliders]);
    
    return {
        sliders,
        columns,
        handleShowModal,
        handleHideModal,
        showModal,
        isSubmitting,
        editingSlider,
        handleAddNewSlider,
        reloadData
    }
}