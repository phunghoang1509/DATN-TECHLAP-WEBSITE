import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { Button } from "antd";
const ProductView = () => {
  const params = useParams();

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
  const { data } = useGetProductDetailsQuery(params?.id);
  //   console.log(data?.product);
  // console.log(graphicCardsData);

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        price: data?.product?.price,
        description: data?.product?.description,
        category: data?.product?.category[0].name,
        status: data?.product?.status,
        stock: data?.product?.stock,
        color: data?.product?.color[0].name,
        cpu: data?.product?.cpu[0].type,
        hardDisk: data?.product?.hardDisk[0].type,
        ram: data?.product?.ram[0].type,
        graphicCard: data?.product?.graphicCard[0].type,
      });
      // console.log(categoryUpdate);
    }
  }, [data]);

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

  return (
    <AdminLayout>
      <MetaData title={"Thông tin sản phẩm"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body">
            <h2 className="mb-4">Thông tin sản phẩm</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Mô tả sản phẩm
              </label>
              <input
                type="text"
                id="description_field"
                className="form-control"
                name="description"
                value={description}
                disabled
              />
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  Giá sản phẩm
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  disabled
                />
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  Số lượng
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  Danh mục sản phẩm
                </label>
                <input
                  type="text"
                  id="category_field"
                  className="form-control"
                  name="category"
                  value={category}
                  disabled
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="graphicCard_field" className="form-label">
                  graphicCards
                </label>
                <input
                  type="text"
                  id="graphicCards_field"
                  className="form-control"
                  name="graphicCard"
                  value={graphicCard}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="color_field" className="form-label">
                  Màu sắc
                </label>
                <input
                  type="text"
                  id="color_field"
                  className="form-control"
                  name="color"
                  value={color}
                  disabled
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="cpu_field" className="form-label">
                  CPU
                </label>
                <input
                  type="text"
                  id="cpu_field"
                  className="form-control"
                  name="cpu"
                  value={cpu}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="hardDisk_field" className="form-label">
                  hardDisk
                </label>
                <input
                  type="text"
                  id="hardDisk_field"
                  className="form-control"
                  name="hardDisk"
                  value={hardDisk}
                  disabled
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="ram_field" className="form-label">
                  RAM
                </label>
                <input
                  type="text"
                  id="ram_field"
                  className="form-control"
                  name="ram"
                  value={ram}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="status_field" className="form-label">
                  Trạng thái
                </label>
                <input
                  type="text"
                  id="statusfield"
                  className="form-control"
                  name="status"
                  value={status}
                  disabled
                />
              </div>
            </div>
            <Link to={`/admin/products`}>
              <Button type="primary">Quay lại</Button>
            </Link>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductView;
