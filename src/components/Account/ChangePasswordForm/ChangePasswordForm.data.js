import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
   
    newPassword: Yup.string().required("Este campo es obligatorio"),
  
      
  });
}