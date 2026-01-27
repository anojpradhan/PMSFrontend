import { useState } from "react";
import { Button, Card, Form, Input, Typography, Grid, Alert } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/auth";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function Register() {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("REGISTER ERROR:", error.message);
      setErrorMsg(error.message);
    },
  });

  const onFinish = (values) => {
    setErrorMsg("");
    registerMutation.mutate(values);
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
          width: screens.sm ? 400 : "100%",
          maxWidth: 400,
        }}
      >
        <Title
          level={screens.sm ? 3 : 4}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Create Account
        </Title>

        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Register for Product Management System
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
          name="register"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input size="large" placeholder="Your Name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
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
              loading={registerMutation.isPending}
            >
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <Text type="secondary">
              Already have an account?{" "}
              <a onClick={() => navigate("/login")}>Login here</a>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
