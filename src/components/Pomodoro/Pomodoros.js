import React from "react"

const pomodoros = [
  {
    name: "25 MIN",
    time: 1500,
  },
  {
    name: "10 MIN",
    time: 600,
  },
  {
    name: "5 MIN",
    time: 300,
  }
]

const Pomodoros = ({ resetTimer, currentPomodoro, theme }) => {
  return (
    <div className="pomodoros">
      {pomodoros.map((pomodoro, index) => (
        <button
          key={index}
          className={`btn btn-item ${
            currentPomodoro === pomodoro.time ? "selected" : ""
          }`}
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

export default Pomodoros;