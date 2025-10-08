import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, Typography, Card, Form } from "antd";
import { useState } from "react";
import { productItems } from "../data/ProductItems.tsx";
import { addOrder, AddOrder } from "../service/appService.ts";
import dayjs from "dayjs";
import { FieldFormat } from "../data/appConstant.ts";

const { Title, Text } = Typography;

export default function CheckoutPage() {
  const [form] = Form.useForm();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const productItem = productItems.filter((x) => x.id === productId );
  const product = productItem && productItem?.[0]
  const handleSubmit = (values: AddOrder) => {
    setLoading(true);
    addOrder(values).then(() => {
      setLoading(false);
      form.resetFields();
      navigate(-1)
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "16px",
      }}
    >
      <Card
        style={{
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={4}>Подтверждение заказа</Title>
        <Text type="secondary">
          Пожалуйста, проверьте детали и перейдите к оплате.
        </Text>

        <div className="my-4 border-t" />

        <Text strong>Продукт: </Text>{product.title}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
          initialValues={{
            phone: '+7',
            product: product.title,
            orderDt: dayjs(dayjs().format(FieldFormat.Date), FieldFormat.Date).toString(),
            amount: product.price.toString(),
          }}
          form={form}
        >
          <Form.Item name="firstName" label="Имя" rules={[{ required: true }]}>
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item name="lastName" label="Фамилия" rules={[{ required: true }]}>
            <Input placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[{ required: true }]}
          >
            <Input placeholder="+7 (777) 123-45-67" />
          </Form.Item>

          <div className="flex justify-between items-center mt-2">
            <Text strong>К оплате:</Text>
            <Text className="px-3 py-1 bg-amber-100 rounded">
               {product.price} KZT
            </Text>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={() => navigate(-1)}>Назад</Button>
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="primary" htmlType="submit" loading={loading}>
              Оплатить (скоро)
            </Button>
          </div>

          <Form.Item name="product" hidden={true}></Form.Item>
          <Form.Item name="orderDt" hidden={true}></Form.Item>
          <Form.Item name="amount" hidden={true}></Form.Item>
        </Form>
      </Card>
    </div>
  );
}