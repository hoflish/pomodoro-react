/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { ThemeContext, defaultContext } from "./Theme/context"
import Header from "./header"

import "./layout.css"

const SITE_TITLE_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLightTheme: true,
    }
  }

  toggleTheme = () => {
    this.setState(({ isLightTheme }) => ({ isLightTheme: !isLightTheme }))
  }

  render() {
    const { isLightTheme } = this.state
    const themeValue = defaultContext[isLightTheme ? "light" : "dark"]

    return (
      <ThemeContext.Provider value={themeValue}>
        <StaticQuery
          query={SITE_TITLE_QUERY}
          render={data => (
            <div
              className="page-container"
              style={{ backgroundColor: themeValue.bodyBg }}
            >
              <Header
                isLightTheme={isLightTheme}
                toggleTheme={this.toggleTheme}
                siteTitle={data.site.siteMetadata.title}
              />
              {this.props.children}
              <footer />
            </div>
          )}
        />
      </ThemeContext.Provider>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
