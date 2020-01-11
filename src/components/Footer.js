import React from "react"
import Icon from "./Icon"

const Footer = ({theme}) => {
  return (
    <footer id="footer">
      <h6 style={{color: theme.fontColor}}>
        Made with
        <Icon
          style={{ margin: "0 4px" }}
          name="heart"
          size={0.6}
          color="#dd2e44"
        />
        by
        <a
          style={{ marginLeft: "4px", textDecoration: "none", color: theme.fontColor }}
          href="https://twitter.com/hoflish01"
          title="Twitter"
        >
          @hoflish
        </a>
      </h6>
    </footer>
  )
}

export default Footer
