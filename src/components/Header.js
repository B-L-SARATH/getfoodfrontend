import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Cart from "../screens/Cart";
import { useSelector } from "react-redux";
function Header() {
  const cartdata = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-success text-color navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GetFood
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authtoken") ? (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/myorders"
                >
                  myorders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>

          {localStorage.getItem("authtoken") ? (
            <div>
              <button
                className="btn btn-light "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                cart {"  "}{" "}
              </button>
              <Badge pill bg="danger">
                {cartdata.length}
              </Badge>
              <button className="btn btn-light m-2" onClick={handlelogout}>
                {" "}
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-light m-2">
                {" "}
                Login
              </Link>
              <Link to="/signup" className="btn btn-light m-2">
                {" "}
                signup
              </Link>
            </div>
          )}
        </div>
        <Cart />
      </div>
    </nav>
  );
}

export default Header;
