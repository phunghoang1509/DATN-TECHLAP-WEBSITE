import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { useGetColorDetailsQuery } from "../../redux/api/colorApi";
import { Button } from "antd";

const ColorView = () => {
  const params = useParams();

  const [color, setcolor] = useState({
    name: "",
  });
  const { data } = useGetColorDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.color) {
      setcolor({
        name: data?.color?.name,
      });
    }
  }, [data]);

  const { name } = color;

  return (
    <AdminLayout>
      <MetaData title={"Thông tin Color"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body">
            <h2 className="mb-4">Thông tin Color</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên Màu
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

            <Link to={`/admin/colors`}>
              <Button type="primary">Quay lại</Button>
            </Link>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ColorView;
