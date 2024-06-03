import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminCategoriesQuery } from "../../redux/api/categoryApi";

const ListCategory = () => {
  const { data, isLoading, error } = useGetAdminCategoriesQuery();

  const setCategories = () => {
    const categories = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên danh mục",
          field: "name",
          sort: "asc",
        },
        {
          label: "Slug",
          field: "slug",
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

    data?.categories?.forEach((category) => {
      categories.rows.push({
        id: category?._id,
        name: `${category?.name.substring(0, 20)}...`,
        slug: `${category?.slug.substring(0, 20)}...`,
        actions: (
          <>
            <Link
              to={`/admin/category/${category?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/categories/${category?._id}`}
              className="btn btn-outline-info ms-2"
            >
              <i className="fa fa-eye"></i>
            </Link>

            {/* <button
              className="btn btn-outline-danger ms-2"
              onClick={() => {
                if (window.confirm("Bạn có chắc muốn xoá không?")) {
                  deleteProductHandler(product?._id);
                }
              }}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button> */}
          </>
        ),
      });
    });

    return categories;
  };

  return (
    <AdminLayout>
      <MetaData title={"Tất cả danh mục"} />
      <Link to="/admin/category/new" className="btn btn-outline-success ms-2">
        <i className="fa fa-plus me-2"></i>Thêm danh mục
      </Link>
      <MDBDataTable
        data={setCategories()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListCategory;
