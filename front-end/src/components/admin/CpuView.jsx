import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { useGetCpuDetailsQuery } from "../../redux/api/cpuApi";
import { Button } from "antd";

const CpuView = () => {
  const params = useParams();

  const [cpu, setcpu] = useState({
    name: "",
    type: "",
  });
  const { data } = useGetCpuDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.cpu) {
      setcpu({
        name: data?.cpu?.name,
        type: data?.cpu?.type,
      });
    }
  }, [data]);

  const { name, type } = cpu;

  return (
    <AdminLayout>
      <MetaData title={"Thông tin Cpu"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body">
            <h2 className="mb-4">Thông tin Cpu</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên Cpu
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

            <Link to={`/admin/cpus`}>
              <Button type="primary">Quay lại</Button>
            </Link>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CpuView;
