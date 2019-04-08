import React from "react"

import ThemeContext, { defaultContext } from "./context"

export default class ThemeProvider extends React.Component {
  state = {
    theme: "light",
  }

  render() {
    const { theme } = this.state
    return (
      <ThemeContext.Provider value={defaultContext[theme]}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}
