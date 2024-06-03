import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Joi from "joi";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApi";
const UpdateCategory = () => {
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    slug: "",
  });

  const [updateCategory, { isLoading, error, isSuccess }] =
    useUpdateCategoryMutation();
  const { data } = useGetCategoryDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.category) {
      setCategory({
        name: data?.category?.name,
        slug: data?.category?.slug,
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đã cập nhật danh mục");

      navigate("/admin/categories");
      window.location.reload();
    }
  }, [error, isSuccess, data]);

  const { name, slug } = category;

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
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
          "string.empty": "Tên danh mục không được để trống",
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
    updateCategory({ id: params?.id, body: category });
  };

  return (
    <AdminLayout>
      <MetaData title={"Cập nhật danh mục "} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Cập nhật danh mục</h2>

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
                value={name}
                onChange={onChange}
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
                value={slug}
                onChange={onChange}
              />
              {errors.slug && (
                <div className="invalid-feedback">{errors.slug}</div>
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

export default UpdateCategory;
