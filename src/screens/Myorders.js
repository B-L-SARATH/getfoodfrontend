import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Myorders() {
  const authtoken = localStorage.getItem("authtoken");
  const [responsestatus, setresponsestatus] = useState("");
  const [myorders, setmyorders] = useState([]);
  const myorder = async () => {
    try {
      const response = await axios.post(
        "https://foodappbackend-gamma.vercel.app/api/myorder",
        {
          email: localStorage.getItem("credential"),
        },
        {
          headers: {
            Authorization: authtoken,
          },
        }
      );
      if (response) {
        setresponsestatus(response.status);
        console.log(response);
        console.log(response.status);
      }
      setmyorders(response.data.orders);
      // console.log(myorders);
    } catch (err) {
      if (err.response) {
        setresponsestatus(err.response.status);
        console.log(err.response.status);
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    myorder();
  }, []);
  {
    if (responsestatus === 200) {
      return (
        <div>
          <Header />
          <div className="text-white container p-5 text-center">
            {myorders ? (
              <h1 className="m-3 text-white">My orders</h1>
            ) : (
              <div className="text-white fs-2"> No orders placed yet</div>
            )}

            {myorders
              ? myorders.reverse().map((order) => {
                  return (
                    <div
                      className="row"
                      style={{
                        border: "1px solid grey",
                        padding: "20px",
                        margin: "10px",
                        width: "100%",
                      }}
                    >
                      {order.map((item, index) => {
                        if (index === 0) {
                          return (
                            <h3 className="text-white" key={index}>
                              {item.ordertime}{" "}
                            </h3>
                          );
                        } else {
                          return (
                            <div
                              className="card m-3 text-black col-md-3"
                              style={{ width: "15rem", height: " 20rem" }}
                              key={index}
                            >
                              <img
                                src={item.img}
                                class="card-img-top"
                                alt="..."
                                style={{ height: "150px" }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">qty:{item.qty}</p>
                                <p className="card-text">size:{item.size}</p>
                                <p> Total price: {item.price}</p>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })
              : ""}
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div className="text-white text-center fs-3">
            Login to view your orders{" "}
          </div>
          ;
        </div>
      );
    }
  }
}

export default Myorders;
