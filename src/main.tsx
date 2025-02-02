import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register();
