export const mermaidThemeByMode = {
  light: {
    theme: "base",
    themeVariables: {
      primaryColor: "#3b82f6",
      primaryBorderColor: "#2563eb",
      primaryTextColor: "#0f172a",
      lineColor: "#334155",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
    },
  },
  dark: {
    theme: "base",
    themeVariables: {
      primaryColor: "#3b82f6",
      primaryBorderColor: "#60a5fa",
      primaryTextColor: "#f8fafc",
      lineColor: "#cbd5e1",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
    },
  },
} as const;
