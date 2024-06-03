import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
// import { PRODUCT_CATEGORIES } from "../../constants/constants";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const params = useParams();
  const [categories, setCategories] = useState([]);

  const { data } = useGetCategoriesQuery(params?.id);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data]);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, [searchParams]);

  //handler Category & ratings
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    if (checkbox.checked === false) {
      // xoá tìm kiếm từ truy vấn
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      //Đặt giá trị bộ lọc mới nếu đã có
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        //Thêm bộ lọc mới
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  //handler price filter
  const handlerButtonClick = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const defaultCheckHandler = (checkboxType, checkboxvalue) => {
    const value = searchParams.get(checkboxType);
    if (checkboxvalue === value) return true;
    return false;
  };

  return (
    <div className="border p-3 filter">
      <h3>Lọc sản phẩm</h3>
      <hr />
      <h5 className="filter-heading mb-3">Giá</h5>
      <form id="filter_form" className="px-2" onSubmit={handlerButtonClick}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Tìm kiếm
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Hãng sản xuất</h5>

      {categories?.map((category) => (
        <div className="form-check" key={category._id}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id={`check-${category._id}`}
            value={category._id}
            defaultChecked={defaultCheckHandler("category", category._id)}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`check-${category._id}`}>
            {category.name}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Xếp hạng</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating?.toString())}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" for="check7">
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="21px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
