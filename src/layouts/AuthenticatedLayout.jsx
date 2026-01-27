import { useState, useEffect } from "react";
import { Layout, Drawer, Grid } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FooterBar from "../components/Footer";
import HeaderBar from "../components/Header";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function AuthenticatedLayout({ children }) {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login", { replace: true });
  }, [navigate]);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {screens.md && (
        <Sider
          width={240}
          style={{
            background: "#ffffff",
            borderRight: "1px solid #ffe7ba",
            overflow: "hidden",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Sidebar />
        </Sider>
      )}

      <Layout style={{ marginLeft: screens.md ? 240 : 0 }}>
        <HeaderBar toggleDrawer={toggleDrawer} />

        {!screens.md && (
          <Drawer
            title="Menu"
            placement="left"
            onClose={toggleDrawer}
            open={drawerVisible}
            closeIcon={<CloseOutlined />}
          >
            <Sidebar />
          </Drawer>
        )}

        <Content
          style={{
            background: "#ffffff",
            padding: screens.md ? "24px" : "16px",
            minHeight: "calc(100vh - 128px)",
            overflow: "auto",
          }}
        >
          {children}
        </Content>

        <FooterBar />
      </Layout>
    </Layout>
  );
}
