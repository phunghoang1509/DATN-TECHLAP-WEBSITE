import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const params = useParams();
  const { data } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updatetOrder, { error, isSuccess }] = useUpdateOrderMutation();

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
  const isPaid = paymentInfo?.status === "đã thanh toán" ? true : false;
  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đã cập nhật đơn hàng!");
      window.location.reload();
    }
  }, [error, isSuccess]);

  const updateOrderHanler = (id) => {
    const data = { status };
    updatetOrder({ id, body: data });
  };

  return (
    <AdminLayout>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Chi tiết đơn hàng</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Tình trạng đơn hàng</th>
                <td
                  className={
                    String(orderStatus).includes("Đã giao hàng")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Thông tin vận chuyển</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Tên</th>
                <td>{user?.name}</td>
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
              <tr>
                <th scope="row">Stripe ID</th>
                <td>{paymentInfo?.id || "null"}</td>
              </tr>
              <tr>
                <th scope="row">Phí vận chuyển</th>
                <td>${shippingAmount}</td>
              </tr>
              <tr>
                <th scope="row">Thuế</th>
                <td>${taxAmount}</td>
              </tr>
              <tr>
                <th scope="row">Số tiền đã thanh toán</th>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Các sản phẩm trong đơn hàng:</h3>

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
                  <p>{item?.quantity} laptop</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Trạng thái</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Đã giao">Đã giao</option>
              <option value="Hoàn tất">Hoàn tất</option>
              <option value="Hủy">Hủy</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={() => updateOrderHanler(order?._id)}
          >
            Cập nhật trạng thái
          </button>

          <h4 className="mt-5 mb-3">Hoá đơn đặt hàng</h4>
          <Link
            to={`/invoice/order/${order._id}`}
            className="btn btn-success w-100"
          >
            <i className="fa fa-print"></i> Tạo hóa đơn
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
