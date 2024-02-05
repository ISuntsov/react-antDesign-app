import { Typography, Tag, Divider } from "antd";
import CoinInfo from "./CoinInfo";

export const CoinInfoModal = ({ coin }) => {
  return (
    <>
      <CoinInfo withSymbol={true} coin={coin} />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 час: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 день: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>
        <Typography.Text strong>1 неделя: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Цена: </Typography.Text>
        {coin.price.toFixed(2)} $
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Цена в BTC: </Typography.Text>
        {coin.priceBtc} Btc
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Рыночная капитализация: </Typography.Text>
        {coin.marketCap.toFixed(2)} $
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Адрес контракта: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
};
