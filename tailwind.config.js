module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",

    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBackground: "#12224F", // Add your custom color here
        textInputBg: "rgba(232,232,232,.24)",
        textInputBorder: "rgba(212,212,212,100)",
        catGroupBorder: "#15C6B7",
        catGroupBg: "#BFFFFA",
        catGroupFont: "#4C5E5F",
        catPersonalBorder: "#006A8A",
        catPersonalBg: "rgba(143, 229, 255, 0.5)",
        catPersonalFont: "#006A8A",
        dateFillColor: "rgba(207,207,207,.26)",
        dateStroke: "#E1E1E1",
        userScheduleFontColor: "#9A9A9A",
        dateName: "#8A8A8A",
        dateNumber: "#494949",
        //For Task Categories
        GroupTaskBg: "rgba(66,244,229,.33)",
        GroupTaskFontColor: "#007A70",
        //For Task Type
        PlanningBg: "rgba(239,102,237,.33)",
        PlanningFontColor: "#BC009A",
        //TaskOverView
        StatusBgOngoing: "rgba(34,255,14,.33)",
        StatusFontColor: "#009732",
        btnSignOut: "rgba(211,237,255, .45)",
        statusColor: "#F98A51",
      },
    },
  },
  plugins: [],
};
