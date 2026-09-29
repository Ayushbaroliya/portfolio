import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import "./globals.css";
const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element was not found.");
}
createRoot(rootElement).render(<StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>);
