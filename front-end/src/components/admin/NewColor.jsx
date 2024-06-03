import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Joi from "joi";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import { useCreateColorMutation } from "../../redux/api/colorApi";

const NewColor = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [createColor, { error, isSuccess }] = useCreateColorMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Color đã được tạo!");
      setTimeout(() => {
        navigate("/admin/colors");
      }, 2000);
    }
  }, [error, isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setColor({ ...color, [name]: value });
  };

  const handleSubmit = (e) => {
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
    createColor(color);
  };

  return (
    <AdminLayout>
      <MetaData title={"Thêm màu sắc mới"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Thêm Màu sắc</h2>

            {/* Tên danh mục */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên Color
              </label>
              <input
                type="text"
                id="name_field"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={color.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoadingSubmit}
            >
              {isLoadingSubmit ? "Đang thêm..." : "Thêm màu sắc"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewColor;
