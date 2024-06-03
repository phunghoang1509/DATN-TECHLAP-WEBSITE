import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import Joi from "joi"; // Import Joi

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import { useGetColorsQuery } from "../../redux/api/colorApi";
import { useGetGraphicCardsQuery } from "../../redux/api/graphicCards";
import { useGetCpuQuery } from "../../redux/api/cpuApi";
import { useGethardDisksQuery } from "../../redux/api/hardDisk";
import { useGetRamsQuery } from "../../redux/api/ram";

const NewProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    status: "",
    stock: "",
    color: "",
    cpu: "",
    hardDisk: "",
    ram: "",
    graphicCard: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [createProduct, { error, isSuccess }] = useCreateProductMutation();

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: colorData,
    isLoading: colorLoading,
    error: colorError,
  } = useGetColorsQuery();

  const {
    data: graphicCardData,
    isLoading: graphicCardLoading,
    error: graphicCardError,
  } = useGetGraphicCardsQuery();

  const {
    data: cpuData,
    isLoading: cpuLoading,
    error: cpuError,
  } = useGetCpuQuery();

  const {
    data: hardDiskData,
    isLoading: hardDiskLoading,
    error: hardDiskError,
  } = useGethardDisksQuery();

  const {
    data: ramData,
    isLoading: ramLoading,
    error: ramError,
  } = useGetRamsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Sản phẩm đã được tạo!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    }
  }, [error, isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string()
        .min(6)
        .required()
        .messages({
          "string.empty": "Tên sản phẩm không được để trống",
          "string.min": "Tên sản phẩm phải có ít nhất {#limit} ký tự",
        })
        .label("Tên sản phẩm"),

      price: Joi.number()
        .min(0)
        .required()
        .messages({
          "number.base": "Giá sản phẩm phải là một số",
          "number.min": "Giá sản phẩm phải là số dương",
          "any.required": "Giá sản phẩm không được để trống",
        })
        .label("Giá sản phẩm"),

      description: Joi.string()
        .required()
        .messages({
          "string.empty": "Mô tả sản phẩm không được để trống",
        })
        .label("Mô tả sản phẩm"),

      category: Joi.string()
        .required()
        .messages({
          "string.empty": "Vui lòng chọn danh mục",
        })
        .label("Danh mục sản phẩm"),

      status: Joi.string()
        .required()
        .messages({
          "string.empty": "Vui lòng chọn trạng thái",
        })
        .label("Trạng thái"),

      stock: Joi.number()
        .min(0)
        .required()
        .messages({
          "number.base": "Số lượng sản phẩm phải là một số",
          "number.min": "Số lượng sản phẩm phải là số dương",
          "any.required": "Số lượng phẩm không được để trống",
        })
        .label("Số lượng"),

      color: Joi.string()
        .required()
        .messages({
          "string.empty": "Vui lòng chọn màu sắc",
        })
        .label("Màu sắc"),

      cpu: Joi.string()
        .required()
        .messages({
          "string.empty": "Vui lòng chọn CPU",
        })
        .label("CPU"),

      hardDisk: Joi.string()
        .required()
        .messages({
          "string.empty": "Vui lòng chọn ổ cứng",
        })
        .label("Ổ cứng"),

      ram: Joi.string()
        .required()
        .messages({
          "string.empty": "Vui lòng chọn RAM",
        })
        .label("RAM"),

      graphicCard: Joi.string()
        .required()
        .messages({
          "string.empty": "Vui lòng chọn card đồ họa",
        })
        .label("Card đồ họa"),
    });

    const { error: validationError } = schema.validate(product, {
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
    createProduct(product);
  };

  return (
    <AdminLayout>
      <MetaData title={"Thêm sản phẩm mới"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Thêm sản phẩm</h2>

            {/* Tên sản phẩm */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="name_field"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Mô tả sản phẩm */}
            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Mô tả sản phẩm
              </label>
              <textarea
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                id="description_field"
                rows="8"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            {/* Giá và Số lượng */}
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  Giá sản phẩm
                </label>
                <input
                  type="text"
                  id="price_field"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  Số lượng
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                  name="stock"
                  value={product.stock}
                  onChange={handleInputChange}
                />
                {errors.stock && (
                  <div className="invalid-feedback">{errors.stock}</div>
                )}
              </div>
            </div>

            {/* Danh mục và GraphicCard */}
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  Danh mục sản phẩm
                </label>
                {categoriesLoading ? (
                  <Loader />
                ) : categoriesError ? (
                  <p>{categoriesError.message}</p>
                ) : (
                  <select
                    id="category_field"
                    className={`form-select ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn danh mục</option>
                    {categoriesData?.categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.category && (
                  <div className="invalid-feedback">{errors.category}</div>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="graphicCard_field" className="form-label">
                  GraphicCard
                </label>
                {graphicCardLoading ? (
                  <Loader />
                ) : graphicCardError ? (
                  <p>{graphicCardError.message}</p>
                ) : (
                  <select
                    id="graphicCard_field"
                    className={`form-select ${
                      errors.graphicCard ? "is-invalid" : ""
                    }`}
                    name="graphicCard"
                    value={product.graphicCard}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn graphicCards</option>
                    {graphicCardData?.graphicCards.map((graphicCard) => (
                      <option key={graphicCard._id} value={graphicCard._id}>
                        {graphicCard.type}
                      </option>
                    ))}
                  </select>
                )}
                {errors.graphicCard && (
                  <div className="invalid-feedback">{errors.graphicCard}</div>
                )}
              </div>
            </div>

            {/* Màu sắc và CPU */}
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="color_field" className="form-label">
                  Màu sắc
                </label>
                {colorLoading ? (
                  <Loader />
                ) : colorError ? (
                  <p>{colorError.message}</p>
                ) : (
                  <select
                    id="color_field"
                    className={`form-select ${
                      errors.color ? "is-invalid" : ""
                    }`}
                    name="color"
                    value={product.color}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn màu sắc</option>
                    {colorData?.colors.map((color) => (
                      <option key={color._id} value={color._id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.color && (
                  <div className="invalid-feedback">{errors.color}</div>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="cpu_field" className="form-label">
                  CPU
                </label>
                {cpuLoading ? (
                  <Loader />
                ) : cpuError ? (
                  <p>{cpuError.message}</p>
                ) : (
                  <select
                    id="cpu_field"
                    className={`form-select ${errors.cpu ? "is-invalid" : ""}`}
                    name="cpu"
                    value={product.cpu}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn cpu</option>
                    {cpuData?.cpus.map((cpu) => (
                      <option key={cpu._id} value={cpu._id}>
                        {cpu.type}
                      </option>
                    ))}
                  </select>
                )}
                {errors.cpu && (
                  <div className="invalid-feedback">{errors.cpu}</div>
                )}
              </div>
            </div>

            {/* HardDisk và RAM */}
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="hardDisk_field" className="form-label">
                  HardDisk
                </label>
                {hardDiskLoading ? (
                  <Loader />
                ) : hardDiskError ? (
                  <p>{hardDiskError.message}</p>
                ) : (
                  <select
                    id="hardDisk_field"
                    className={`form-select ${
                      errors.hardDisk ? "is-invalid" : ""
                    }`}
                    name="hardDisk"
                    value={product.hardDisk}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn hardDisk</option>
                    {hardDiskData?.hardDisks.map((hardDisk) => (
                      <option key={hardDisk._id} value={hardDisk._id}>
                        {hardDisk.type}
                      </option>
                    ))}
                  </select>
                )}
                {errors.hardDisk && (
                  <div className="invalid-feedback">{errors.hardDisk}</div>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="ram_field" className="form-label">
                  RAM
                </label>
                {ramLoading ? (
                  <Loader />
                ) : ramError ? (
                  <p>{ramError.message}</p>
                ) : (
                  <select
                    id="ram_field"
                    className={`form-select ${errors.ram ? "is-invalid" : ""}`}
                    name="ram"
                    value={product.ram}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn ram</option>
                    {ramData?.rams.map((ram) => (
                      <option key={ram._id} value={ram._id}>
                        {ram.type}
                      </option>
                    ))}
                  </select>
                )}
                {errors.ram && (
                  <div className="invalid-feedback">{errors.ram}</div>
                )}
              </div>
            </div>

            {/* Trạng thái */}
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="status_field" className="form-label">
                  Trạng thái
                </label>
                <select
                  id="status_field"
                  className={`form-select ${errors.status ? "is-invalid" : ""}`}
                  name="status"
                  value={product.status}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn trạng thái</option>
                  {["New 100%", "Like new 99%"].map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoadingSubmit}
            >
              {isLoadingSubmit ? "Đang thêm..." : "Thêm sản phẩm"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
