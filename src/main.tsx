import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { SectionVisibilityProvider } from "./context/SectionVisibilityContext";

// Smoothly fade out and remove the HTML preloader once React starts mounting
const preloader = document.getElementById("app-preloader");
if (preloader) {
  preloader.style.opacity = "0";
  preloader.style.visibility = "hidden";
  setTimeout(() => {
    preloader.remove();
  }, 400);
}

createRoot(document.getElementById("root")!).render(
  <SectionVisibilityProvider>
    <App />
  </SectionVisibilityProvider>
);