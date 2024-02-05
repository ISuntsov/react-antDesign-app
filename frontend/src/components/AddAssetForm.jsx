import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

export const AddAssetForm = ({ onCloseForm }) => {
  const { crypto, addAsset } = useCrypto();
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  const validateMessages = {
    required: "${lalel} обязательно",
    types: { number: "${lalel} не является валидным числом" },
    number: { range: "${lalel} должно быть между ${min} и ${max}" },
  };

  if (submitted) {
    return (
      <Result
        status="success"
        title="Новый актив добавлен"
        subTitle={`Добавлено ${assetRef.current.amount} ${coin.name} по цене ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onCloseForm}>
            Закрыть
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Выберите валюту"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  };

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: (value * price).toFixed(2),
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
        total: 0,
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}>
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Количество"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}>
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Введите количество валюты"
          onChange={handleAmountChange}
        />
      </Form.Item>

      <Form.Item label="Цена" name="price">
        <InputNumber
          onChange={handlePriceChange}
          // disabled
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Дата/время" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Итого" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Добавить актив
        </Button>
      </Form.Item>
    </Form>
  );
};
