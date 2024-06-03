import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Joi from "joi";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import {
  useGetHardDiskDetailsQuery,
  useUpdateHardDiskMutation,
} from "../../redux/api/hardDisk";

const UpdatehardDisk = () => {
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const navigate = useNavigate();
  const [hardDisk, sethardDisk] = useState({
    name: "",
    type: "",
  });

  const [updateHardDisk, { isLoading, error, isSuccess }] =
    useUpdateHardDiskMutation();
  const { data } = useGetHardDiskDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.hardDisk) {
      sethardDisk({
        name: data?.hardDisk?.name,
        type: data?.hardDisk?.type,
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đã cập nhật hardDisk");

      navigate("/admin/hardDisks");
      window.location.reload();
    }
  }, [error, isSuccess, data]);

  const { name, type } = hardDisk;

  const onChange = (e) => {
    sethardDisk({ ...hardDisk, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên hardDisk không được để trống",
        })
        .label("Tên hardDisk"),

      type: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên type không được để trống",
        })
        .label("Type"),
    });

    const { error: validationError } = schema.validate(hardDisk, {
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
    updateHardDisk({ id: params?.id, body: hardDisk });
  };

  return (
    <AdminLayout>
      <MetaData title={"Cập nhật hardDisk "} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Cập nhật hardDisk</h2>

            {/* Tên graphicCard */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên hardDisk
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

export default UpdatehardDisk;
