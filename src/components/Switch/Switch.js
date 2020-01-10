import React from "react"

import "./switch.css"

export default class Switch extends React.Component {
  render() {
    const { on, className = "", ...rest } = this.props
    const btnClassName = [
      className,
      "toggle-btn",
      on ? "toggle-btn-on" : "toggle-btn-off",
    ]
      .filter(Boolean)
      .join(" ")
    return (
      <div style={{ padding: "0 8px" }}>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={() => {
            // changing is handled by clicking the button
          }}
        />
        <button className={btnClassName} aria-label="Toggle" {...rest} />
      </div>
    )
  }
}
