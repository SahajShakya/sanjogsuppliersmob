import * as Yup from "yup";

export const RegistraionValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email Required"),
        firstName: Yup.string().required("First Name Required"),
        lastName: Yup.string().required("Last Name Required"),
        password: Yup.string().required("Password Required"),
        cpassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    });
};
