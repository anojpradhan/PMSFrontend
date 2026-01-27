import { useState } from "react";
import { Button, Card, Form, Input, Typography, Grid, Alert } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/auth";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function Login() {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("LOGIN ERROR:", error.message);
      setErrorMsg(error.message);
    },
  });

  const onFinish = (values) => {
    setErrorMsg("");
    loginMutation.mutate(values);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: screens.sm ? "24px" : "16px",
        background: "#ffffff",
      }}
    >
      <Card
        style={{
          width: screens.sm ? 380 : "100%",
          maxWidth: 380,
        }}
      >
        <Title
          level={screens.sm ? 3 : 4}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Welcome Back
        </Title>

        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Login to Product Management System
        </Text>

        {errorMsg && (
          <Alert
            title={errorMsg}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Your User Name"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="••••••••"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loginMutation.isPending}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <Text type="secondary">
              Don't have an account?{" "}
              <a onClick={() => navigate("/register")}>Register here</a>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
