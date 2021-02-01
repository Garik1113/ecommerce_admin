import { FormikValues, useFormik } from "formik"

export const useAttributeForm = () => {
    const formik = useFormik({
        initialValues: {
            attributes: [
                {
                    id: 1,
                    label: "attr",
                    values: [
                        {
                            id: 1,
                            label: "",
                            images: []
                        }
                    ]
                }
            ]
        },
        onSubmit: (values: FormikValues) => {
            console.log(values)
        }
    });

    return {
        formik
    }
}