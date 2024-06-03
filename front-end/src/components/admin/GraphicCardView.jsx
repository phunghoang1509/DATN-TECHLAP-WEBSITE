import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { useGetGraphicCardDetailsQuery } from "../../redux/api/graphicCards";
import { Button } from "antd";

const GraphicCardView = () => {
  const params = useParams();

  const [graphicCard, setgraphicCard] = useState({
    name: "",
    type: "",
  });
  const { data } = useGetGraphicCardDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.graphicCard) {
      setgraphicCard({
        name: data?.graphicCard?.name,
        type: data?.graphicCard?.type,
      });
    }
  }, [data]);

  const { name, type } = graphicCard;

  return (
    <AdminLayout>
      <MetaData title={"Thông tin graphicCard"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body">
            <h2 className="mb-4">Thông tin graphicCard</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên graphicCard
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

            <Link to={`/admin/graphicCards`}>
              <Button type="primary">Quay lại</Button>
            </Link>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GraphicCardView;
