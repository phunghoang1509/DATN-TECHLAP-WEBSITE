import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminRamsQuery } from "../../redux/api/ram";

const ListRam = () => {
  const { data, isLoading, error } = useGetAdminRamsQuery();

  const setRams = () => {
    const rams = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên Ram",
          field: "name",
          sort: "asc",
        },
        {
          label: "Type",
          field: "type",
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

    data?.rams?.forEach((ram) => {
      rams.rows.push({
        id: ram?._id,
        name: `${ram?.name.substring(0, 20)}...`,
        type: `${ram?.type.substring(0, 20)}...`,
        actions: (
          <>
            <Link
              to={`/admin/ram/${ram?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/rams/${ram?._id}`}
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

    return rams;
  };

  return (
    <AdminLayout>
      <MetaData title={"Tất cả rams"} />
      <Link to="/admin/ram/new" className="btn btn-outline-success ms-2">
        <i className="fa fa-plus me-2"></i>Thêm Ram
      </Link>
      <MDBDataTable
        data={setRams()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListRam;
