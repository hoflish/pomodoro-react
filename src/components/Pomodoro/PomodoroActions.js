import React from "react"
import Icon from "@mdi/react"
import {
  mdiReplay,
  mdiPlayCircleOutline,
  mdiVolumeHigh,
  mdiVolumeOff,
  mdiPauseCircleOutline,
} from "@mdi/js"

import ThemeContext from "../Theme/context"

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
            <div className={`player ${theme}`}>
              <button className="player-small-btn" onClick={resetTimer}>
                <Icon path={mdiReplay} color={iconColor} />
              </button>
              <button
                onClick={isPlaying ? stopTimer : startTimer}
                className="player-big-btn"
              >
                <Icon
                  path={
                    isPlaying ? mdiPauseCircleOutline : mdiPlayCircleOutline
                  }
                  color={iconColor}
                />
              </button>
              <button className="player-small-btn" onClick={toggleAlarm}>
                <Icon
                  path={isAlarming ? mdiVolumeHigh : mdiVolumeOff}
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
