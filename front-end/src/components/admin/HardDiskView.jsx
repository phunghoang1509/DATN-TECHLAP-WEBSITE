import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { useGetHardDiskDetailsQuery } from "../../redux/api/hardDisk";
import { Button } from "antd";

const HardDiskView = () => {
  const params = useParams();

  const [hardDisk, sethardDisk] = useState({
    name: "",
    type: "",
  });
  const { data } = useGetHardDiskDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.hardDisk) {
      sethardDisk({
        name: data?.hardDisk?.name,
        type: data?.hardDisk?.type,
      });
    }
  }, [data]);

  const { name, type } = hardDisk;

  return (
    <AdminLayout>
      <MetaData title={"Thông tin hardDisk"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body">
            <h2 className="mb-4">Thông tin hardDisk</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên hardDisk
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

            <Link to={`/admin/hardDisks`}>
              <Button type="primary">Quay lại</Button>
            </Link>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HardDiskView;
