import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PhotographyPage from "./PhotographyPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PhotographyPage />
  </StrictMode>
);
