import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";

import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from "../../redux/api/productsApi";

const ProductReview = () => {
  const [productId, setProductId] = useState("");

  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Đã xóa đánh giá!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [error, deleteError, isSuccess]);

  const submitHanler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
  };

  const deleteReviewHandler = (id) => {
    deleteReview({ productId, id });
  };

  const setReviews = () => {
    const reviews = {
      columns: [
        {
          label: "Xếp hạng ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Xếp hạng",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Bình luận",
          field: "comment",
          sort: "asc",
        },
        {
          label: "Người dùng",
          field: "user",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.reviews?.forEach((review) => {
      reviews.rows.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user?.name,

        actions: (
          <>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => {
                if (window.confirm("Bạn có chắc muốn xoá không?")) {
                  deleteReviewHandler(review?._id);
                }
              }}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return reviews;
  };

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <div className="row justify-content-center my-5">
        <div className="col-6">
          <form onSubmit={submitHanler}>
            <div className="mb-3">
              <label htmlFor="productId_field" className="form-label">
                Nhập ID sản phẩm
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="search_button"
              type="submit"
              className="btn btn-primary w-100 py-2"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>

      {data?.reviews?.length > 0 ? (
        <MDBDataTable
          data={setReviews()}
          className="px-3"
          bordered
          striped
          hover
        />
      ) : (
        <p className="mt-5 text-center"> Không có bài đánh giá nào</p>
      )}
    </AdminLayout>
  );
};
export default ProductReview;
