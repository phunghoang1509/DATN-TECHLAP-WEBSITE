import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { Link, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Filters from "../layout/Filters";
import "../../assets/css/home.css";

const ProductsPage = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const categorys = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  categorys !== null && (params.category = categorys);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000); // Thời gian chuyển đổi ảnh

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title="Mua sản phẩm tốt nhất trực tuyến" />

      <div className="row">
        <div className="col-md-3 order-md-1 order-2 mt-5">
          <Filters />
        </div>
        <div className="col-md-9 order-md-2 order-1">
          <section id="products" className="mt-5">
            <div class="row">
              {data?.products?.map((product) => (
                <div class="col-md-4 mb-4">
                  <ProductItem key={product._id} product={product} />
                </div>
              ))}
            </div>
          </section>

          <CustomPagination
            resPerPage={data?.resPerPage}
            productsFiltersCount={data?.productsFiltersCount}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
