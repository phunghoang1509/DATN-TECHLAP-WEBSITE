import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom"; // Import Link và useLocation từ React Router-dom
import {
  PieChartOutlined,
  ProductOutlined,
  DiffOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";

const { Header, Content, Sider } = Layout;

const AdminLayout = ({ children }) => {
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [selectedKeys, setSelectedKeys] = useState(["1"]); // Sử dụng useState để theo dõi mục menu được chọn hiện tại
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation(); // Sử dụng useLocation để lấy vị trí hiện tại

  const items = [
    {
      key: "1",
      icon: <FileDoneOutlined />,
      label: "Quản lý đơn hàng",
      url: "/admin/orders", // Add URL for each menu item
    },
    {
      key: "2",
      icon: <PieChartOutlined />,
      label: "Thống kê",
      url: "/admin/dashboard", // Add URL for each menu item
    },
    {
      key: "3",
      icon: <ProductOutlined />,
      label: "Quản lý sản phẩm",
      url: "/admin/products", // Add URL for each menu item
    },
    {
      key: "4",
      icon: <DiffOutlined />,
      label: "Quản lý Danh mục",
      url: "/admin/categories", // Add URL for each menu item
    },
    {
      key: "5",
      icon: <FileDoneOutlined />,
      label: "Quản lý GraphicCards",
      url: "/admin/graphicCards", // Add URL for each menu item
    },
    {
      key: "6",
      icon: <FileDoneOutlined />,
      label: "Quản lý HardDisk",
      url: "/admin/hardDisks", // Add URL for each menu item
    },
    {
      key: "7",
      icon: <FileDoneOutlined />,
      label: "Quản lý Ram",
      url: "/admin/rams", // Add URL for each menu item
    },
    {
      key: "8",
      icon: <FileDoneOutlined />,
      label: "Quản lý Cpu",
      url: "/admin/cpus", // Add URL for each menu item
    },
    {
      key: "9",
      icon: <FileDoneOutlined />,
      label: "Quản lý Màu sắc",
      url: "/admin/colors", // Add URL for each menu item
    },

    {
      key: "10",
      icon: <FileDoneOutlined />,
      label: "Quản lý người dùng",
      url: "/admin/users", // Add URL for each menu item
    },
    {
      key: "11",
      icon: <FileDoneOutlined />,
      label: "Quản lý đánh giá",
      url: "/admin/reviews", // Add URL for each menu item
    },
  ];

  // Kiểm tra vị trí hiện tại và cập nhật giá trị của selectedKeys tương ứng
  useState(() => {
    const currentKey = items.find((item) =>
      location.pathname.startsWith(item.url)
    )?.key;
    if (currentKey) setSelectedKeys([currentKey]);
  }, [location.pathname]);

  return (
    <Layout style={{}}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ margin: "0" }}
      >
        <h5 className="text-center text-white fw-bold pt-3 border-bottom border-secondary pb-3">
          QUẢN TRỊ
        </h5>

        <div className="demo-logo-vertical" />
        <Menu
          style={{ padding: "5px" }}
          theme="dark"
          selectedKeys={selectedKeys} // Sử dụng selectedKeys thay cho defaultSelectedKeys
          mode="inline"
          inlineCollapsed={collapsed}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.url}>{item.label}</Link> {/* Use Link component */}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{}}>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              marginRight: "0",
              padding: "0",
            }}
          />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 0, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
