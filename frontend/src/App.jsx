import { Spin } from "antd";
import { CryptoContextProvider, useCrypto } from "./context/crypto-context";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  const { loading } = useCrypto();

  if (loading) return <Spin fullscreen />;

  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
