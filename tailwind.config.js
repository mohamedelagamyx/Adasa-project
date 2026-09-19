export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Tajawal", "Cairo", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#151515",
        paper: "#fbfaf7",
        brass: "#c59b54",
        moss: "#6d7a54",
        clay: "#b96345",
        graphite: "#2f3437",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(21, 21, 21, 0.12)",
      },
    },
  },
  plugins: [],
};
