import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
    taxAmount,
    shippingAmount,
  } = order;

  const isPaid = paymentInfo?.status === "Đã thanh toán" ? true : false;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 order-details">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 mb-4">Chi tiết đơn hàng của bạn</h3>
            <Link
              to={`/invoice/order/${order?._id}`}
              className="btn btn-success ms-2"
            >
              <i className="fa fa-print"></i> Hoá đơn
            </Link>
          </div>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Trạng thái</th>
                <td
                  className={
                    String(orderStatus).includes("Đã giao")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Ngày</th>
                <td>{new Date(order?.createdAt).toLocaleString("en-US")}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Thông tin vận chuyển</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Tên</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row">Số điện thoại</th>
                <td>{shippingInfo?.phoneNo}</td>
              </tr>
              <tr>
                <th scope="row">Địa chỉ</th>
                <td>
                  {shippingInfo?.address},{shippingInfo?.district},{" "}
                  {shippingInfo?.city}, {shippingInfo?.country}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Thông tin thanh toán</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Trạng thái</th>
                <td className={isPaid ? "greenColor" : "redColor"}>
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Phương thức</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              {paymentInfo?.status === "Đã thanh toán" && (
                <tr>
                  <th scope="row">Stripe ID</th>
                  <td>{paymentInfo?.id || ""}</td>
                </tr>
              )}

              <tr>
                <th scope="row">Phí vận chuyển</th>
                <td>${shippingAmount}</td>
              </tr>
              <tr>
                <th scope="row">Thuế</th>
                <td>${taxAmount}</td>
              </tr>
              <tr>
                <th scope="row">Số tiền thanh toán</th>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Các sản phẩm đã đặt:</h3>

          <hr />
          <div className="cart-item my-1">
            {orderItems?.map((item) => (
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <Link to={`/products/${item?.product}`}>{item?.name}</Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${item?.price}</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{item?.quantity} sản phẩm</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
