import React from "react"

const pomodoros = [
  {
    name: "Pomodoro",
    time: 1500,
  },
  {
    name: "Long Break",
    time: 600,
  },
  {
    name: "Short Break",
    time: 300,
  },
]

const PomodoroHeader = ({ resetTimer, currentPomodoro, theme }) => {
  return (
    <div className="pomodoros">
      {pomodoros.map((pomodoro, index) => {
        const selected = currentPomodoro === pomodoro.time
        return (
          <button
            key={index}
            className={`btn btn-item ${selected ? "selected" : ""}`}
            style={{
              color: theme.fontColor,
            }}
            onClick={e => resetTimer(e, pomodoro.time)}
          >
            {pomodoro.name}
          </button>
        )
      })}
    </div>
  )
}

export default PomodoroHeader
