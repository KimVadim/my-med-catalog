import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, Typography, Card, Form, Divider } from "antd";
import { useState } from "react";
import { productItems } from "../data/ProductItems.tsx";
import { addOrder, AddOrder } from "../service/appService.ts";
import dayjs from "dayjs";
import { FieldRules } from "../data/appConstant.ts";
import {
  CreditCardOutlined,
  LeftOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        openLink: (url: string) => void;
      };
    };
  }
}

export default function CheckoutPage() {
  const [form] = Form.useForm();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("+7");

  const productItem = productItems.filter((x) => x.id === productId );
  const product = productItem && productItem?.[0]

  const handleSubmit = (values: AddOrder) => {
    setLoading(true);
    addOrder(values).then(() => {
      setLoading(false);
      form.resetFields();
      navigate('/');

      const paymentUrl = "https://pay.kaspi.kz/pay/todlxgem";

      // Используем window.open - работает и в Telegram WebApp, и в браузере
      window.open(paymentUrl, '_blank');

    }).catch((error) => {
      setLoading(false);
      console.error('Order submission failed:', error);
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // удалить все недопустимые символы

    if (value.startsWith("7") || value.startsWith("8")) {
      if (value.length > 1) {
        value = "7" + value.substring(1);
      } else {
        value = "7";
      }
    } else if (value.length > 0) {
      value = "7" + value;
    }

    let formattedPhone = "+7";
    if (value.length > 1) {
      formattedPhone += " (" + value.substring(1, 4);
    }
    if (value.length >= 5) {
      formattedPhone += ") " + value.substring(4, 7);
    }
    if (value.length >= 8) {
      formattedPhone += "-" + value.substring(7, 9);
    }
    if (value.length >= 10) {
      formattedPhone += "-" + value.substring(9, 11);
    }

    setPhone(formattedPhone.substring(0, 18));
    form.setFieldsValue({ phone: formattedPhone.substring(0, 18) });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflowY: "auto",
      }}
    >
      <Card
        style={{
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: '500px',
        }}
      >
        <Title level={3}>Подтверждение заказа</Title>
        <Text type="secondary">
          Пожалуйста, проверьте детали и перейдите к оплате.
        </Text>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
          <Text strong style={{marginRight: '5px', marginTop: '2px'}} type="secondary">Продукт: </Text>
          <Text strong style={{fontSize: '16px'}}>{product.title}</Text>
        </div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            phone: '+7',
            product: product.title,
            orderDt: dayjs().toISOString(),
            amount: product.price,
          }}
          form={form}
          style={{
            marginTop: "10px",
          }}
        >
          <Form.Item name="firstName" label="Имя" rules={[FieldRules.Required, FieldRules.ClientName]}>
            <Input
              placeholder="Имя"
              style={{
                height: "36px",
                backgroundColor: "#faf7eeff",
              }}
            />
          </Form.Item>
          <Form.Item name="lastName" label="Фамилия" rules={[FieldRules.Required, FieldRules.ClientName]}>
            <Input
              placeholder="Фамилия"
              style={{
                height: "36px",
                backgroundColor: "#faf7eeff",
              }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[FieldRules.Required, FieldRules.PhoneNum]}
          >
            <Input
              value={phone}
              placeholder="+7 (777) 123-45-67"
              onChange={handlePhoneChange}
              maxLength={18}
              style={{
                height: "36px",
                backgroundColor: "#faf7eeff",
              }}
            />
          </Form.Item>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
            <Text strong style={{ fontSize: "18px", padding: "6px 14px", }}>
              К оплате:
            </Text>
            <Text
              style={{
                fontSize: "18px",
                padding: "6px 14px",
                backgroundColor: "#edc56eff",
                borderRadius: "6px",
                fontWeight: 600,
              }}
            >
               {product.price.toLocaleString('ru-RU')} KZT
            </Text>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button
              onClick={() => navigate(-1)}
              style={{
                width: "100%",
                height: "36px",
                backgroundColor: "#faf7eeff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <LeftOutlined /> Назад
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                height: "36px",
                backgroundColor: "#edc56eff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CreditCardOutlined /> Оплатить (Kaspi)
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