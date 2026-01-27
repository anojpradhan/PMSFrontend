import { Menu, Button, Typography } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/products", icon: <ShoppingOutlined />, label: "Products" },
    { key: "/sales", icon: <DollarOutlined />, label: "Sales" },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "24px 16px",
          borderBottom: "1px solid #f0f0f0",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <Title level={5} style={{ margin: 0, color: "#d46b08" }}>
          Stock Panel
        </Title>
      </div>

      <Menu
        mode="inline"
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          borderRight: 0,
          fontSize: "16px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      />

      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #f0f0f0",
          flexShrink: 0,
        }}
      >
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ width: "100%", fontSize: "16px" }}
          block
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
