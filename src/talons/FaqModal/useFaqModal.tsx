import { useFormik } from "formik";
import { useAxiosClient } from "../Axios/useAxiosClient";

export const useFaqModal = (props) => {
    const { faq = {}, reloadData, handleHideModal } = props;
    const { axiosClient } = useAxiosClient();
    const formik = useFormik({
        initialValues: faq._id ? faq : {
            question: "",
            answer: "",
        },
        onSubmit: async (values) => {
            let requestData;
            if (faq._id) {
                requestData = {
                    ...faq,
                    question: values.question,
                    answer: values.answer,
                }
            } else {
                requestData = {
                    question: values.question,
                    answer: values.answer,
                }
            };
            const method = faq._id ? "PUT" : "POST";
            const url = faq._id ? `api/faqs/admin/${faq._id}` : `api/faqs/admin/create`;
            await axiosClient(method, url, requestData);
            handleHideModal();
            reloadData()
        },
        enableReinitialize: true
    });
    
    
    return {
        formik,
    }
}