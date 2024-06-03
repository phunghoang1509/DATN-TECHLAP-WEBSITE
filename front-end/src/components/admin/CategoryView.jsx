import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { useGetCategoryDetailsQuery } from "../../redux/api/categoryApi";
import { Button } from "antd";

const CategoryView = () => {
  const params = useParams();

  const [category, setCategory] = useState({
    name: "",
    slug: "",
    products: [],
  });
  const { data } = useGetCategoryDetailsQuery(params?.id);
  //   console.log(data?.product);
  // console.log(graphicCardsData);

  useEffect(() => {
    if (data?.category) {
      setCategory({
        name: data?.category?.name,
        slug: data?.category?.slug,
        products: data?.category?.products || [],
      });
    }
  }, [data]);

  const { name, slug, products } = category;

  return (
    <AdminLayout>
      <MetaData title={"Thông tin Danh mục"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body">
            <h2 className="mb-4">Thông tin Danh mục</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên danh mục
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
              <label htmlFor="slug_field" className="form-label">
                Slug
              </label>
              <input
                type="text"
                id="slug_field"
                className="form-control"
                name="slug"
                value={slug}
                disabled
              />
            </div>
            {/* Hiển thị danh sách sản phẩm */}
            <div className="mb-3">
              <label className="form-label">Các sản phẩm:</label>
              <ul className=" list-group-numbered">
                {products.map((product) => (
                  <li key={product._id} className="list-group-item">
                    {product.name}
                  </li>
                ))}
              </ul>
            </div>

            <Link to={`/admin/categories`}>
              <Button type="primary">Quay lại</Button>
            </Link>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryView;
