import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Joi from "joi";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";

import {
  useGetColorDetailsQuery,
  useUpdateColorMutation,
} from "../../redux/api/colorApi";

const UpdateColor = () => {
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const navigate = useNavigate();
  const [color, setColor] = useState({
    name: "",
  });

  const [updateColor, { isLoading, error, isSuccess }] =
    useUpdateColorMutation();
  const { data } = useGetColorDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.color) {
      setColor({
        name: data?.graphicCard?.name,
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đã cập nhật Color");

      navigate("/admin/colors");
      window.location.reload();
    }
  }, [error, isSuccess, data]);

  const { name } = color;

  const onChange = (e) => {
    setColor({ ...color, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên Color không được để trống",
        })
        .label("Tên Color"),
    });

    const { error: validationError } = schema.validate(color, {
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
    updateColor({ id: params?.id, body: color });
  };

  return (
    <AdminLayout>
      <MetaData title={"Cập nhật Color "} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Cập nhật Color</h2>

            {/* Tên Color */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên Color
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

export default UpdateColor;
