import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../redux/api/categoryApi";
import toast from "react-hot-toast";
import Joi from "joi";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";

const NewCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    slug: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [createCategory, { error, isSuccess }] = useCreateCategoryMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Danh mục đã được tạo!");
      setTimeout(() => {
        navigate("/admin/categories");
      }, 2000);
    }
  }, [error, isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên danh mục không được để trống",
        })
        .label("Tên danh mục"),

      slug: Joi.string()
        .required()
        .messages({
          "string.empty": "Tên slug không được để trống",
        })
        .label("Slug"),
    });

    const { error: validationError } = schema.validate(category, {
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
    createCategory(category);
  };

  return (
    <AdminLayout>
      <MetaData title={"Thêm danh mục mới"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Thêm danh mục</h2>

            {/* Tên danh mục */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên danh mục
              </label>
              <input
                type="text"
                id="name_field"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={category.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="slug_field" className="form-label">
                Slug
              </label>
              <input
                type="text"
                id="slug_field"
                className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                name="slug"
                value={category.slug}
                onChange={handleInputChange}
              />
              {errors.slug && (
                <div className="invalid-feedback">{errors.slug}</div>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoadingSubmit}
            >
              {isLoadingSubmit ? "Đang thêm..." : "Thêm danh mục"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewCategory;
