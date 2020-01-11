import React from "react"
import Icon from "../Icon"

const PomodoroFooter = ({
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
          <Icon name="replay" />
        </button>
        <button
          onClick={isPlaying ? stopTimer : startTimer}
          className="player-big-btn"
        >
          <Icon
            name={isPlaying ? "pauseCircleOutline" : "playCircleOutline"}
            size={2.5}
          />
        </button>
        <button className="player-small-btn" onClick={toggleAlarm}>
          <Icon name={isAlarming ? "alarm" : "alarmOff"} />
        </button>
      </div>
    </div>
  )
}

export default PomodoroFooter
