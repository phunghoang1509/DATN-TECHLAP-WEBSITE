import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { Link, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Filters from "../layout/Filters";
import "../../assets/css/styles.css";
import { CaretDownOutlined } from "@ant-design/icons";

// import { useGetCategoriesQuery } from "../../redux/api/categoryApi";

const HomePage = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const categorys = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  console.log(categorys);

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  categorys !== null && (params.category = categorys);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(data);
  //Danh mục và ảnh
  const categories = [
    {
      id: "65b3ed3049d98167851d92f8",
      name: "HP",
      image: "https://cdn.tgdd.vn/Brand/1/logo-hp-149x40-1.png",
    },
    {
      id: "65b3ed8449d98167851d92fa",
      name: "Asus",
      image: "https://cdn.tgdd.vn/Brand/1/logo-asus-149x40.png",
    },
    {
      id: "66052b23a1d3f9852da74a99",
      name: "Acer",
      image: "https://cdn.tgdd.vn/Brand/1/logo-acer-149x40.png",
    },
    {
      id: "65b3ed8e49d98167851d92fc",
      name: "Lenovo",
      image: "https://cdn.tgdd.vn/Brand/1/logo-lenovo-149x40.png",
    },
    {
      id: "65b3ed2249d98167851d92f6",
      name: "Dell",
      image: "https://cdn.tgdd.vn/Brand/1/logo-dell-149x40.png",
    },
    {
      id: "65b3ed0e49d98167851d92f4",
      name: "Macbook",
      image: "https://cdn.tgdd.vn/Brand/1/logo-macbook-149x40.png",
    },
  ];

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  //
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000); // Thời gian chuyển đổi ảnh

    return () => clearInterval(interval);
  }, [error, isError]);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };
  const columnSize = keyword ? 4 : 3;
  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title="Mua sản phẩm tốt nhất trực tuyến" />

      <div className="right">
        <div className="image-slider">
          <div>
            <button
              onClick={prevSlide}
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Trước </span>
            </button>
            <button
              onClick={nextSlide}
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Sau</span>
            </button>
          </div>
          <img
            className={`image ${currentIndex === 0 ? "active" : ""}`}
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/2/638449855361141781_F-C1_1200x300.png"
            alt=""
          />
          <img
            className={`image ${currentIndex === 1 ? "active" : ""}`}
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/2/638449857797599116_F-C1_1200x300.png"
            alt=""
          />
          <img
            className={`image ${currentIndex === 2 ? "active" : ""}`}
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449086705112725_F-C1_1200x300.png"
            alt=""
          />
        </div>
      </div>
      {/* Hiển thị Danh mục và Ảnh */}
      <div className="row mt-4 mb-4 ">
        {categories.map((category) => (
          <div key={category.id} className="col-md-2">
            <Link to={`http://localhost:3000/?category=${category.id}`}>
              <img
                src={category.image}
                alt={category.name}
                className="img-fluid zoom"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={category.name}
              />
            </Link>
          </div>
        ))}
      </div>

      <div class="row list-sp">
        <div class={keyword ? "col-6 col-md-12" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary fs-3 mt-0 ">
            {keyword
              ? `${data?.products?.length} Sản phẩm được tìm thấy với từ khóa: ${keyword}`
              : "Sản phẩm mới nhất"}
          </h1>

          <section id="products" className="mt-5">
            <div class="row">
              {data?.products?.map((product) => (
                <div class="col-md-3 mb-4">
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
        <div>
          <img
            className="d-flex pb-5 "
            alt=""
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/4/1/638475298769210159_F-C1_1200x300.png"
          ></img>
        </div>
        <h3 className="fw-bold text-center">Tin tức</h3>
        <div className="bg-light Promotion ">
          <div className=" d-flex mb-5 justify-content-center ">
            <div>
              <div>
                <Link to={"/blogs"}>
                  {" "}
                  <img
                    className="img-responsive"
                    src="https://images.fpt.shop/unsafe/fit-in/280x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/8/17/638279065301719767_laptop-choi-lien-minh-0.jpg"
                    alt=""
                  ></img>
                </Link>
              </div>
              <div>
                {" "}
                <p className="text-black text-break">
                  Top 5 laptop chơi Liên Minh Huyền Thoại đáng mua nhất 2023
                </p>
              </div>
            </div>
            <div>
              <div>
                <Link to={"/blogs"}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/280x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/2/5/638427271432503146_laptop-gaming-2024.jpg"
                    alt=""
                  ></img>
                </Link>
              </div>
              <div>
                <p className="text-black ">
                  Top 8 Laptop Gaming tốt nhất cuối năm 2023 tại TechLap: Hạ giá
                  ngất ngây [...]
                </p>
              </div>
            </div>
            <div>
              <div>
                <Link to={"/blogs"}>
                  {" "}
                  <img
                    src="https://images.fpt.shop/unsafe/300x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/21/638309191162978607_laptop-choi-hogwarts-legacy-0-1-1.jpg"
                    alt=""
                  ></img>
                </Link>
              </div>
              <div>
                <p className="text-black">
                  TOP 5 laptop chơi Hogwarts Legacy cực đỉnh 2023 dành cho tín
                  đồ mê đắm [...]
                </p>
              </div>
            </div>
            <div>
              <div>
                <Link to={"/blogs"}>
                  {" "}
                  <img
                    src="https://images.fpt.shop/unsafe/300x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/2/638292750758641411_laptop-gaming-lenovo-00.jpg"
                    alt=""
                  ></img>
                </Link>
              </div>
              <div>
                <p className="text-black">
                  Top 5 laptop gaming Lenovo nên mua 2023
                </p>
              </div>
            </div>
          </div>
          <details open className="pb-5">
            <summary className="btn btn-secondary mb-5">
              💻 Bảng thông số kỹ thuật của laptop <CaretDownOutlined />
            </summary>
            <h6>
              Trước khi mua laptop, việc hiểu và xem xét các thông số kỹ thuật
              trên mỗi máy là rất quan trọng để đảm bảo bạn chọn được chiếc
              laptop phù hợp với nhu cầu sử dụng của mình. Dưới đây là một số
              thông số quan trọng cần xem xét:
            </h6>
            <h4 className="fw-bolder">
              CPU (Central Processing Unit - Bộ xử lý)
            </h4>
            <h6>
              CPU là "bộ não" của laptop, quyết định tốc độ xử lý và hiệu suất
              của máy. Trên thị trường hiện có nhiều dòng CPU đa dạng phân khúc
              như Intel Core i3, i5, i7, i9 hoặc AMD Ryzen 3, AMD Ryzen 5, AMD
              Ryzen 7, AMD Ryzen 9. CPU mạnh mẽ hơn sẽ cung cấp hiệu suất xử lý
              nhanh hơn cho các tác vụ đa nhiệm và ứng dụng nặng.
            </h6>
            <img
              src="https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/image16.png"
              alt=""
            ></img>
            <h4 className="fw-bolder">
              RAM (Random Access Memory - Bộ nhớ ngẫu nhiên)
            </h4>
            <h6>
              RAM là bộ nhớ tạm thời mà laptop sử dụng để thực hiện các tác vụ.
              Một lượng RAM lớn hơn giúp laptop xử lý nhanh hơn và đồng thời cho
              phép chạy nhiều ứng dụng cùng một lúc mà không bị gián đoạn. RAM
              8GB hoặc 16GB hiện nay là lựa chọn phổ biến cho người dùng thông
              thường, trong khi phục vụ các tác vụ đòi hỏi hiệu suất cao như
              chơi game hay đồ họa, dựng phim có thể yêu cầu 32GB RAM hoặc cao
              hơn.
            </h6>
            <h4 className="fw-bolder">Ổ cứng</h4>
            <h6>
              Có hai loại ổ cứng chính được trang bị trên laptop hiện nay là HDD
              và SSD. HDD (Hard Disk Drive): Cung cấp dung lượng lớn với giá
              thành rẻ, nhưng tốc độ truy xuất dữ liệu chậm. SSD (Solid State
              Drive): Tốc độ xử lý dữ liệu nhanh và ít tiêu tốn năng lượng hơn.
              SSD đang là ổ cứng được cả người dùng và các chuyên gia ưu tiên
              lựa chọn vì khả năng khởi động nhanh, tốc độ truy xuất dữ liệu
              cao, giúp laptop hoạt động nhanh hơn. Đối với người dùng thông
              thường, mức dung lượng từ 256GB đến 512GB SSD hoặc 1TB HDD đã đáp
              ứng tốt nhu cầu hàng ngày.
            </h6>
            <img
              src="https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/image8.png"
              alt=""
            ></img>
            <h4 className="fw-bolder">Card đồ họa</h4>
            <h6>
              Card đồ họa sẽ quyết định khả năng xử lý đồ họa của laptop. Khi
              xem xét thông số kỹ thuật, bạn cần quan tâm đến 2 loại card đồ họa
              đó là:
            </h6>
            <ul>
              <li>
                Card đồ họa rời: Nếu bạn sử dụng phục vụ nhu cầu đồ họa, chơi
                game hoặc xem phim, bạn nên xem xét laptop có trang bị card đồ
                họa rời (dedicated GPU) từ NVIDIA hoặc AMD. Một số card đồ họa
                nổi bật bao gồm:
              </li>
              <li>
                NVIDIA GeForce GTX series (GTX 1650, GTX 1660, GTX 1660 Ti, GTX
                2060, GTX 2070, GTX 2080, v.v.)
              </li>
              <li>
                AMD Radeon RX series (RX 5500M, RX 5600M, RX 5700M, RX 6800M,
                v.v.)
              </li>
              <li>
                Card đồ họa tích hợp: Nếu bạn là người dùng thông thường, card
                đồ họa tích hợp trong CPU cũng đủ để xem video và làm việc hàng
                ngày. Một số card đồ họa tích hợp phổ biến bao gồm:
              </li>
              <li>Intel UHD Graphics</li>
              <li>Intel Iris Xe Graphics</li>
              <li>AMD Radeon Graphics (trong dòng CPU AMD Ryzen)</li>
            </ul>
            <img
              src="https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/image15.png"
              alt=""
            ></img>
            <h4 className="fw-bolder">Màn hình</h4>
            <h6>
              Kích thước và độ phân giải màn hình là yếu tố quan trọng trong
              trải nghiệm sử dụng laptop hàng này của bạn. Kích thước màn hình
              có thể từ 13 inch đến 17 inch hoặc hơn. Độ phân giải càng cao thì
              hình ảnh càng sắc nét. Hơn nữa, công nghệ hiển thị như IPS hoặc
              OLED cung cấp góc nhìn rộng và chất lượng màu sắc tốt hơn.
            </h6>
            <h4 className="fw-bolder">Pin và thời lượng sử dụng</h4>
            <h6>
              Thời lượng pin cũng là một thông số quan trọng cần xem xét, liên
              quan đến khả năng sử dụng laptop khi không cắm sạc. Đa số các mẫu
              laptop thông thường, pin kéo dài từ 4 đến 8 giờ tùy thuộc vào công
              suất và cấu hình của laptop. Nếu bạn thường xuyên di chuyển hoặc
              sử dụng laptop ngoài không gian làm việc, lựa chọn laptop với thời
              lượng pin lâu và chế độ tiết kiệm năng lượng tốt là quan trọng. Và
              Macbook là một trong những lựa chọn rất đáng cân nhắc, nếu bạn ưu
              tiên pin đảm bảo thoải mái khi sử dụng mà không cần cắm sạc.
            </h6>
            <h4 className="fw-bolder">Hệ điều hành</h4>
            <img
              src="https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/image7.png"
              alt=""
            ></img>
            <h6>
              Hệ điều hành là phần mềm cơ bản quản lý và hoạt động trên laptop.
              Windows và macOS là hai hệ điều hành phổ biến, mỗi loại có những
              ưu điểm riêng. Lựa chọn hệ điều hành phụ thuộc vào sở thích và nhu
              cầu sử dụng cá nhân của riêng bạn.
            </h6>
          </details>
        </div>
      </div>
    </>
  );
};

export default HomePage;
