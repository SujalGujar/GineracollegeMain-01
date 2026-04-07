"use client";

import { useTheme } from "../ThemeProvider.jsx";
import { Toaster as Sonner } from "sonner@2.0.3";

const Toaster = ({ ...props }) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };