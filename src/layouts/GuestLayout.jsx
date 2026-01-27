import { Layout, Typography, Grid } from "antd";

const { Header, Footer } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function GuestLayout({ children }) {
  const screens = useBreakpoint();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #ffe7ba",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingInline: screens.sm ? 24 : 16,
        }}
      >
        <Title
          level={screens.sm ? 4 : 5}
          style={{
            margin: 0,
            color: "#d46b08",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textAlign: "center",
          }}
        >
          Product Management System
        </Title>
      </Header>

      {children}

      <Footer
        style={{
          textAlign: "center",
          background: "#ffffff",
          borderTop: "1px solid #ffe7ba",
          padding: screens.sm ? "16px 24px" : "12px 16px",
        }}
      >
        <Text
          style={{
            color: "#595959",
            fontSize: screens.sm ? 14 : 13,
          }}
        >
          © {new Date().getFullYear()} Product Management System · Developed by{" "}
          <a
            href="https://anojpradhan.com.np"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#d46b08" }}
          >
            anojpradhan
          </a>
        </Text>
      </Footer>
    </Layout>
  );
}
