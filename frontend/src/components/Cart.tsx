import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import NavBar from "../usables/navbar";
import Loader from "../usables/reusables/loader";
import { InputNumber } from "primereact/inputnumber";
function Cart() {
  const [products, setProducts] = useState([]);
  const [loader, SetLoader] = useState(false);
  useEffect(() => {
    SetLoader(true);
    axios.get("http://localhost:5000/getCart").then((res: any) => {
      res.data.forEach((resp: any) => {
        resp.edit = false;
      });
      setProducts(res.data);
      SetLoader(false);
    });
  }, []);
  const footer = () => {
    let totalPrice = products.reduce((acc: any, cur: any) => {
      let x = cur.productTotal;
      acc += x;
      return acc;
    }, 0);
    let totalItems = products.reduce((acc: any, cur: any) => {
      let x = cur.count;
      acc += x;
      return acc;
    }, 0);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h3>Total Price = {totalPrice} $</h3>
        <h3>Total Count ={totalItems} Items</h3>
      </div>
    );
  };
  const change = (product: any) => (e: any) => {
    const number = Number(e.target.value);
    const updatedProducts: any = products.map((p: any) => {
      if (p._id === product._id) {
        return {
          ...p,
          count: number,
          productTotal: number * p.productPrice,
        };
      }
      return p;
    });

    setProducts(updatedProducts);
  };
  const del = (product: any) => (e: any) => {
    e.preventDefault();
    axios.delete("http://localhost:5000/delCart", product);
    setProducts(
      products.filter(
        (res: any) => JSON.stringify(res) !== JSON.stringify(product)
      )
    );
  };
  const edit = (product: any) => (e: any) => {
    e.preventDefault();
    const updatedProducts: any = products.map((p: any) => {
      if (p._id === product._id) {
        return {
          ...p,
          edit: true,
        };
      }
      return p;
    });
    setProducts(updatedProducts);
  };
  const update = (product: any) => (e: any) => {
    e.preventDefault();
    const updatedProducts: any = products.map((p: any) => {
      if (p._id === product._id) {
        return {
          ...p,
          edit: false,
        };
      }
      return p;
    });
    setProducts(updatedProducts);

    axios
      .put("http://localhost:5000/updateCart", product)
      .then((res: any) => {
        setProducts(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const count = (product: any) => {
    return (
      <div>
        {product?.edit === true ? (
          <div>
            <InputNumber
              value={product.count}
              inputStyle={{ width: 70 }}
              onValueChange={change(product)}
            ></InputNumber>
          </div>
        ) : (
          product.count
        )}
      </div>
    );
  };
  const DeleteFunction = (product: any) => {
    return (
      <div id="functions">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.JymbH67S1jo-lRK9jNGHrQHaHa&pid=Api&P=0&h=180"
          alt=""
          width={20}
          style={{ cursor: "pointer" }}
          height={20}
          onClick={del(product)}
        ></img>
        {product.edit ? (
          <>
            {" "}
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.AZnVZjOEQHcAI-YEEbjM6QHaHa&pid=Api&P=0&h=180"
              alt=""
              width={20}
              style={{ cursor: "pointer" }}
              height={20}
              onClick={update(product)}
            ></img>
          </>
        ) : (
          <>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.0W25kM3EhzY9nHSn91XoKAHaHa&pid=Api&P=0&h=180"
              alt=""
              width={20}
              style={{ cursor: "pointer" }}
              height={20}
              onClick={edit(product)}
            ></img>
          </>
        )}
      </div>
    );
  };
  function getImage(product: any) {
    return <img src={product.productImage} alt="" width={50} height={50}></img>;
  }

  return (
    <div>
      <NavBar />
      {!loader ? (
        <div className="cartContainer">
          <DataTable
            value={products}
            tableStyle={{ minWidth: "50rem" }}
            footer={footer}
            paginator
            rows={4}
          >
            <Column field="productName" header="Section"></Column>
            <Column body={getImage} header="Name"></Column>
            <Column field="productPrice" header="Price"></Column>
            <Column body={count} header="ItemsCount"></Column>

            <Column field="productTotal" header="Total"></Column>
            <Column body={DeleteFunction} header=""></Column>
          </DataTable>
        </div>
      ) : (
        <div id="loader">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Cart;
