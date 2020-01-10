import React from "react"
import Icon from "../Icon"

const PomodoroActions = ({
  theme,
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
          <Icon name="replay" color={theme.iconColor} />
        </button>
        <button
          onClick={isPlaying ? stopTimer : startTimer}
          className="player-big-btn"
        >
          <Icon
            name={isPlaying ? "pauseCircleOutline" : "playCircleOutline"}
            color={theme.iconColor}
            size={2.5}
          />
        </button>
        <button className="player-small-btn" onClick={toggleAlarm}>
          <Icon
            name={isAlarming ? "alarm" : "alarmOff"}
            color={theme.iconColor}
          />
        </button>
      </div>
    </div>
  )
}

export default PomodoroActions
