import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const NavBar: React.FC = () => {
  const location = useLocation();
  const [navData] = useState<string[]>([
    "home",
    "products",
    "latest",
    "contact",
  ]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [menu, setMenu] = useState<boolean>(false);
  const showMenu = () => {
    setMenu(!menu);
  };
  const navigateTo = () => {
    navigate('/cart')
  }
  const sumbit = () => {
    axios
      .get(`http://localhost:5000/getEachProduct/${search}`)
      .then((res: any) => {
        let link = res.data;
        console.log(res);

        setSearch("");
        navigate("/products", { state: { link } });
      });
  };
  return (
    <div className="navBar">
      <div id="hoverBar" onClick={showMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className="logo">
        <h2 id="firsthead">ETHIC</h2>
        <h2 id="secondhead">ELEG</h2>
      </div>
      <div className="navbarSearchDiv">
        <input
          type="text"
          className="navbarSearch"
          placeholder="search products,sections,etc.."
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.shGgcLfMYI35C9TbnZQzLgAAAA&pid=Api&P=0&h=180"
          alt=""
          className="searchImage"
          onClick={sumbit}
        ></img>
      </div>
      <ul className={`unorderList${menu ? "show" : ""}`}>
        {navData.map((x: string, index: number) => {
          return (
            <li
              key={index}
              className={location.pathname === "/" + x ? "active-link" : "list"}
            >
              {x!=='home' ? <Link
                to={"/" + x}
                className={
                  location.pathname === "/" + x
                    ? "active-link-list"
                    : "list-link"
                }
              >
                {x.toLocaleUpperCase()}
              </Link> : (<Link
                to={"/"}
                className={
                  location.pathname === "/" + x
                    ? "active-link-list"
                    : "list-link"
                }
              >
                {x.toLocaleUpperCase()}
              </Link>)}
            </li>
          );
        })}
      </ul>
      <img
        src="https://tse3.mm.bing.net/th?id=OIP.5G40GHwD9wPG985VLqdrYwHaHa&pid=Api&P=0&h=180"
        alt=""
        className="cartImage"
        onClick={navigateTo}
      ></img>
    </div>
  );
};

export default NavBar;
