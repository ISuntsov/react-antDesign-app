import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import Chart from "../Chart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Портфель:
        {` ${assets
          .reduce(
            (acc, asset) => (acc += cryptoPriceMap[asset.id] * asset.amount),
            0
          )
          .toFixed(2)} $`}
      </Typography.Title>
      <Chart />
      <AssetsTable />
    </Layout.Content>
  );
}
