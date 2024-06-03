import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./invoice.css";
import { useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};
  console.log(data);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);
  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order?._id}.pdf`);
    });
  };
  if (isLoading) return <Loader />;

  return (
    <div>
      <MetaData title={"Order Invoice"} />
      <div className="order-invoice my-5 ">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={handleDownload}>
            <i className="fa fa-print"></i>Tải hóa đơn xuống
          </button>
        </div>
        <div id="order_invoice" className="p-3 shadow-lg">
          <header className="clearfix">
            <div id="logo">
              <img
                className="bg-black p-4"
                src="/images/logo.png"
                alt="Company Logo"
              />
            </div>
            <h1 className="pb-2">Hoá đơn # {order?._id}</h1>
            <div id="company" className="clearfix">
              <div>TechLap</div>
              <div>Hà Nội</div>
              <div>(84) 789257816</div>
              <div>
                <a href="mailto:techlap@gmail.com">techlap@gmail.com</a>
              </div>
            </div>
            <div id="project" className="text-start">
              <div>
                <span>Tên</span> {user?.name}
              </div>
              <div>
                <span>Email</span> {user?.email}
              </div>
              <div>
                <span>Điện thoại</span> {shippingInfo?.phoneNo}
              </div>
              <div>
                <span>Địa chỉ</span>
                {shippingInfo?.address},{shippingInfo?.district},{" "}
                {shippingInfo?.city},{""}
                {shippingInfo?.country}
              </div>
              <div>
                <span>Ngày</span>{" "}
                {new Date(order?.createdAt).toLocaleString("vn-VN")}
              </div>
              <div>
                <span>Trạng thái</span> {paymentInfo?.status}
              </div>
            </div>
          </header>
          <main>
            <div class="table-responsive mt-5">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-center desc">Tên</th>
                    <th class="text-center unit">Giá </th>
                    <th class="text-center qty">Số lượng</th>
                    <th class="text-center total">Số tiền</th>
                    <th class="text-center total"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems?.map((item) => (
                    <tr>
                      <td class="text-center desc">{item?.name}</td>
                      <td class="text-center unit">${item?.price}</td>
                      <td class="text-center qty">{item?.quantity}</td>
                      <td class="text-center total">
                        ${item?.price * item?.quantity}
                      </td>
                      <td class="text-center qty"></td>
                    </tr>
                  ))}

                  <tr>
                    <td colspan="4" class="text-end">
                      <b>TỔNG PHỤ</b>
                    </td>
                    <td class="text-center">${order?.itemsPrice}</td>
                  </tr>

                  <tr>
                    <td colspan="4" class="text-end">
                      <b>THUẾ 15%</b>
                    </td>
                    <td class="text-center">${order?.taxAmount}</td>
                  </tr>

                  <tr>
                    <td colspan="4" class="text-end">
                      <b>PHÍ VẬN CHUYỂN</b>
                    </td>
                    <td class="text-center">${order?.shippingAmount}</td>
                  </tr>

                  <tr>
                    <td colspan="4" class="text-end">
                      <b>TỔNG CỘNG</b>
                    </td>
                    <td class="text-center">${order?.totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="notices" class="mt-4">
              <div>Lưu ý:</div>
              <div class="notice"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
