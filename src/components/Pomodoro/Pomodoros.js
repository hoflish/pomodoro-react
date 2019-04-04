import React from "react"

const pomodoros = [
  {
    name: "Work",
    time: 1500,
  },
  {
    name: "Break",
    time: 600,
  },
]

const Pomodoros = ({ resetTimer, timer }) => {
  return (
    <div className="btn-wrapper">
      {pomodoros.map((pomodoro, index) => (
        <button
          className={`btn ${timer === pomodoro.time ? "selected" : ""}`}
          key={index}
          style={{ padding: "0 8px" }}
          onClick={e => resetTimer(e, pomodoro.time, true)}
        >
          {pomodoro.name}
        </button>
      ))}
    </div>
  )
}

export default Pomodoros
