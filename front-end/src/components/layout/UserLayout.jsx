import React from "react";
import SideMenu from "./SideMenu";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Hồ sơ người dùng",
      url: "/me/profile",
      icon: "fas fa-user",
    },
    {
      name: "Cập nhật hồ sơ",
      url: "/me/update_profile",
      icon: "fas fa-user",
    },
    {
      name: "Tải lên hình đại diện",
      url: "/me/upload_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Cập nhật mật khẩu",
      url: "/me/update_password",
      icon: "fas fa-lock",
    },
  ];

  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">Thiết lập người dùng</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
