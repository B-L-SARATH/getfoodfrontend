import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";
import { useSelector, useDispatch } from "react-redux";
import { remove, clear } from "../store/Cartslice";
import axios from "axios";
function Cart() {
  const cartdata = useSelector((state) => state.cart);
  //   const [cartdata, setcartdata] = useState([]);
  //   useEffect(() => {
  //     const data = localStorage.getItem("cartitems");
  //     if (data) {
  //       setcartdata(JSON.parse(data));
  //     }
  //   }, []);
  const dispatch = useDispatch();
  const removeitem = (index) => {
    dispatch(remove(index));
  };
  let totalprice = 0;

  for (let i = 0; i < cartdata.length; i++) {
    totalprice = totalprice + cartdata[i].price;
  }

  const handlecheckout = async () => {
    let checkoutdata = {
      email: localStorage.getItem("credential"),
      orders: cartdata,
      ordertime: new Date().toLocaleString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Kolkata",
      }),
    };
    try {
      const response = await axios.post(
        "https://foodappbackend-gamma.vercel.app/api/orderdata",
        checkoutdata
      );
      // console.log(response.data);
      dispatch(clear());
      alert("Order is successfull");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Popup>
      {cartdata && cartdata.length > 0 ? (
        <div className="container">
          <table className="table text-white">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Option</th>
                <th>Amount</th>
                <th>#</th>
              </tr>
              {cartdata.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{item.name}</th>
                    <th>{item.qty}</th>
                    <th>{item.size}</th>
                    <th>{item.price}</th>
                    <th>
                      {" "}
                      {/* <i
                    className="fa fa-eye"
                    style={{ color: "white !important", cursor: "pointer" }}
                  ></i> */}
                      <button
                        className="btn btn-danger bg-danger btn-sm"
                        onClick={() => {
                          removeitem(index);
                        }}
                      >
                        x
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="m-3"> TOTAL PRICE : {totalprice} /-</p>
          <button className="btn btn-success m-3" onClick={handlecheckout}>
            checkout
          </button>
        </div>
      ) : (
        <div className="text-white fs-2"> CART IS EMPTY</div>
      )}
    </Popup>
  );
}

export default Cart;
