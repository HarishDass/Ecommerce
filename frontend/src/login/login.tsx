import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { formikDataLogin } from "../models/formInterface";
import Resgister from "./resgister";
import { useNavigate } from "react-router-dom";
import UseToast from "../usables/toast";
import axios from "axios";

const validate = (value: formikDataLogin) => {
  let errors: Partial<formikDataLogin> = {};
  if (!value.username) {
    errors.username = "required";
  }
  if (!value.password) {
    errors.password = "required";
  }
  return errors;
};

const Login: React.FC = () => {
  let app;
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const [resgister, setRegister] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

  const Loginformik = useFormik<formikDataLogin>({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values: formikDataLogin) => {
      setMessage("");
      axios
        .post("http://localhost:5000/postLogin", values)
        .then((res: any) => {
          setMessage("success");
          sessionStorage.setItem("token", res.data.accessToken);
          setTimeout(() => {
            navigate("home");
          }, 2000);
        })
        .catch(() => {
          setMessage("error");
        });
      Loginformik.resetForm();
      setVisible(false);
    },
  });

  const loginFunc = () => {
    setRegister(true);
    setVisible(true);
  };

  const signup = () => {
    setRegister(false);
    setVisible(true);
  };
  const getMessage = (value: string) => {
    setMessage(value);
  };

  const setVisibleFromRegister = (value: boolean) => {
    setVisible(value);
  };
  if (resgister) {
    app = (
      <form
        onSubmit={(e) => Loginformik.handleSubmit(e)}
        className="flex flex-column gap-2"
      >
        <div id="formData">
          <span className="p-float-label">
            <InputText
              id="username"
              name="username"
              onChange={Loginformik.handleChange}
              value={Loginformik.values.username}
            />
            <label id="input_value">Username</label>
          </span>
          <div className="errormessage">
            {Loginformik.touched.username && Loginformik.errors.username && (
              <div className="error">qwertyjsdfgh</div>
            )}
          </div>
          <span className="p-float-label">
            <InputText
              id="password"
              name="password"
              onChange={Loginformik.handleChange}
              value={Loginformik.values.password}
            />
            <label id="input_value">Password</label>
          </span>
          <div className="errormessage">
            {Loginformik.touched.password && Loginformik.errors.password && (
              <div className="error">{Loginformik.errors.password}</div>
            )}
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
  if (!resgister) {
    app = <Resgister message={getMessage} visible={setVisibleFromRegister} />;
  }
  return (
    <div id="background">
      <UseToast status={message} />

      <div className="button">
        <button id="btn" onClick={loginFunc}>
          Login
        </button>
        <button id="btn" onClick={signup}>
          SignUp
        </button>
      </div>
      <div className="card">
        <div id="card-img">
          <h1 id="title1">Gateway to Your Shopping Wonderland</h1>
          <p id="title3">
            Welcome to ETHIC ELEG, where every click is a step into a world of
            endless choices. Unveil the magic behind our virtual doors by simply
            logging in. Your seamless shopping experience begins here, promising
            joy in every purchase. Happy exploring!
          </p>
          <Dialog
            header={resgister ? "Login" : "Register"}
            visible={visible}
            className="login-card"
            onHide={() => setVisible(false)}
          >
            {app}
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default Login;
