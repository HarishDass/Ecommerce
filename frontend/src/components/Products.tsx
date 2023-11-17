import { useLocation } from "react-router";
import NavBar from "../usables/navbar";
import { useEffect, useState } from "react";
import { productDetails } from "../models/formInterface";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

function Products() {
  const [product, setProduct] = useState<productDetails[]>([]);
  const location = useLocation();

  const { state } = location;
  const getlink = state?.link;

  useEffect(() => {
    if (getlink) {
      setProduct(getlink);
    } else {
      axios.get("http://localhost:5000/getProduct").then((res: any) => {
        setProduct(res.data);
      });
    }
  }, [getlink]);
  const formik = useFormik<any>({
    initialValues: {
      productname: "",
    },
    onSubmit: (values: any) => {
      console.log(values);

      axios.post(`http://localhost:5000/filter`, values).then((res: any) => {
        setProduct(res.data);
      });
      formik.resetForm();
    },
  });
  const addCart = (product: any) => (e: any) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/addCart`, product).then((res: any) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <NavBar />
      <div className="filterBar">
        <form onSubmit={formik.handleSubmit}>
          <div className="filterContent">
            <label className="labels">ProductName</label>
            <InputText
              type="text"
              name="productname"
              className="Filter_input"
              onChange={formik.handleChange}
              value={formik.values.productname}
            ></InputText>
          </div>

          <div className="filterContent">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>

      <div id="container">
        <div className="something">
          {product?.map((link: any) => {
            return (
              <div>
                <div className="subHeadings">
                  <h1 className="firstlineTitle">{link?.section}</h1>
                  <div className="underline"></div>
                </div>
                <div id="productDetails">
                  {link?.products.map((res: any, i: number) => {
                    return (
                      <div>
                        <h4 className="secondHeading styleH " key={i}>
                          {res.name.toUpperCase()}
                        </h4>
                        <div className="secondLinecontainer">
                          {res?.productDetails.map(
                            (response: any, index: number) => {
                              return (
                                <div>
                                  <div key={index} className="secondLine">
                                    <img
                                      src={response.productImage}
                                      alt=""
                                      className="Productimage"
                                    ></img>
                                    <h3 className="styleH">
                                      {response.productPrice}$
                                    </h3>
                                    <p className="styleH productName">
                                      {response.productName}
                                    </p>
                                  </div>
                                  <div id="BtnContainer">
                                    <button
                                      id="cartBtn"
                                      onClick={addCart(response)}
                                    >
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
