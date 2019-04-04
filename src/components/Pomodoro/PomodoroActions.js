import React from "react";

const PomodoroActions = ({isPlaying, startTimer, stopTimer, resetTimer}) => {
    return (
        <div className="btn-wrapper">
            <button 
                className="btn btn-bottom btn-start" 
                disabled={isPlaying} 
                onClick={startTimer}
            >
                Start
            </button>
            <button className="btn btn-bottom btn-stop" onClick={stopTimer}>
                Stop
            </button>
            <button className="btn btn-bottom btn-reset" onClick={resetTimer}>
                Reset
            </button>
        </div>
    )
}

export default PomodoroActions;