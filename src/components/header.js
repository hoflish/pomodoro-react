import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import ThemeContext from "./Theme/context"
import { Switch } from "./Switch"

const Header = ({ siteTitle, isLightTheme, toggleTheme }) => (
  <ThemeContext.Consumer>
    {theme => (
      <header
        className="topbar"
        style={{
          background: theme.headerBg,
        }}
      >
        <div className="topbar-inner">
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: theme.fontColor,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
          <Switch on={isLightTheme} onClick={toggleTheme} />
        </div>
      </header>
    )}
  </ThemeContext.Consumer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  isLightTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
