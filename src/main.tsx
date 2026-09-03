import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { SeoHead } from "./components/SeoHead";
import "lenis/dist/lenis.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SeoHead />
      <App />
    </BrowserRouter>
  </StrictMode>
);
