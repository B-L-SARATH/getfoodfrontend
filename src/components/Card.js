import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../store/Cartslice";
function Card(props) {
  const cartdata = useSelector((state) => state.cart);
  const options = props.options;
  const priceoptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState(priceoptions[0]);
  const dispatch = useDispatch();
  const totalprice = qty * parseInt(options[size]);

  const additem = (item) => {
    for (let i = 0; i < cartdata.length; i++) {
      if (cartdata[i].name == item.name && cartdata[i].size == size) {
        dispatch(
          update({
            name: item.name,
            img: item.img,
            qty: qty,
            size: size,
            price: totalprice,
            index: i,
          })
        );
        return;
      }
    }
    dispatch(
      add({
        name: item.name,
        img: item.img,
        qty: qty,
        size: size,
        price: totalprice,
      })
    );
  };

  // useEffect(() => {
  //   localStorage.setItem("cartitems", JSON.stringify(cartdata));
  // }, [cartdata]);
  return (
    <div className="card m-3 " style={{ width: "14rem", height: " 25rem" }}>
      <img
        src={props.img}
        class="card-img-top"
        alt="..."
        style={{ height: "150px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">Some quick example text</p>
        <div>
          <select
            name=""
            id=""
            className="rounded m-2 bg-success text-white"
            onChange={(e) => setqty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id=""
            className="rounded m-2 bg-success text-white"
            onChange={(e) => setsize(e.target.value)}
          >
            {priceoptions.map((item, index) => {
              return (
                <option key={item.id} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <span className="fs-5"> {totalprice}/-</span>
        </div>
        <hr />
        <button
          className="btn btn-success"
          onClick={() => {
            additem(props);
          }}
          disabled={props.isloggedin ? false : true}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
