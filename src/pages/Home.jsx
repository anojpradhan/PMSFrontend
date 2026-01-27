import { Button, Typography, Space } from "antd";
import GuestLayout from "../layouts/GuestLayout";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          minHeight: "calc(100vh - 128px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "#ffffff",
          textAlign: "center",
        }}
      >
        <Title level={2}>Welcome to Product Management System</Title>

        <Paragraph style={{ maxWidth: 500, marginBottom: 32 }}>
          Manage your products, track sales, and monitor your inventory with
          ease. Get started by logging in or registering a new account.
        </Paragraph>

        <Space size="middle">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            type="default"
            size="large"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Space>
      </div>
    </div>
  );
}
