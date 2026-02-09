import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NoticeProvider } from "./components/NoticeCenter";
import "./index.css";
import App from "./App";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NoticeProvider>
        <App />
      </NoticeProvider>
    </BrowserRouter>
  </StrictMode>,
)
