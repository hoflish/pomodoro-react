/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./Header"
import Footer from "./Footer"

import "./layout.css"
import { useTheme } from "../contexts/theme"

const SITE_TITLE_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children }) => {
  const { theme, dark, toggle } = useTheme()
  return (
    <StaticQuery
      query={SITE_TITLE_QUERY}
      render={data => (
        <div
          className="page-container"
          style={{
            backgroundColor: theme.bodyBg,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header
            theme={theme}
            isLightTheme={!dark}
            toggleTheme={toggle}
            siteTitle={data.site.siteMetadata.title}
          />
          {children}
          <Footer />
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
