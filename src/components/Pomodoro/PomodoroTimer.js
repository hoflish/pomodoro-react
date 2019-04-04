import React from "react"

import { format } from "../../utils"

const PomodoroTimer = ({ timeInSeconds }) => (
  <div className="timer">{format(timeInSeconds)}</div>
)

export default PomodoroTimer
