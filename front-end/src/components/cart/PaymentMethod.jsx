import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { caluclateOrderCost } from "../../helpers/helpers";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const { shippingInfo, cartItems, paymentInfo, orderItems } = useSelector(
    (state) => state.cart
  );

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }

    if (checkoutError) {
      toast.error(checkoutError?.data?.message);
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Bạn đã đặt hàng thành công");
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);

    if (method === "COD") {
      // Create COD Order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "NOT PAID",
        },
        paymentMethod: "COD",
      };

      createNewOrder(orderData);
    }

    if (method === "Card") {
      // Stripe Checkout
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "PAID",
        },
      };

      stripeCheckoutSession(orderData);
    }
  };
  const { totalPrice } = caluclateOrderCost(cartItems);
  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Chọn phương thức thanh toán</h2>

            {totalPrice >= 4000 ? (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_mode"
                  id="cardradio"
                  value="Card"
                  onChange={(e) => setMethod("Card")}
                  checked={method === "Card"}
                />
                <label className="form-check-label" htmlFor="cardradio">
                  Thanh toán online
                </label>
              </div>
            ) : (
              <>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_mode"
                    id="cardradio"
                    value="Card"
                    onChange={(e) => setMethod("Card")}
                    checked={method === "Card"}
                  />
                  <label className="form-check-label" htmlFor="cardradio">
                    Thanh toán online
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_mode"
                    id="codradio"
                    value="COD"
                    onChange={(e) => setMethod("COD")}
                    checked={method === "COD"}
                  />
                  <label className="form-check-label" htmlFor="codradio">
                    Thanh toán khi nhận hàng
                  </label>
                </div>
              </>
            )}
            <button
              id="shipping_btn"
              type="submit"
              className="btn py-2 w-100"
              disabled={isLoading}
            >
              Tiếp tục
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
