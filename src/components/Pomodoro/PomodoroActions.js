import React from "react"
import Icon from "@mdi/react"
import {
  mdiReplay,
  mdiPlayCircleOutline,
  mdiVolumeHigh,
  mdiVolumeOff,
  mdiPauseCircleOutline,
} from "@mdi/js"

const PomodoroActions = ({
  isPlaying,
  isAlarming,
  toggleAlarm,
  startTimer,
  stopTimer,
  resetTimer,
}) => {
  return (
    <div className="player-container">
      <div className="player">
        <button className="player-small-btn" onClick={resetTimer}>
          <Icon path={mdiReplay} />
        </button>
        <button
          onClick={isPlaying ? stopTimer : startTimer}
          className="player-big-btn"
        >
          <Icon
            path={isPlaying ? mdiPauseCircleOutline : mdiPlayCircleOutline}
          />
        </button>
        <button className="player-small-btn" onClick={toggleAlarm}>
          <Icon path={isAlarming ? mdiVolumeHigh : mdiVolumeOff} />
        </button>
      </div>
    </div>
  )
}

export default PomodoroActions
