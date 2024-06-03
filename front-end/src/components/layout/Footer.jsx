import React from "react";
import "../../assets/css/home.css";
const Footer = () => {
  return (
    <footer className="mb-0">
      <div className="footer bg-danger pb-3">
        <div>
          <div className="title2">Liên hệ</div>
          <div>Số 1 Trịnh Văn Bô, Bắc Từ Liêm, Hà Nội</div>
          <div>techlap@gmail.com</div>
          <div>0789257816</div>
        </div>
        <div>
          <div className="title2">Tài khoản</div>
          <div>Tài khoản của tôi</div>
          <div>Đăng nhập / Đăng ký</div>
          <div>Giỏ hàng</div>
        </div>
        <div>
          <div className="title2">Quick Link</div>
          <div>Privacy Policy</div>
          <div>Terms Of Use</div>

          <div>Contact</div>
        </div>
        <div>
          <div className="title2">Download App</div>
          <div>Save $3 with App New User Only</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
