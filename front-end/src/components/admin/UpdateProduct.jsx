import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Joi from "joi"; // Import Joi

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productsApi";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import { useGetColorsQuery } from "../../redux/api/colorApi";
import { useGetGraphicCardsQuery } from "../../redux/api/graphicCards";
import { useGetCpuQuery } from "../../redux/api/cpuApi";
import { useGethardDisksQuery } from "../../redux/api/hardDisk";
import { useGetRamsQuery } from "../../redux/api/ram";

const UpdateProduct = () => {
  const params = useParams();

  const [errors, setErrors] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

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
  const [categories, setCategories] = useState([]);
  const [colors, setColor] = useState([]);
  const [graphicCards, setgraphicCard] = useState([]);
  const [cpus, setCpu] = useState([]);
  const [hardDisks, sethardDisk] = useState([]);
  const [rams, setRam] = useState([]);

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: colorsData } = useGetColorsQuery();
  const { data: graphicCardsData } = useGetGraphicCardsQuery();
  const { data: cpusData } = useGetCpuQuery();
  const { data: hardDisksData } = useGethardDisksQuery();
  const { data: ramsData } = useGetRamsQuery();
  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();
  const { data } = useGetProductDetailsQuery(params?.id);
  console.log(data?.product);
  // console.log(graphicCardsData);

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        price: data?.product?.price,
        description: data?.product?.description,
        category: data?.product?.category[0]._id,
        status: data?.product?.status,
        stock: data?.product?.stock,
        color: data?.product?.color[0]._id,
        cpu: data?.product?.cpu[0]._id,
        hardDisk: data?.product?.hardDisk[0]._id,
        ram: data?.product?.ram[0]._id,
        graphicCard: data?.product?.graphicCard[0]._id,
      });
      // console.log(categoryUpdate);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đã cập nhật sản phẩm");

      navigate("/admin/products");
      window.location.reload();
    }
  }, [error, isSuccess, data]);

  useEffect(() => {
    if (categoriesData?.categories) {
      setCategories(categoriesData.categories);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (colorsData?.colors) {
      setColor(colorsData.colors);
    }
  }, [colorsData]);
  useEffect(() => {
    if (graphicCardsData?.graphicCards) {
      setgraphicCard(graphicCardsData.graphicCards);
    }
  }, [graphicCardsData]);

  useEffect(() => {
    if (cpusData?.cpus) {
      setCpu(cpusData.cpus);
    }
  }, [cpusData]);
  useEffect(() => {
    if (hardDisksData?.hardDisks) {
      sethardDisk(hardDisksData.hardDisks);
    }
  }, [hardDisksData]);
  useEffect(() => {
    if (ramsData?.rams) {
      setRam(ramsData.rams);
    }
  }, [ramsData]);

  const {
    name,
    price,
    description,
    category,
    status,
    stock,
    color,
    cpu,
    hardDisk,
    ram,
    graphicCard,
  } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
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
      toast.error("Vui lòng nhập đúng định dạng!");
      return;
    }

    setIsLoadingSubmit(true);
    updateProduct({ id: params?.id, body: product });
  };

  return (
    <AdminLayout>
      <MetaData title={"Cập nhật sản phẩm"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Cập nhật sản phẩm</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên sản phẩm
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
                value={description}
                onChange={onChange}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

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
                  value={price}
                  onChange={onChange}
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
                  value={stock}
                  onChange={onChange}
                />
                {errors.stock && (
                  <div className="invalid-feedback">{errors.stock}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  Danh mục sản phẩm
                </label>
                <select
                  id="category_field"
                  className={`form-select ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {categories.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="invalid-feedback">{errors.category}</div>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="graphicCard_field" className="form-label">
                  graphicCards
                </label>
                <select
                  id="graphicCard_field"
                  className={`form-select ${
                    errors.graphicCard ? "is-invalid" : ""
                  }`}
                  name="graphicCard"
                  value={graphicCard}
                  onChange={onChange}
                >
                  {graphicCards.map((graphicCard) => (
                    <option key={graphicCard._id} value={graphicCard._id}>
                      {graphicCard.type}
                    </option>
                  ))}
                </select>
                {errors.graphicCard && (
                  <div className="invalid-feedback">{errors.graphicCard}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="color_field" className="form-label">
                  Màu sắc
                </label>
                <select
                  id="color_field"
                  className={`form-select ${errors.color ? "is-invalid" : ""}`}
                  name="color"
                  value={color}
                  onChange={onChange}
                >
                  {colors.map((colorupdate) => (
                    <option key={colorupdate?._id} value={colorupdate?._id}>
                      {colorupdate?.name}
                    </option>
                  ))}
                </select>
                {errors.color && (
                  <div className="invalid-feedback">{errors.color}</div>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="cpu_field" className="form-label">
                  CPU
                </label>
                <select
                  id="cpu_field"
                  className={`form-select ${errors.cpu ? "is-invalid" : ""}`}
                  name="cpu"
                  value={cpu}
                  onChange={onChange}
                >
                  {cpus.map((cpu) => (
                    <option key={cpu._id} value={cpu._id}>
                      {cpu.type}
                    </option>
                  ))}
                </select>
                {errors.cpu && (
                  <div className="invalid-feedback">{errors.cpu}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="hardDisk_field" className="form-label">
                  hardDisk
                </label>
                <select
                  id="hardDisk_field"
                  className={`form-select ${
                    errors.hardDisk ? "is-invalid" : ""
                  }`}
                  name="hardDisk"
                  value={hardDisk}
                  onChange={onChange}
                >
                  {hardDisks.map((hardDisk) => (
                    <option key={hardDisk._id} value={hardDisk._id}>
                      {hardDisk.type}
                    </option>
                  ))}
                </select>
                {errors.hardDisk && (
                  <div className="invalid-feedback">{errors.hardDisk}</div>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="ram_field" className="form-label">
                  RAM
                </label>
                <select
                  id="ram_field"
                  className={`form-select ${errors.ram ? "is-invalid" : ""}`}
                  name="ram"
                  value={ram}
                  onChange={onChange}
                >
                  {rams.map((ram) => (
                    <option key={ram._id} value={ram._id}>
                      {ram.type}
                    </option>
                  ))}
                </select>
                {errors.ram && (
                  <div className="invalid-feedback">{errors.ram}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="status_field" className="form-label">
                  Trạng thái
                </label>
                <select
                  id="status_field"
                  className={`form-select ${errors.status ? "is-invalid" : ""}`}
                  name="status"
                  value={status}
                  onChange={onChange}
                >
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

export default UpdateProduct;
