import React from "react";
import { format } from "../../utils";

const pomodoros = [
    {
        name: "Pomodoro",
        time: 1500
    },
    {
        name: "Long Break",
        time: 600
    },
    {
        name: "Short Break",
        time: 300
    }
];

const Pomodoros = ({resetTimer, timer}) => {
    return (
        <div className="btn-wrapper">
          {
              pomodoros.map((pomodoro, index) => (
              <button
                key={index}
                className="btn"
                onClick={e => resetTimer(e, pomodoro.time, true)}
              >
                {timer === pomodoro.time ? `${pomodoro.name} (${format(timer)})` : pomodoro.name}
              </button>))
          }
        </div>      
    );
}

export default Pomodoros;