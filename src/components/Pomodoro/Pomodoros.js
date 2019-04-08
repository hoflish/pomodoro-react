import React from "react"

const pomodoros = [
  {
    name: "Work",
    time: 1500,
  },
  {
    name: "Break",
    time: 600,
  }
]

const Pomodoros = ({ resetTimer, currentPomodoro, theme }) => {
  return (
    <div>
      {pomodoros.map((pomodoro, index) => (
        <button
          className={`btn btn-item ${
            currentPomodoro === pomodoro.time ? "selected" : ""
          }`}
          key={index}
          style={{
            color: theme.fontColor,
            backgroundColor: theme.bodyBg,
          }}
          onClick={e => resetTimer(e, pomodoro.time)}
        >
          {pomodoro.name}
        </button>
      ))}
    </div>
  )
}

export default Pomodoros
