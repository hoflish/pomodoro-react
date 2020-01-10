import React from "react"
import MDIcon from "@mdi/react"

let MDIcons

try {
  MDIcons = require("@mdi/js")
} catch (e) {
  MDIcons = ({ name, color, size = 1, ...rest }) => {
    console.warn(
      `Tried to use the icon '${name}' in a component, but '@mdi/js' is not installed. To remove this warning, install '@mdi/js' or use another method to specify icon.`
    )

    return (
      <span
        style={{ color, width: `${size}rem`, height: `${size}rem` }}
        {...rest}
      >
        □
      </span>
    )
  }
}

const Icon = ({ name, color, size = 1, ...rest }) => {
  if (!name) return null

  if (typeof name === "string") {
    const path = MDIcons[`mdi${name.charAt(0).toUpperCase() + name.slice(1)}`]

    if (!path) {
      console.warn(`The icon '${name}' does not exist in '@mdi/js'`)
      return (
        <span
          style={{ color, width: `${size}rem`, height: `${size}rem` }}
          {...rest}
        >
          □
        </span>
      )
    }

    return <MDIcon path={path} color={color} size={size} {...rest} />
  }
  return (
    <span
      style={{ color, width: `${size}rem`, height: `${size}rem` }}
      {...rest}
    >
      □
    </span>
  )
}

export default Icon
