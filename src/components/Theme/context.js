import React from "react"

export const defaultContext = {
  light: {
    bodyBg: "#fbfbfb",
    headerBg: "#ffffff",
    contentBg: "#ffffff",
    fontColor: "#663399",
    timerColor: "hsla(0, 0%, 0%, 0.8)",
    iconColor: "#606060",
    workColor: "#e0245e",
    breakColor: "#17bf63",
  },
  dark: {
    bodyBg: "#10171e",
    headerBg: "#1c2938",
    contentBg: "#15202b",
    fontColor: "#fff",
    timerColor: "hsla(206, 14%, 59%, 0.8)",
    iconColor: "#8899a6",
    workColor: "#e0245e",
    breakColor: "#17bf63",
  },
}

const ThemeContext = React.createContext(defaultContext.light)

export default ThemeContext
