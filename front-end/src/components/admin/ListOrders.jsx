import React, { useState } from "react";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { useGetAminOrdersQuery } from "../../redux/api/orderApi";

const ListOrders = () => {
  const { data, isLoading } = useGetAminOrdersQuery();

  const [paymentFilter, setPaymentFilter] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("");

  const handlePaymentFilterChange = (event) => {
    setPaymentFilter(event.target.value);
  };

  const handleOrderStatusFilterChange = (event) => {
    setOrderStatusFilter(event.target.value);
  };

  const filterOrders = (orders) => {
    let filteredOrders = orders;

    if (paymentFilter === "paid") {
      filteredOrders = filteredOrders.filter(
        (order) => order?.paymentInfo?.status === "paid"
      );
    } else if (paymentFilter === "unpaid") {
      filteredOrders = filteredOrders.filter(
        (order) => order?.paymentInfo?.status !== "paid"
      );
    }

    if (orderStatusFilter !== "") {
      filteredOrders = filteredOrders.filter(
        (order) => order?.orderStatus === orderStatusFilter
      );
    }

    return filteredOrders;
  };

  const sortOrdersByDate = (orders) => {
    return orders
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const setOrders = () => {
    let filteredOrders = filterOrders(data?.orders || []);
    filteredOrders = sortOrdersByDate(filteredOrders);

    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Ngày đặt hàng",
          field: "orderDate",
          sort: "asc",
        },
        {
          label: "Tình trạng thanh toán",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Tình trạng đơn hàng",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Hành động",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    filteredOrders.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        orderDate: new Date(order?.createdAt).toLocaleDateString("en-GB"),
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              to={`/admin/orders/${order?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout className="mt-0">
      <h4 className="my-1 mt-0 pt-0">{data?.orders?.length} Đơn hàng</h4>
      <div className="mb-3 d-flex justify-content-between">
        <div>
          <label htmlFor="paymentFilter" className="form-label">
            Lọc theo tình trạng thanh toán:
          </label>
          <select
            id="paymentFilter"
            className="form-select"
            value={paymentFilter}
            onChange={handlePaymentFilterChange}
          >
            <option value="">Tất cả</option>
            <option value="paid">PAID</option>
            <option value="unpaid">NOT PAID</option>
          </select>
        </div>
        <div>
          <label htmlFor="orderStatusFilter" className="form-label">
            Lọc theo tình trạng đơn hàng:
          </label>
          <select
            id="orderStatusFilter"
            className="form-select"
            value={orderStatusFilter}
            onChange={handleOrderStatusFilterChange}
          >
            <option value="">Tất cả</option>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Chờ lấy hàng">Chờ lấy hàng</option>
            <option value="Chờ giao hàng">Chờ giao hàng</option>
            <option value="Đã giao">Đã giao</option>
            <option value="Trả hàng">Trả hàng</option>
          </select>
        </div>
      </div>

      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListOrders;
