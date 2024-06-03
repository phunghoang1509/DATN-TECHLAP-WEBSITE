import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminHardDisksQuery } from "../../redux/api/hardDisk";

const ListHardDisk = () => {
  const { data, isLoading, error } = useGetAdminHardDisksQuery();

  const setHardDisks = () => {
    const hardDisks = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên hardDisks",
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

    data?.hardDisks?.forEach((hardDisk) => {
      hardDisks.rows.push({
        id: hardDisk?._id,
        name: `${hardDisk?.name.substring(0, 20)}...`,
        type: `${hardDisk?.type.substring(0, 20)}...`,
        actions: (
          <>
            <Link
              to={`/admin/hardDisk/${hardDisk?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/hardDisks/${hardDisk?._id}`}
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

    return hardDisks;
  };

  return (
    <AdminLayout>
      <MetaData title={"Tất cả hardDisks"} />
      <Link to="/admin/hardDisk/new" className="btn btn-outline-success ms-2">
        <i className="fa fa-plus me-2"></i>Thêm hardDisk
      </Link>
      <MDBDataTable
        data={setHardDisks()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListHardDisk;
