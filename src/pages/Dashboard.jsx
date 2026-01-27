import { useQuery } from "@tanstack/react-query";
import { Row, Col, Card, Statistic, Typography, Spin, Alert, Grid } from "antd";
import {
  DollarOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { getDashboard } from "../api/dashboard";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Dashboard() {
  const screens = useBreakpoint();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading)
    return (
      <AuthenticatedLayout>
        <Spin size="large" style={{ display: "block", marginTop: 80 }} />
      </AuthenticatedLayout>
    );

  if (isError)
    return (
      <AuthenticatedLayout>
        <Alert
          type="error"
          title={error.message || "Failed to load dashboard"}
        />
      </AuthenticatedLayout>
    );

  return (
    <AuthenticatedLayout>
      <div style={{ padding: screens.md ? 24 : 16 }}>
        <Title level={screens.md ? 3 : 4}>Dashboard</Title>

        {/* Top Stats */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Revenue"
                value={data.totalRevenue}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Sales"
                value={data.totalSales}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Products"
                value={data.totalProducts}
                prefix={<AppstoreOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Low Stock"
                value={data.lowStockProducts.length}
                prefix={<WarningOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Low stock section */}
        {data.lowStockProducts.length > 0 && (
          <Card style={{ marginTop: 24 }}>
            <Title level={5}>Low Stock Products</Title>
            <Row gutter={[16, 16]}>
              {data.lowStockProducts.map((p) => (
                <Col xs={24} sm={12} md={8} key={p.id}>
                  <Card size="small">
                    <strong>{p.name}</strong>
                    <div>Stock: {p.stockQuantity}</div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
