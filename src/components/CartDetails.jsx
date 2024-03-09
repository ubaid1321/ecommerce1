import { useState, useEffect } from "react";
import {addToCart,emptyCart,removeSingleItems,removeToCart,} from "../redux/app/features/cartSlice";
import "./cartstyle.css";
import { useDispatch, useSelector } from "react-redux";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);

  const dispatch = useDispatch();
  
  const [totalPrice, setTotalPrice] = useState();
  
  const [totalQuantity, setTotalQuantity] = useState(0);

  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
  };

  const handleremove = (e) => {
    dispatch(removeSingleItems(e));
  };
  const emptyCartitem = () => {
    dispatch(emptyCart());
  };
  const total = () => {
    let totalPrice = 0;
    carts.map((ele, ind) => {
      totalPrice = ele.price * ele.qnty + totalPrice;
    });
    setTotalPrice(totalPrice);
  };
  const quantity = () => {
    let totalQuantity = 0;
    carts.map((ele, ind) => {
      totalQuantity = ele.qnty + totalQuantity;
    });
    setTotalQuantity(totalQuantity);
  };
  useEffect(() => {
    total();
  }, [total]);
  useEffect(() => {
    quantity();
  }, [quantity]);

 

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    onClick={emptyCartitem}
                    className="btn btn-danger mt-0 btn-sm mb-2"
                  >
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>Empty</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="card-body p-0">
                {carts.length === 0 ? (
                  <table className="table cart-table mb-0">
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <div className="cart-empty">
                            <i className="fa fa-shopping-cart"></i>
                            <p>Your Cart is Empty</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="table cart-table mb-0 table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty.</th>
                        <th className="text-right ">
                          <span id="amount" className="amount">
                            Total Amount
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((data, index) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <button
                                  onClick={() => handleDecrement(data.id)}
                                  className="prdct-delete"
                                >
                                  <i className="fa fa-trash-alt mr-2"></i>
                                </button>
                              </td>
                              <td>
                                <div className="product-img">
                                  <img src={data.imgdata} alt="" />
                                </div>
                              </td>
                              <td>
                                <div className="product-img">
                                  <p>{data.dish}</p>
                                </div>
                              </td>
                              <td>{data.price}</td>
                              <td>
                                <div className="prdct-qty-container">
                                  <button
                                    onClick={
                                      data.qnty <= 1
                                        ? () => handleDecrement(data.id)
                                        : () => handleremove(data)
                                    }
                                    className="prdct-qty-btn"
                                    type="button"
                                  >
                                    <i className="fa fa-minus"></i>
                                  </button>
                                  <input
                                    type="text"
                                    className="qty-input-box"
                                    value={data.qnty}
                                    disabled
                                  />
                                  <button
                                    onClick={() => handleIncrement(data)}
                                    className="prdct-qty-btn"
                                    type="button"
                                  >
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="text-right">
                                {data.qnty * data.price}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={3}>&nbsp;</th>
                        <th>
                          Items In Cart <span className="ml-2 mr-2">: </span>
                          <span className="text-danger">{totalQuantity}</span>
                        </th>
                        <th className="text-right">
                          Total Price <span className="ml-2 mr-2">: </span>
                          <span className="text-danger">{totalPrice}</span>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
