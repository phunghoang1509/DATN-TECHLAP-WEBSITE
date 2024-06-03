import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../css/admin.css";

import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SideMenu = ({ menuItems }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (url) => {
    setActiveMenuItem(url);
    navigate(url);
  };

  return (
    <div className="">
      <div className="content mt-5 pl-4 bg-warning-subtle ">
        {/* List group */}
        <div className="list-group">
          {menuItems?.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.url}
              className={`list-group-item list-group-item-action ${
                activeMenuItem === menuItem.url ? "active" : ""
              }`}
              onClick={() => setActiveMenuItem(menuItem.url)}
              aria-current={activeMenuItem === menuItem.url ? "true" : "false"}
            >
              <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
