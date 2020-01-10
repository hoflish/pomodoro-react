import React from "react"
import DefaultTheme from "../styles/DefaultTheme"

const initialState = {
  dark: false,
  theme: DefaultTheme.light,
  toggle: () => {},
}

const ThemeContext = React.createContext(initialState)

function ThemeProvider({ children }) {
  const [dark, setDark] = React.useState(false) // default theme is light

  // On mount, read the preferred theme from the persistence
  React.useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true"
    setDark(isDark)
  }, [dark])

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark
    localStorage.setItem("dark", JSON.stringify(isDark))
    setDark(isDark)
  }

  // Filter the styles based on the theme selected
  const theme = dark ? DefaultTheme.dark : DefaultTheme.light

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ThemeConsumer({ children }) {
  return (
    <ThemeContext.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error("ThemeConsumer must be used within a ThemeProvider")
        }
        return children(context)
      }}
    </ThemeContext.Consumer>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(`useTheme must be within a ThemeProvider`)
  }
  return context
}

export { ThemeProvider, ThemeConsumer, useTheme }
