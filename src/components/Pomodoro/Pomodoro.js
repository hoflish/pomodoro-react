import React, { Component } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import { format } from "../../utils"
import ThemeContext from "../Theme/context"
import Pomodoros from "./Pomodoros"
import PomodoroActions from "./PomodoroActions"

import alarm from "../../assets/alarm.mp3"
import "./pomodoro.css"

const LEFT_SECONDS_TO_START_ALARM = 10
const WORK_POMODORO = 1500
const BREAK_POMODORO = 600

export default class Pomodoro extends Component {
  static propTypes = {
    defaultPomodoro: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      pomodoro: props.defaultPomodoro,
      time: props.defaultPomodoro,
      isPlaying: false,
      isNotifying: false,
      isAlarming: false,
    }
  }

  componentDidMount() {
    if (this.state.isPlaying) {
      this.startTimer()
    }
    this.notify()
  }

  componentWillUnmount = () => {
    clearInterval(this.intervel)
  }

  notify() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification")
    } else if (Notification.permission === "granted") {
      this.setState({ isNotifying: true })
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          this.setState({ isNotifying: true })
        }
      })
    }
  }

  startTimer = () => {
    this.setState({ isPlaying: true })
    const { time } = this.state
    const timeTillRun = Date.now() + time * 1000
    this.intervel = setInterval(() => this.tick(timeTillRun), 1000)
  }

  tick = timeTillRun => {
    const { isAlarming, isNotifying } = this.state
    const left = Math.round((timeTillRun - Date.now()) / 1000)
    if (left === LEFT_SECONDS_TO_START_ALARM && isAlarming) {
      this.audio.play()
    }
    if (left < 0) {
      clearInterval(this.intervel)
      if (isNotifying) {
        new Notification("Timer is Up!", {
          body: "Reset your timer now",
          icon: "./tomato.png",
        })
      }
      return
    }
    this.setState({ time: left })
  }

  stopTimer = () => {
    if (!this.audio.paused) {
      this.stopAlarm();
    }
    clearInterval(this.intervel)
    this.setState({ isPlaying: false })
  }

  resetTimer = (e, time = this.state.pomodoro, start = false) => {
    if (!this.audio.paused) {
      this.stopAlarm();
    }
    clearInterval(this.intervel)    
    this.setState({ time, pomodoro: time, isPlaying: false }, () => {
      if (start) this.startTimer()
    })
  }

  toggleAlarm = () => {
    this.setState(({ isAlarming }) => {
      if (isAlarming && !this.audio.paused) {
        this.stopAlarm();
      }
      return { isAlarming: !isAlarming }
    })
  }

  stopAlarm = () => {
    this.audio.pause()
    this.audio.currentTime = 0
  }

  getTimerColor = (theme, pomodoro, isPlaying) => {
    let timerColor = theme.timerColor
    if (isPlaying) {
      switch (pomodoro) {
        case WORK_POMODORO:
          timerColor = theme.workColor
          break
        case BREAK_POMODORO:
          timerColor = theme.breakColor
          break
        default:
          break
      }
    }
    return timerColor
  }

  render() {
    const { time, pomodoro, isPlaying, isAlarming } = this.state
    const formatedTime = format(time)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <main
            className="content box"
            style={{ backgroundColor: theme.contentBg }}
          >
            <Helmet>
              <title>
                {isPlaying
                  ? `${formatedTime} | Pomodoro Timer`
                  : "Pomodoro Timer"}
              </title>
            </Helmet>
            <Pomodoros
              currentPomodoro={pomodoro}
              resetTimer={this.resetTimer}
              theme={theme}              
            />
            <div
              className="timer"
              style={{ color: this.getTimerColor(theme, pomodoro, isPlaying) }}
            >
              {formatedTime}
            </div>
            <PomodoroActions
              isPlaying={isPlaying}
              isAlarming={isAlarming}
              toggleAlarm={this.toggleAlarm}
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
              resetTimer={this.resetTimer}
            />
            <audio
              src={alarm}
              type="audio/mpeg"
              ref={audio => {
                this.audio = audio
              }}
            />
          </main>
        )}
      </ThemeContext.Consumer>
    )
  }
}
