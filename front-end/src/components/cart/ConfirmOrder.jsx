import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { caluclateOrderCost } from "../../helpers/helpers";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  return (
    <>
      <MetaData title={"Xác nhận thông tin đặt hàng"} />
      <div className="row d-flex justify-content-between text-left">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h1 className="mb-3 text-xl">
            <b>Thông tin vận chuyển</b>
          </h1>
          <p>
            <b>Tên:</b> {user?.name}
          </p>
          <p>
            <b>Số điện thoại:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Địa chỉ:</b> {shippingInfo.country},{shippingInfo.city},{" "}
            {shippingInfo.district},{shippingInfo.address}.
          </p>

          <hr />
          <h4 className="mt-4">Các sản phẩm trong giỏ hàng của bạn:</h4>
          {cartItems?.map((item) => (
            <>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item?.image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item?.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item?.quantity} x ${item?.price} ={" "}
                      <b>${(item?.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4 className="text-lg">
              <b>Tổng quan đơn hàng</b>
            </h4>
            <hr />
            <p>
              Tổng tiền sản phẩm:{" "}
              <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Phí vận chuyển:{" "}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Thuế: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Tổng tiền thanh toán:{" "}
              <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
