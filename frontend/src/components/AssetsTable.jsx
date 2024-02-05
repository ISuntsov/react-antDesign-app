import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";

const columns = [
  {
    title: "Название",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Цена, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Количество",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
];

const AssetsTable = () => {
  const { assets } = useCrypto();

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default AssetsTable;
