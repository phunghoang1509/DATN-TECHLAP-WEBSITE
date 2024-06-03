import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading, error, data }] = useLoginMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (user?.role === "block") {
      toast.error(
        "Tài khoản của bạn đã bị chặn. Vui lòng liên hệ quản trị viên."
      );
      navigate("/");
    }
  }, [error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Đăng nhập</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to="/password/forgot" className="float-end mb-4">
            Quên mật khẩu?
          </Link>

          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Đang xác thực..." : "Đăng nhập"}
          </button>

          <div className="my-3">
            <Link to="/register" className="float-end">
              Đăng ký?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
