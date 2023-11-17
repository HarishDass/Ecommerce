import React from "react";
import NavBar from "../usables/navbar";
import contact from "../assets/image/contact.jpg";
import { useFormik } from "formik";
import { Contact } from "../models/formInterface";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import UseToast from "../usables/toast";
const validate = (value: Contact) => {
  let errors: Partial<Contact> = {};
  if (!value.username) {
    errors.username = "required";
  }
  if (!value.mailId) {
    errors.mailId = "required";
  }
  if (!value.content) {
    errors.content = "required";
  }
  return errors;
};
function Contacts() {
  const Loginformik = useFormik<Contact>({
    initialValues: {
      username: "",
      mailId: "",
      content: "",
    },
    validate,
      onSubmit: (values: Contact) => {
          axios.post('http://localhost:5000/sendMail', values).then(() => {
            <UseToast status="success"></UseToast>
        })
      Loginformik.resetForm();
    },
  });
  return (
    <div>
      <NavBar></NavBar>
      <div className="contact">
        <div id="contactContainer">
          <div>
            <h1 className="contactHeader">Reach Out to Us</h1>
            <h3 className="contactQues">Have a Question? Let Us Know!</h3>
            <div className="contactForm">
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
                    {Loginformik.touched.username &&
                      Loginformik.errors.username && (
                        <div className="error">qwertyjsdfgh</div>
                      )}
                  </div>
                  <span className="p-float-label">
                    <InputText
                      id="mailId"
                      name="mailId"
                      onChange={Loginformik.handleChange}
                      value={Loginformik.values.mailId}
                    />
                    <label id="input_value">mailId</label>
                  </span>
                  <div className="errormessage">
                    {Loginformik.touched.mailId &&
                      Loginformik.errors.mailId && (
                        <div className="error">{Loginformik.errors.mailId}</div>
                      )}
                  </div>
                  <span className="p-float-label">
                    <InputText
                      id="content"
                      name="content"
                      onChange={Loginformik.handleChange}
                      value={Loginformik.values.content}
                    />
                    <label id="input_value">content</label>
                  </span>
                  <div className="errormessage">
                    {Loginformik.touched.content &&
                      Loginformik.errors.content && (
                        <div className="error">
                          {Loginformik.errors.content}
                        </div>
                      )}
                  </div>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <img src={contact} alt="" className="contactImage"></img>
          </div>
        </div>
      </div>
      <div className="contactDetails">
        <div className="detailContent">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.EcMWe4JcWOB5q1FmalMGhAHaHa&pid=Api&P=0&h=180"
            alt=""
            className="imageDetail"
          ></img>
          <h1 className="detailHead">Location</h1>
          <p className="detailbody">
            1234 Tranquility Lane, Serene Springs, Harmony Haven Heights,
            Peaceful Meadows, Zenith Cityscape
          </p>
        </div>
        <div className="detailContent">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.CPpWJ2aDQRdg2ODov5ZrpwHaHa&pid=Api&P=0&h=180"
            alt=""
            className="imageDetail"
          ></img>
          <h1 className="detailHead">E-Mail</h1>
          <p className="detailbody">zenith.emailer123@example.com</p>
        </div>

        <div className="detailContent">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.7wBgzdGJAhF8bPFUfHUuNQHaHa&pid=Api&P=0&h=180"
            alt=""
            className="imageDetail"
          ></img>
          <h1 className="detailHead">Phone-number</h1>
          <p className="detailbody">+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
