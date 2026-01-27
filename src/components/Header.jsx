import { Layout, Button, Typography, Avatar, Grid } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function HeaderBar({ toggleDrawer }) {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Header
      style={{
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid #ffe7ba",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        height: 64,
        lineHeight: "64px",
        flexShrink: 0,
      }}
    >
      {!screens.md && (
        <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} />
      )}

      <Title
        level={4}
        style={{
          margin: 0,
          color: "#d46b08",
          textAlign: "center",
          flex: 1,
        }}
      >
        PMS
      </Title>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text style={{ lineHeight: "normal" }}>{user.name || "User"}</Text>
        <Avatar
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
    </Header>
  );
}
