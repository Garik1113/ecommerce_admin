import { useFormik } from "formik";
import { useCallback, useState } from 'react';
import { uploadImage } from 'src/helpers/uploadImage';
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useSliderModal = (props) => {
    const { slider={}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const [activeSlideId, setActiveSlideId] = useState<number>(null);

    const formik = useFormik({
        initialValues: slider._id ? slider : {
            name: "",
            includeInHomePage: false,
            slides: []
        },
        onSubmit: async (values) => {
            let requestData;
            if (slider._id) {
                requestData = {
                    ...slider,
                    name: values.name,
                    includeInHomePage: values.includeInHomePage,
                    slides: values.slides.filter(e => !!e.image)
                }
            } else {
                requestData = {
                    name: values.name,
                    includeInHomePage: values.includeInHomePage,
                    slides: values.slides.filter(e => !!e.image)
                }
            };
            const method = slider._id ? "PUT" : "POST";
            const url = slider._id ? `api/sliders/admin/${slider._id}` : `api/sliders/admin`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    });

    const handleDeleteSlide = useCallback((slideIndex: number) => {
        const slides = formik.getFieldProps('slides').value || [];
        const filteredAttributes = slides.filter((e, i )=> i !== slideIndex);
        // console.log("FILTEREEEDDDD", filteredAttributes)
        formik.setFieldValue("slides", [...filteredAttributes])
    }, [formik]);

    const handleOnDrop = useCallback( async(files: File[]) => {
        const afterUpload = (file: File, fileName: string) => {
            const slides = formik.getFieldMeta('slides').value || [];
            const filteredSlides = slides.map((e, i) => {
                if (i == activeSlideId) {
                    e.image = fileName
                }
                return e
                
            });
            console.log("filteredSlides", filteredSlides)
            formik.setFieldValue('slides', filteredSlides);
        };
        await uploadImage(
            axiosClient, 
            'api/sliders/admin/add_slider_image',
            files,
            afterUpload
        );
    }, [formik]);
    
    return {
        formik,
        handleDeleteSlide,
        handleOnDrop,
        activeSlideId, 
        setActiveSlideId
    }
}