import { Layout, Typography, Grid } from "antd";

const { Footer } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export default function FooterBar() {
  const screens = useBreakpoint();
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#ffffff",
        borderTop: "1px solid #ffe7ba",
        padding: screens.sm ? "16px 24px" : "12px 16px",
        flexShrink: 0,
      }}
    >
      <Text style={{ color: "#595959", fontSize: screens.sm ? 14 : 13 }}>
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
  );
}
