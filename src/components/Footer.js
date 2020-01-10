import React from "react"
import Icon from "./Icon"

const Footer = props => (
  <footer id="footer">
    <h6>
      Made with
      <Icon
        style={{ margin: "0 4px" }}
        name="heart"
        size={0.6}
        color="#dd2e44"
      />
      by
      <a
        style={{ marginLeft: "4px", textDecoration: "none" }}
        href="https://twitter.com/hoflish01"
        title="Twitter"
      >
        @hoflish
      </a>
    </h6>
  </footer>
)

export default Footer
