import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Header";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";
function Home() {
  const cartstate = useSelector((state) => state.cart);

  const [search, setsearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);
  const [fooditems, setfooditems] = useState([]);
  const [isloggedin, setisloggedin] = useState(false);

  useEffect(() => {
    const checklogin = async () => {
      try {
        const response = await axios.get(
          " https://foodappbackend-gamma.vercel.app/api/isloggedin",
          {
            headers: {
              authorization: localStorage.getItem("authtoken"),
            },
          }
        );
        // console.log("login check", response.data);
        if (response.data.success) {
          setisloggedin(true);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    checklogin();
  }, []);

  const loaditems = async () => {
    try {
      const response = await axios.get(
        " https://foodappbackend-gamma.vercel.app/api/fooditems"
      );
      // console.log("data retrieved successfully");
      const result = response.data;
      setfoodcat(result[1]);
      setfooditems(result[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loaditems();
  }, []);
  return (
    <div>
      <Navbar />

      {/* Couresel */}
      <form className="d-flex m-5 d-md-none" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search item"
          aria-label="Search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </form>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide d-none d-md-block"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner ">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://source.unsplash.com/1500x500/?burger"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(40%)" }}
            />
            <div className="carousel-caption d-md-block">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search item"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://source.unsplash.com/1500x500/?pizza"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(40%)" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/1500x500/?pastry"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(40%)" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* fooditems */}

      <div style={{ overflow: "hidden" }}>
        {foodcat.length > 0
          ? foodcat.map((data, index) => {
              return (
                <div className="row mb-5 p-3" key={index}>
                  <div key={data.id} className="text-white mr-5">
                    {" "}
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fooditems.length > 0
                    ? fooditems
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((item, index) => {
                          return (
                            <div
                              key={item.id}
                              className="col-12  col-sm-6 col-md-3"
                            >
                              <Card
                                name={item.name}
                                img={item.img}
                                options={item.options[0]}
                                isloggedin={isloggedin}
                              />
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
