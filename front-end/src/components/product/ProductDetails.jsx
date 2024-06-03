import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import NewReviews from "../reviews/NewReviews";
import ListReviews from "../reviews/ListReviews";
import Magnifier from "react-magnifier";
import "../../assets/css/styles.css";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;
  // console.log(product);

  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0]?.url
        : "/images/default_product.png"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const increseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product?.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= product?.stock) {
      setQuantity(value);
    }
  };
  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Thêm vào giỏ hàng thành công!");
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <div className="p-3">
            <Magnifier src={activeImg} alt={product?.name} width={500} />
            {/* <img
              className="d-block w-100"
              src={activeImg}
              alt={product?.name}
              width="340"
              height="390"
            /> */}
          </div>
          <div className="row justify-content-start mt-5">
            {product?.images?.map((img) => (
              <div className="col-2 ms-4 mt-2">
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer ${
                      img.url === activeImg ? "border-warning" : ""
                    } `}
                    height="100"
                    width="100"
                    src={img?.url}
                    alt={img?.url}
                    onClick={(e) => setActiveImg(img.url)}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product?.name}</h3>
          <p id="product_id">Sản phẩm # {product?._id}</p>

          <hr />

          <div className="">
            <div className="star-ratings  mb-3">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="1px"
              />
            </div>
            <span id="no-of-reviews" className="pt-1 ps-2">
              {" "}
              ({product?.numOfReviews} Đánh giá ){" "}
            </span>
          </div>
          <hr />

          <p className="text-danger" id="product_price">
            ${product?.price}
          </p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreseQty}>
              -
            </span>
            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              onChange={handleChange}
            />
            <span className="btn btn-primary plus" onClick={increseQty}>
              +
            </span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary bg-warning rounded-2 text-white d-inline ms-4"
            disabled={product.stock <= 0}
            onClick={setItemToCart}
          >
            Thêm vào giỏ hàng
          </button>

          <hr />

          <p>
            Tình trạng:{" "}
            <span
              id="stock_status"
              className={product?.stock > 0 ? "greenColor" : "redColor"}
            >
              {product?.stock > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
            ({product?.stock})
          </p>

          <hr />

          <div className="describe">
            <h4 className="mt-2">Mô tả:</h4>

            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                class="bi bi-palette-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
              </svg>{" "}
              : {product?.color[0]?.name}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                class="bi bi-laptop-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 2A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
              </svg>{" "}
              : {product?.category[0]?.name}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="grayColor"
                class="bi bi-cpu-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5" />
              </svg>
              : {product?.cpu[0]?.type}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="grayColor"
                class="bi bi-gpu-card"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m7.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5m5.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M9 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0" />
                <path d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5" />
              </svg>
              : {product?.graphicCard[0]?.type}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="graytColor"
                class="bi bi-hdd-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M.91 7.204A3 3 0 0 1 2 7h12c.384 0 .752.072 1.09.204l-1.867-3.422A1.5 1.5 0 0 0 11.906 3H4.094a1.5 1.5 0 0 0-1.317.782z" />
              </svg>
              : {product?.hardDisk[0]?.type}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                class="bi bi-memory"
                viewBox="0 0 16 16"
              >
                <path d="M1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707-.293l.353-.353a.5.5 0 0 1 .708 0l.353.353a1 1 0 0 0 .707.293H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm.5 1h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m5 0h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zM2 10v2H1v-2zm2 0v2H3v-2zm2 0v2H5v-2zm3 0v2H8v-2zm2 0v2h-1v-2zm2 0v2h-1v-2zm2 0v2h-1v-2z" />
              </svg>{" "}
              : {product?.ram[0]?.type}
            </p>
            {product?.description.split(".").map((part, index) => (
              <p key={index}>{part.trim()}</p>
            ))}
          </div>
          <hr />

          <p id="product_seller mb-3">
            <p>Trạng thái: {product?.status}</p>
          </p>

          {isAuthenticated ? (
            <NewReviews productId={product?._id} />
          ) : (
            <div className="alert alert-danger my-5" type="alert">
              Đăng nhập để gửi đánh giá của bạn.
            </div>
          )}
        </div>
      </div>
      {product?.reviews?.length > 0 && (
        <ListReviews reviews={product?.reviews} />
      )}
    </>
  );
};

export default ProductDetails;
