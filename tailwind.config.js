module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        design: {
          pink: "#F514B2",
          blue: "#2966F5",
          darkBlue: "#192143",
          darkBlue2: "#2E3966",
          steelBlue: "#20294A",
          grey: "#A9A7BB",
          gold: "#F8C100",
          red: "#F71D41",
          green: "#43D05B",
          white: "#F0EBFF",
          background: "#090B16",
          background2: "#11172C",
          background3: "#252D49",
          background4: "#090B15",
          background5: "#151C35",
          backgroundPink: "#351741",
          backgroundBlack: "#020202",
          gradientPink: "#F514B2",
          gradientPurple: "#3262F2",
          gradientDarkBlue: "#2559D5          ",
          gradientBlue: "#15244C",
          gradientDarkPink: "#9E36CE",
        },
        brands: {
          discord: "#7289DA",
          telegram: "#0088CC",
          twitter: "#1DA1F2",
          youtube: "#FF0000",
          twitch: "#6441A5",
        },
      },
      borderWidth: {
        3: "3px",
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
