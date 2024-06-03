import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminColorsQuery } from "../../redux/api/colorApi";

const ListColor = () => {
  const { data, isLoading, error } = useGetAdminColorsQuery();

  const setColors = () => {
    const colors = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên Color",
          field: "name",
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

    data?.colors?.forEach((color) => {
      colors.rows.push({
        id: color?._id,
        name: color?.name,

        actions: (
          <>
            <Link
              to={`/admin/color/${color?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/colors/${color?._id}`}
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

    return colors;
  };

  return (
    <AdminLayout>
      <MetaData title={"Tất cả Color"} />
      <Link to="/admin/color/new" className="btn btn-outline-success ms-2">
        <i className="fa fa-plus me-2"></i>Thêm Màu sắc
      </Link>
      <MDBDataTable
        data={setColors()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListColor;
