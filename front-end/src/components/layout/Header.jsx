import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import "../../assets/css/home.css";
import logo from "../../assets/logo.png";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useGetMeQuery } from "../../redux/api/userApi";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { logoutUser } from "../../redux/features/userSlice";
import { useEffect } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useGetMeQuery();
  // console.log(data);
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
  const logoutHandler = async () => {
    try {
      await logout();

      // Xóa thông tin người dùng và token khỏi local storage hoặc bất kỳ nơi lưu trữ khác
      dispatch(logoutUser());

      navigate(0);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  useEffect(() => {
    if (data && data.status === "deactive") {
      logoutHandler();
    }
  }, [data]);

  const { cartItems } = useSelector((state) => state.cart);
  const isAdminPath = location.pathname.startsWith("/admin");
  return (
    <nav className="d-flex flex-row mb-3 w-100 bg-danger mt-0">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src={logo} alt="ShopIT Logo" className="logo" />
          </a>
        </div>
      </div>
      {/* {isAdminPath ? null : ()} */}
      {isAdminPath ? null : (
        <div>
          <Link className="text-white pe-5 fw-bolder " to={"/"}>
            Trang chủ
          </Link>
          <Link className="text-white pe-5 fw-bolder" to={"/products"}>
            Sản phẩm
          </Link>
          <Link className="text-white pe-5 fw-bolder" to={"/blogs"}>
            Thông tin
          </Link>
        </div>
      )}

      <div className="">{isAdminPath ? null : <Search />}</div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAdminPath ? null : (
          <a href="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ms-3">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-cart "
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>{" "}
            </span>
            <span className="ms-1 bg-warning" id="cart_count">
              {cartItems?.length}
            </span>
          </a>
        )}

        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white "
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              {user?.role === "admin" && (
                <Link className="dropdown-item" to="/admin/orders">
                  {" "}
                  Quản trị{" "}
                </Link>
              )}

              <Link className="dropdown-item" to="/me/orders">
                {" "}
                Đơn đặt hàng{" "}
              </Link>

              <Link className="dropdown-item" to="/me/profile">
                {" "}
                Hồ sơ người dùng{" "}
              </Link>

              <Link
                className="dropdown-item text-danger "
                to="/"
                onClick={logoutHandler}
              >
                Đăng xuất{" "}
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4 bg-warning" id="login_btn">
              {" "}
              Đăng nhập{" "}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
