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
  InputNumber,
  Popconfirm,
  Select,
} from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import {
  getSales,
  createSale,
  updateSale,
  deleteSale,
  getProducts,
} from "../api/sales";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Sales() {
  const screens = useBreakpoint();
  const queryClient = useQueryClient();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();

  // Fetch sales (paginated)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales", page],
    queryFn: () => getSales(page, 8),
    keepPreviousData: true,
  });

  // Fetch user products for dropdown
  const { data: productsData } = useQuery({
    queryKey: ["productsForSales"],
    queryFn: () => getProducts(),
  });

  if (isError) message.error(error.message || "Failed to load sales");

  const addMutation = useMutation({
    mutationFn: (values) => createSale(values),
    onSuccess: () => {
      message.success("Sale added successfully");
      queryClient.invalidateQueries(["sales"]);
      form.resetFields();
      setDrawerVisible(false);
    },
    onError: (err) => message.error(err.message || "Failed to add sale"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => updateSale(id, values),
    onSuccess: () => {
      message.success("Sale updated successfully");
      queryClient.invalidateQueries(["sales"]);
      form.resetFields();
      setDrawerVisible(false);
      setEditingSale(null);
    },
    onError: (err) => message.error(err.message || "Failed to update sale"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSale(id),
    onSuccess: () => {
      message.success("Sale deleted successfully");
      queryClient.invalidateQueries(["sales"]);
    },
    onError: (err) => message.error(err.message || "Failed to delete sale"),
  });

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Items",
      key: "items",
      render: (_, record) =>
        record.items.map((i) => `${i.product.name} x${i.quantity}`).join(", "),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (val) => `$${val}`,
    },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingSale(record);
              form.setFieldsValue({
                items: record.items.map((i) => ({
                  productId: i.product.id,
                  quantity: i.quantity,
                  price: i.price,
                })),
              });
              setDrawerVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this sale?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    // Ensure numbers for backend
    const payload = {
      items: values.items.map((i) => ({
        productId: Number(i.productId),
        quantity: Number(i.quantity),
        price: Number(i.price),
      })),
    };

    if (editingSale)
      updateMutation.mutate({ id: editingSale.id, values: payload });
    else addMutation.mutate(payload);
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
            <Title level={screens.md ? 3 : 4}>Sales</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingSale(null);
                form.resetFields();
                setDrawerVisible(true);
              }}
            >
              Add Sale
            </Button>
          </div>

          <Table
            dataSource={data?.data || []}
            columns={columns}
            rowKey="id"
            loading={isLoading}
            pagination={{
              current: data?.meta.page || page,
              pageSize: 8,
              total: data?.meta.total || 0,
              onChange: (p) => setPage(p),
            }}
            scroll={{ x: 600 }}
          />
        </Space>

        <Drawer
          title={editingSale ? "Edit Sale" : "Add Sale"}
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          size={screens.md ? 500 : "100%"}
          closeIcon={<CloseOutlined />}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key} // ONLY here
                      align="baseline"
                      style={{ display: "flex", marginBottom: 8 }}
                    >
                      <Form.Item
                        name={[field.name, "productId"]}
                        fieldKey={[field.fieldKey, "productId"]}
                        rules={[{ required: true, message: "Select product" }]}
                      >
                        <Select
                          placeholder="Select product"
                          style={{ width: 180 }}
                          options={productsData?.map((p) => ({
                            label: p.name,
                            value: p.id,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        name={[field.name, "quantity"]}
                        fieldKey={[field.fieldKey, "quantity"]}
                        rules={[{ required: true, message: "Enter quantity" }]}
                      >
                        <InputNumber placeholder="Qty" min={1} />
                      </Form.Item>

                      <Form.Item
                        name={[field.name, "price"]}
                        fieldKey={[field.fieldKey, "price"]}
                        rules={[{ required: true, message: "Enter price" }]}
                      >
                        <InputNumber placeholder="Price" min={0} step={0.01} />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusCircleOutlined />}
                    >
                      Add Item
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={addMutation.isLoading || updateMutation.isLoading}
              >
                {editingSale ? "Update Sale" : "Add Sale"}
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </AuthenticatedLayout>
  );
}
