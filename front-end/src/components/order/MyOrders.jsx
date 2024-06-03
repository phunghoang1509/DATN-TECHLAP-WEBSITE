import React, { useEffect } from "react";
import {
  useMyOrdersQuery,
  useUpdateOrderMeMutation,
} from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get("order_success");
  const [updateOrderMe, { isError }] = useUpdateOrderMeMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  const deleteOrderHandler = async (orderId) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");
    if (confirmDelete) {
      try {
        await updateOrderMe(orderId, { status: "Hủy" });
        toast.success("Đơn hàng đã được hủy thành công.");
        window.location.reload();
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi hủy đơn hàng.");
      }
    }
  };

  const setOrders = () => {
    // Tạo một bản sao của mảng data?.order để không làm thay đổi mảng gốc
    const sortedOrders = [...data?.order].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Số tiền",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Tình trạng thanh toán",
          field: "status",
          sort: "asc",
        },
        {
          label: "Tình trạng đặt hàng",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Ngày đặt hàng",
          field: "orderDate",
          sort: "desc",
        },
        {
          label: "Hành động",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    sortedOrders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        amount: `$${order?.totalAmount}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        orderDate: new Date(order?.createdAt).toLocaleDateString("en-GB"),
        actions: (
          <>
            <Link to={`/me/order/${order?._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            {order?.paymentInfo?.status === "Chưa thanh toán" &&
            order?.orderStatus === "Chờ xác nhận" ? (
              <button
                onClick={() => deleteOrderHandler(order?._id)}
                className="btn btn-danger ms-2"
              >
                <i className="fa fa-trash"></i>
              </button>
            ) : null}
            <Link
              to={`/invoice/order/${order?._id}`}
              className="btn btn-success ms-2"
            >
              <i className="fa fa-print"></i>
            </Link>
          </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Đã xảy ra lỗi khi tải dữ liệu đơn hàng.</p>;

  // Kiểm tra nếu không có đơn hàng
  if (data.order.length === 0)
    return (
      <div>
        <p className="text-center fs-5 fw-bolder">Không có đơn hàng.</p>
        <div className="d-flex">
          <Link className="btn btn-warning text-white " to={"/"}>
            Mua ngay
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <h1 className="my-5 fs-4">Đơn hàng: {data?.order?.length} </h1>
      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyOrders;
