import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductsItemsPage } from "./pages/ProductsItemsPage";
import { PurchasesRetailPage } from "./pages/PurchasesRetailPage";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/purchases/retail" replace />} />
        <Route path="/purchases/retail" element={<PurchasesRetailPage />} />
        <Route path="/products/items" element={<ProductsItemsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
