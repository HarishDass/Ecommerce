import image1 from "../assets/image/light.jpg";
import image2 from "../assets/image/dark.jpg";
import image3 from "../assets/image/dark1.jpg";
import image4 from "../assets/image/light1.jpg";
import { useEffect, useState } from "react";
import Loader from "../usables/reusables/loader";
import FirstLine from "./FirstLine";
import NavBar from "../usables/navbar";
const model = [image1, image2, image3, image4];
const modelIndex = Math.floor(Math.random() * model.length);
function Bannar() {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    const img = new Image();
    img.src = model[modelIndex];
    img.onload = () => {
      setImage(model[modelIndex]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model[modelIndex]]);
  return (
    <div>
      <NavBar />
      {image ? (
        <div id="banner">
          <img
            src={image}
            className={`banner1${!image ? " loading" : " loaded"}`}
            alt=""
            loading="lazy"
          ></img>

          <div className={image.match("light") ? "dark" : "light"}>
            <h1 id="title1">Discover What's New:</h1>{" "}
            <h2 id="title2">Trendsetting Styles Await!</h2>
            <p id="para">
              Embark on a style journey where glamour meets innovation! Dive
              into an alluring realm of fashion-forward elegance, where each
              trend is a statement, and every style choice radiates irresistible
              charm.
            </p>
          </div>
        </div>
      ) : (
        <div id="loader">
          <Loader  />
        </div>
      )}
      <div className="subHeadings">
        <h1 className="firstlineTitle">View Products</h1>
        <div className="underline"></div>
      </div>
      <FirstLine />
    </div>
  );
}

export default Bannar;
