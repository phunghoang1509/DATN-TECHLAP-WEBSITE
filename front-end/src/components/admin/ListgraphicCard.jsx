import React, { useEffect } from "react";

import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminGraphicCardsQuery } from "../../redux/api/graphicCards";

const ListgraphicCard = () => {
  const { data, isLoading, error } = useGetAdminGraphicCardsQuery();

  const setGraphicCards = () => {
    const graphicCards = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên graphicCard",
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

    data?.graphicCards?.forEach((graphicCard) => {
      graphicCards.rows.push({
        id: graphicCard?._id,
        name: `${graphicCard?.name.substring(0, 20)}...`,
        type: `${graphicCard?.type.substring(0, 20)}...`,
        actions: (
          <>
            <Link
              to={`/admin/graphicCard/${graphicCard?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/graphicCards/${graphicCard?._id}`}
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

    return graphicCards;
  };

  return (
    <AdminLayout>
      <MetaData title={"Tất cả graphicCards"} />
      <Link
        to="/admin/graphicCard/new"
        className="btn btn-outline-success ms-2"
      >
        <i className="fa fa-plus me-2"></i>Thêm graphicCard
      </Link>
      <MDBDataTable
        data={setGraphicCards()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListgraphicCard;
