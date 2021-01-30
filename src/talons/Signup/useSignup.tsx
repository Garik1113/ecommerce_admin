import { useFormik } from "formik"
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/store";
import { signup } from "src/store/actions/user/asyncActions";
import { IUser } from "src/store/reducers/user";
import  * as Yup from 'yup';


export const useSignup = () => {
    const SignupSValidationSchema = useMemo(() => Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    }), [Yup]);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: SignupSValidationSchema,
        onSubmit: async (userValues: IUser) => {
           await dispatch(signup(userValues));
        }
    });

    const user = useSelector((state: AppState) => state.user);

    return {
        formik
    }
}