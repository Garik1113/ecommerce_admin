import { AxiosResponse } from "axios";
import { useFormik } from "formik"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "src/helpers/uploadImage";
import { getConfigs } from "src/store/actions/app/app";
import { useAxiosClient } from "../Axios/useAxiosClient";

const initial = {
    storeEmail: "",
    storePhone: "",
    baseCurrency: "",
    socialSites: [{ name: "", url:"" }],
    logo: "",
    productsPerPage: 9,
    paymentMethods: [
        {
            methodName: "Վճարում առաքման պահին",
            methodCode: "cash_on_dilivery",
            enabled: true
        },
        {
            methodName: "Վճարում քարտով",
            methodCode: "cart",
            enabled: false
        }
    ],
    shippingMethods: [
        {
            methodName: "Երևան",
            methodCode: "erevan",
            price: 1000,
            enabled: true
        },
        {
            methodName: "Մարզեր",
            methodCode: "region",
            price: 3000,
            enabled: false
        },
    ]
}

export const useConfigContent = () => {
    const { axiosClient } = useAxiosClient();
    const {configs: config = {}} = useSelector((state:any) => state.app)
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const currencies = useMemo(() => {
        return {
            amd: {
                name: "AMD",
                code: "amd",
                symbol: "$"
            }
        }
    }, []);
    const formik = useFormik({
        initialValues: config._id ? {
            ...config, baseCurrency: config.baseCurrency && config.baseCurrency.code, 
            paymentMethods: config.paymentMethods ? config.paymentMethods : initial.paymentMethods,
            shippingMethods: config.shippingMethods ? config.shippingMethods : initial.shippingMethods
        } : initial,
        enableReinitialize: true,
        onSubmit: async(values) => {
            setMessage("");
            const method = config._id ? "PUT" : "POST";
            const url = config._id ? `/api/configs/admin/${config._id}` : '/api/configs/admin/'
            values.shippingMethods = values.shippingMethods.filter(e => e.methodCode)
            const response: AxiosResponse = await axiosClient(method, url, {...values, baseCurrency: currencies[values.baseCurrency]});
            const { data, status } = response;
            if (status == 200 && data.status == 'updated') {
                dispatch(getConfigs())
            };
            setMessage("Կարգավորումները պահպանված են")
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleAddNewSocialSite = useCallback(() => {
        formik.setFieldValue("socialSites", [...formik.values.socialSites, { name: "", url:"" }])
    }, [formik]);

    const baseCurrencyOptions = useMemo(() => {
        return [
            {
                text: "AMD",
                value: "amd",
                id: "amd"
            }
        ]
    }, []);
    const handleOnDrop = useCallback( async(files: File[]) => {
        const afterUpload = (file: File, fileName: string) => {
            formik.setFieldValue('logo', fileName);
        };
        await uploadImage(
            axiosClient, 
            'api/configs/admin/upload_logo',
            files,
            afterUpload
        );
    }, [formik, uploadImage]);



    return {
        formik,
        handleAddNewSocialSite,
        baseCurrencyOptions,
        handleOnDrop,
        message
    }
}