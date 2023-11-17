import React, { useState } from "react";
import { useFormik } from "formik";
import { formikDataRegister } from "../models/formInterface";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';
import axios from "axios";
import { registerToLogin } from "../models/formInterface";

export const validate = (value: formikDataRegister) => {
  let errors:Partial<formikDataRegister> = { };
  if (!value.username) {
    errors.username = "required";
  }
  if (!value.age) {
    errors.age = "required";
  }
  if (!value.emailId) {
    errors.emailId = "required";
  }
  if (!value.password) {
    errors.password = "required";
  }
  return errors;
};

function Resgister(props:registerToLogin) {
  const RegisterFormik = useFormik<formikDataRegister>({
    initialValues: {
      username: "",
      age: "",
      emailId: "",
      password: "",
    },
    validate,
    onSubmit(values: formikDataRegister) {
      props.message('');
      axios.post('http://localhost:5000/postRegister', values).then(() => {
        props.message('success')
      }).catch(()=>{
        props.message('error')
      })
      RegisterFormik.resetForm();
      props.visible(false)
    },
  });
  
 
  return (
    <form
      onSubmit={RegisterFormik.handleSubmit}
      className="flex flex-column gap-2"
    >
      <div id="formData">
        <span className="p-float-label">
          <InputText
            id="username"
            name="username"
            onChange={RegisterFormik.handleChange}
            value={RegisterFormik.values.username}
          />
          <label id="input_value">Username</label>
        </span>
        <div className="errormessage">
          {RegisterFormik.touched.username &&
            RegisterFormik.errors.username && (
              <div className="error">{RegisterFormik.errors.username}</div>
            )}
        </div>
        <span className="p-float-label">
          <InputNumber
            id="age"
            name="age"
            onValueChange={RegisterFormik.handleChange}
            value={RegisterFormik.values.age}
          />
          <label id="input_value">Age</label>
        </span>
        <div className="errormessage">
          {RegisterFormik.touched.age && RegisterFormik.errors.age && (
            <div className="error">{RegisterFormik.errors.age as string}</div>
          )}
        </div>
        <span className="p-float-label">
          <InputText
            id="emailId"
            name="emailId"
            onChange={RegisterFormik.handleChange}
            value={RegisterFormik.values.emailId}
          />
          <label id="input_value">emailId</label>
        </span>
        <div className="errormessage">
          {RegisterFormik.touched.emailId && RegisterFormik.errors.emailId && (
            <div className="error">{RegisterFormik.errors.emailId}</div>
          )}
        </div>
        <span className="p-float-label">
          <InputText
            id="password"
            name="password"
            onChange={RegisterFormik.handleChange}
            value={RegisterFormik.values.password}
          />
          <label id="input_value">Password</label>
        </span>
        <div className="errormessage">
          {RegisterFormik.touched.password &&
            RegisterFormik.errors.password && (
              <div className="error">{RegisterFormik.errors.password}</div>
            )}
        </div>
        <Button type="submit" >Submit</Button>
      </div>
    </form>
  );
}

export default Resgister;
