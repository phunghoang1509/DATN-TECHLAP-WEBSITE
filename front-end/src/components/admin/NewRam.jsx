import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Joi from "joi";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import { useCreateRamMutation } from "../../redux/api/ram";

const NewRam = () => {
  const navigate = useNavigate();
  const [ram, setRam] = useState({
    name: "",
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [createRam, { error, isSuccess }] = useCreateRamMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Ram đã được tạo!");
      setTimeout(() => {
        navigate("/admin/rams");
      }, 2000);
    }
  }, [error, isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRam({ ...ram, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên Ram không được để trống",
        })
        .label("Tên Ram"),

      type: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên type không được để trống",
        })
        .label("Type"),
    });

    const { error: validationError } = schema.validate(ram, {
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
    createRam(ram);
  };

  return (
    <AdminLayout>
      <MetaData title={"Thêm Ram mới"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Thêm Ram</h2>

            {/* Tên danh mục */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên Ram
              </label>
              <input
                type="text"
                id="name_field"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={ram.name}
                onChange={handleInputChange}
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
                value={ram.type}
                onChange={handleInputChange}
              />
              {errors.type && (
                <div className="invalid-feedback">{errors.type}</div>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoadingSubmit}
            >
              {isLoadingSubmit ? "Đang thêm..." : "Thêm Ram"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewRam;
