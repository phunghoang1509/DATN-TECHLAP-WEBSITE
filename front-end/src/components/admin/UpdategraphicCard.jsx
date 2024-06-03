import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Joi from "joi";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import {
  useGetGraphicCardDetailsQuery,
  useUpdateGraphicCardMutation,
} from "../../redux/api/graphicCards";

const UpdategraphicCard = () => {
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const navigate = useNavigate();
  const [graphicCard, setGraphicCard] = useState({
    name: "",
    type: "",
  });

  const [UpdategraphicCard, { isLoading, error, isSuccess }] =
    useUpdateGraphicCardMutation();
  const { data } = useGetGraphicCardDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.graphicCard) {
      setGraphicCard({
        name: data?.graphicCard?.name,
        type: data?.graphicCard?.type,
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đã cập nhật graphicCard");

      navigate("/admin/graphicCards");
      window.location.reload();
    }
  }, [error, isSuccess, data]);

  const { name, type } = graphicCard;

  const onChange = (e) => {
    setGraphicCard({ ...graphicCard, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên graphicCard không được để trống",
        })
        .label("Tên graphicCard"),

      type: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên type không được để trống",
        })
        .label("Type"),
    });

    const { error: validationError } = schema.validate(graphicCard, {
      abortEarly: false,
    });

    if (validationError) {
      const errorsObj = {};
      validationError.details.forEach((item) => {
        errorsObj[item.path[0]] = item.message;
      });
      setErrors(errorsObj);
      toast.error("Vui lòng không được bỏ trống!");
      return;
    }

    setIsLoadingSubmit(true);
    UpdategraphicCard({ id: params?.id, body: graphicCard });
  };

  return (
    <AdminLayout>
      <MetaData title={"Cập nhật graphicCard "} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Cập nhật graphicCard</h2>

            {/* Tên graphicCard */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên graphicCard
              </label>
              <input
                type="text"
                id="name_field"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={name}
                onChange={onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="type_field" className="form-label">
                Type
              </label>
              <input
                type="text"
                id="type_field"
                className={`form-control ${errors.type ? "is-invalid" : ""}`}
                name="type"
                value={type}
                onChange={onChange}
              />
              {errors.type && (
                <div className="invalid-feedback">{errors.type}</div>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdategraphicCard;
