import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Typography,
  Button,
  Space,
  message,
  Grid,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../api/products";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Products() {
  const screens = useBreakpoint();
  const queryClient = useQueryClient();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, 8),
    keepPreviousData: true,
  });

  if (isError) message.error(error.message || "Failed to load products");

  const addMutation = useMutation({
    mutationFn: (values) => addProduct(values),
    onSuccess: () => {
      message.success("Product added successfully");
      queryClient.invalidateQueries(["products"]);
      form.resetFields();
      setDrawerVisible(false);
    },
    onError: (err) => message.error(err.message || "Failed to add product"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => updateProduct(id, values),
    onSuccess: () => {
      message.success("Product updated successfully");
      queryClient.invalidateQueries(["products"]);
      form.resetFields();
      setDrawerVisible(false);
      setEditingProduct(null);
    },
    onError: (err) => message.error(err.message || "Failed to update product"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      message.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => message.error(err.message || "Failed to delete product"),
  });

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "SKU", dataIndex: "sku", key: "sku" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val) => `$${val}`,
    },
    {
      title: "Stock Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setDrawerVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    if (editingProduct)
      updateMutation.mutate({ id: editingProduct.id, values });
    else addMutation.mutate(values);
  };

  return (
    <AuthenticatedLayout>
      <div style={{ padding: screens.md ? "24px" : "16px" }}>
        <Space orientation="vertical" style={{ width: "100%" }} size="large">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={screens.md ? 3 : 4}>Products</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingProduct(null);
                form.resetFields();
                setDrawerVisible(true);
              }}
            >
              Add Product
            </Button>
          </div>

          <Table
            dataSource={data?.data || []}
            columns={columns}
            rowKey="id"
            loading={isLoading}
            pagination={{
              current: data?.page || page,
              pageSize: data?.limit || 8,
              total: data?.total || 0,
              onChange: (p) => setPage(p),
            }}
            scroll={{ x: 600 }}
          />
        </Space>

        <Drawer
          title={editingProduct ? "Edit Product" : "Add Product"}
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          size={screens.md ? 400 : "100%"}
          closeIcon={<CloseOutlined />}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true, message: "Enter product name" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="SKU"
              name="sku"
              rules={[{ required: true, message: "Enter SKU" }]}
            >
              <Input placeholder="Enter SKU" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Enter price" },
                { type: "number", message: "Must be a number" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="Enter price"
              />
            </Form.Item>

            <Form.Item
              label="Stock Quantity"
              name="stockQuantity"
              rules={[
                { required: true, message: "Enter stock quantity" },
                { type: "number", message: "Must be a number" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter stock quantity"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={addMutation.isLoading || updateMutation.isLoading}
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </AuthenticatedLayout>
  );
}
