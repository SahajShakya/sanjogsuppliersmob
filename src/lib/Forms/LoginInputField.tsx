// import React from "react";
// import { useField } from "formik";

// type InputType = "text" | "password" | "email";

// type InputFieldPrps = {
//     name: string;
//     placeholder: string;
//     type?: InputType;

//     [key: string]: any;
// };


// const LoginInputField = (props: InputFieldPrps) => {
//     const { name, type, placeholder, class: string, ...rest } = props;
//     const [field, meta] = useField(props);

//     function _renderHelperText() {
//         const touched = meta.touched;
//         const error = meta.error;

//         if (touched && error) {
//             return error;
//         }
//     }

//     function hasError() {
//         const touched = meta.touched;
//         const error = meta.error;
//         if (touched && error) {
//             return true;
//         }
//         return false;
//     }

//     return (
//         <>
//             <LoginInputField
//                 placeholder={""}
//                 label={placeholder}
//                 error={hasError()}
//                 {...rest}
//                 {...field}
//                 helperText={_renderHelperText()}
//                 type={type} />
//         </>
//     );
// };

// export default LoginInputField;

// LoginInputField.defaultProps = {
//     type: "text",
// };
