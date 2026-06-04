import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Smoothly fade out and remove the HTML preloader once React starts mounting
const preloader = document.getElementById("app-preloader");
if (preloader) {
  preloader.style.opacity = "0";
  preloader.style.visibility = "hidden";
  setTimeout(() => {
    preloader.remove();
  }, 400);
}

createRoot(document.getElementById("root")!).render(<App />);