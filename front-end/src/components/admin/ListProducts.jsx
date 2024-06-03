import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useGetAdminProductsQuery,
  useUpdateStatusActiveMutation,
} from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();
  const [updateStatusActive, { error: updateStatusActiveError }] =
    useUpdateStatusActiveMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (updateStatusActiveError) {
      toast.error(updateStatusActiveError?.data?.message);
    }
  }, [error, updateStatusActiveError]);

  const toggleUserStatus = (id, statusActive) => {
    const newStatus = statusActive === "active" ? "deactive" : "active";

    // Hiển thị xác nhận trước khi thay đổi trạng thái
    const confirmToggle = window.confirm(
      `Bạn có chắc chắn muốn ${
        newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"
      } sản phẩm này không?`
    );

    if (confirmToggle) {
      updateStatusActive({ id, body: { statusActive: newStatus } })
        .then(() => {
          toast.success(
            `Sản phẩm đã ${
              newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"
            } thành công!`
          );
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    }
  };

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên sản phẩm",
          field: "name",
          sort: "asc",
        },
        {
          label: "Số lượng",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
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

    data?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: `${product?.name.substring(0, 20)}...`,
        stock: product?.stock,
        status: (
          <span
            className={
              product?.statusActive === "active"
                ? "toggle-active"
                : "toggle-deactive"
            }
          >
            {product?.statusActive === "active" ? "active" : "deactive"}
          </span>
        ),
        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <Link
              to={`/admin/product/${product?._id}`}
              className="btn btn-outline-info ms-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className={`btn ms-2 ${
                product?.statusActive === "active"
                  ? "toggle-active"
                  : "toggle-deactive"
              }`}
              onClick={() =>
                toggleUserStatus(product?._id, product?.statusActive)
              }
              disabled={isLoading}
            >
              {product?.statusActive === "active" ? (
                <FaToggleOn size={28} />
              ) : (
                <FaToggleOff size={28} />
              )}
            </button>
          </>
        ),
      });
    });

    return products;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Tất cả sản phẩm"} />
      <div className="d-flex pt-0">
        <Link to="/admin/product/new" className="btn btn-outline-success ms-2">
          <i className="fa fa-plus me-2"></i>Thêm sản phẩm
        </Link>
        <h3 className="my-5">{data?.products?.length} Sản phẩm</h3>
      </div>

      <MDBDataTable
        data={setProducts()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListProducts;
