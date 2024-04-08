import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Login() {
  const [islogged, setislogged] = useState(true);
  console.log(document.cookie);
  const verifyuser = async (e) => {
    try {
      const response = await axios.post(
        "https://foodappbackend-gamma.vercel.app/api/verifyuser",
        null,
        {
          withCredentials: true,
        }
      );
      if (response) {
        setislogged(response.status);
        console.log(response);
      }
    } catch (err) {
      if (err.response) {
        setislogged(err.response.status);
        console.log(err.response);
      }
    }
  };
  // useEffect(() => {
  //   verifyuser();
  // }, []);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log("submiited to backend");
    try {
      const response = await axios.post(
        "https://foodappbackend-gamma.vercel.app/api/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      localStorage.setItem("authtoken", response.data.authtoken);
      localStorage.setItem("credential", data.email);
      window.location.href = "/";
    } catch (err) {
      console.log(err.message);
      console.log({ sucess: false });
      alert("enter valid credentials");
    }
  };
  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  {
    return islogged ? (
      <div>
        <Header />
        <div
          className="container text-white mt-5"
          style={{ width: "500px", backgroundColor: "black" }}
        >
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={data.email}
                onChange={onchange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={data.password}
                onChange={onchange}
              />
            </div>

            <button type="submit" className="btn btn-success m-3">
              Submit
            </button>
            <Link to="/signup" className="btn btn-danger m-3 ">
              New user?
            </Link>
          </form>
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    ) : (
      <div>
        <Header />
        <div className="text-white fs-2 text-center">
          you are already in login
        </div>
      </div>
    );
  }
}

export default Login;
