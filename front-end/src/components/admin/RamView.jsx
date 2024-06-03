import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { useGetRamDetailsQuery } from "../../redux/api/ram";

const RamView = () => {
  const params = useParams();

  const [ram, setram] = useState({
    name: "",
    type: "",
  });
  const { data } = useGetRamDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.ram) {
      setram({
        name: data?.ram?.name,
        type: data?.ram?.type,
      });
    }
  }, [data]);

  const { name, type } = ram;

  return (
    <AdminLayout>
      <MetaData title={"Thông tin Ram"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body">
            <h2 className="mb-4">Thông tin Ram</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên Ram
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="type_field" className="form-label">
                Type
              </label>
              <input
                type="text"
                id="type_field"
                className="form-control"
                name="type"
                value={type}
                disabled
              />
            </div>

            <Link to={`/admin/rams`}>
              <button className="btn btn-outline-primary">Quay lại</button>
            </Link>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RamView;
