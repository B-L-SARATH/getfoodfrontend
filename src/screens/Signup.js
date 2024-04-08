import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
function Signup() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://foodappbackend-gamma.vercel.app/api/createuser",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      if (err.response.status === 409) {
        alert("User already existed");
      }
      if (err.response.status === 400) {
        alert("enter valid credentials with password>6 characters");
      }
      console.log(err.message);
    }
  };
  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Header />
      <div className="container text-white mt-5" style={{ width: "500px" }}>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onchange}
              className="form-control"
            />
          </div>
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
              required={true}
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">location</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="location"
              value={data.location}
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
          <Link to="/login" className="btn btn-danger m-3 ">
            Already a user?
          </Link>
        </form>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
