import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { productDetails } from "../models/formInterface";

function FirstLine() {
  const navigate = useNavigate();
  const navigateTo = (x: productDetails) => (e: any) => {
    e.preventDefault();
    let link: any = [];
    link.push(x);
    navigate("/products", { state: { link } });
  };
  const [imageArray, setImageArray] = useState<productDetails[]>([]);
  useEffect(() => {
    axios.get("https://watson-studio-16.onrender.com/getProduct").then((res: any) => {
      setImageArray(res.data);
    });
  }, []);
  return (
    <div className="firstlineContainer">
      {imageArray.map((res: any, index: number) => {
        return (
          <div key={index} className="firstLine">
            <img
              src={res.sectionImage}
              alt=""
              className="image"
              onClick={navigateTo(res)}
            ></img>
            <h4>{res.section}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default FirstLine;
