import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { Switch } from "./Switch"

const Header = ({ siteTitle, theme, isLightTheme, toggleTheme }) => {
  return (
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
  )
}

Header.propTypes = {
  isLightTheme: PropTypes.bool,
  siteTitle: PropTypes.string,
  toggleTheme: PropTypes.func.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
