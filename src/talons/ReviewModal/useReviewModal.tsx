import { useFormik } from "formik";
import { useMemo } from 'react';
import { useAxiosClient } from "../Axios/useAxiosClient";
import safeGet from 'lodash/get';

export const useReviewModal = (props) => {
    const { review={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: review._id ? review : { },
        onSubmit: async (values) => {
            const method = review._id ? "PUT" : "POST";
            const url = review._id ? `api/reviews/admin/${review._id}` : `api/reviews/admin/`;
            await axiosClient(method, url, { status: values.status });
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    });
    
    const allowedOptions = useMemo(() => {
        return (
            [
                {
                    id: "disabled",
                    value: "disabled",
                    text: 'Մերժված է'
                },
                {
                    id: "enabled",
                    value: "enabled",
                    text: 'Թույլատրված է'
                },
            ]
        )
    }, [])

    const product = useMemo(() => {
        if (review) {
            return {
                image: safeGet(review, 'productId.images[0].thumbnail_image', ''),
                name: safeGet(review, 'productId.name')
            }
        } 
    }, [review])

    return {
        formik,
        allowedOptions,
        product
    }
}