import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminCpusQuery } from "../../redux/api/cpuApi";

const ListCpu = () => {
  const { data, isLoading, error } = useGetAdminCpusQuery();

  const setCpus = () => {
    const cpus = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên Cpu",
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

    data?.cpus?.forEach((cpu) => {
      cpus.rows.push({
        id: cpu?._id,
        name: `${cpu?.name.substring(0, 20)}...`,
        type: `${cpu?.type.substring(0, 20)}...`,
        actions: (
          <>
            <Link
              to={`/admin/cpu/${cpu?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/cpus/${cpu?._id}`}
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

    return cpus;
  };

  return (
    <AdminLayout>
      <MetaData title={"Tất cả Cpu"} />
      <Link to="/admin/cpu/new" className="btn btn-outline-success ms-2">
        <i className="fa fa-plus me-2"></i>Thêm Cpu
      </Link>
      <MDBDataTable
        data={setCpus()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListCpu;
