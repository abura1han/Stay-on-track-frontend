module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "stay-max-width": "1220px",
      },
      minHeight: {
        "stay-nav-min-height": "calc(100vh - 20px)",
      },
      width: {},
      colors: {
        "stay-primary": "#E16259",
        "stay-deep-blue": "#030C5F",
        "stay-sky": "#1886C5",
        "stay-border": "#D1D5DB",
      },
    },
  },
  plugins: [],
};
