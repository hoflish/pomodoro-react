import React from "react"
import Icon from "../Icon"

import { ThemeContext } from "../Theme/context"

const PomodoroActions = ({
  isPlaying,
  isAlarming,
  toggleAlarm,
  startTimer,
  stopTimer,
  resetTimer,
}) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const iconColor = theme.iconColor

        return (
          <div className="player-container">
            <div className="player">
              <button className="player-small-btn" onClick={resetTimer}>
                <Icon name="replay" color={iconColor} />
              </button>
              <button
                onClick={isPlaying ? stopTimer : startTimer}
                className="player-big-btn"
              >
                <Icon
                  name={isPlaying ? "pauseCircleOutline" : "playCircleOutline"}
                  color={iconColor}
                  size={2.5}
                />
              </button>
              <button className="player-small-btn" onClick={toggleAlarm}>
                <Icon
                  name={isAlarming ? "alarm" : "alarmOff"}
                  color={iconColor}
                />
              </button>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default PomodoroActions
