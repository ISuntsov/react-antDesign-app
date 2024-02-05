import { Flex, Typography } from "antd";

const CoinInfo = ({ coin: { icon, name, symbol }, withSymbol }) => {
  return (
    <Flex align="center">
      <img src={icon} alt={name} style={{ width: 40, marginRight: 10 }} />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && `(${symbol}) `}
        {name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
