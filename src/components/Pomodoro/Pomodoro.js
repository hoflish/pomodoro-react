import React, { Component } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import { format } from "../../utils"
import { ThemeConsumer } from "../../contexts/theme"
import Pomodoros from "./Pomodoros"
import PomodoroActions from "./PomodoroActions"

import alarm from "../../assets/alarm.mp3"
import "./pomodoro.css"

export default class Pomodoro extends Component {
  static propTypes = {
    defaultPomodoro: PropTypes.number.isRequired,
    defaultStart: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      time: props.defaultPomodoro,
      pomodoro: props.defaultPomodoro,
      isPlaying: props.defaultStart,
      isAlarming: true,
      isNotifying: false,
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
    const { time } = this.state
    this.setState({ isPlaying: true })
    const timeTillRun = Date.now() + time * 1000
    this.intervel = setInterval(() => this.tick(timeTillRun), 1000)
  }

  tick = timeTillRun => {
    const left = Math.round((timeTillRun - Date.now()) / 1000)
    if (left < 0) {
      const { isAlarming, isNotifying } = this.state
      clearInterval(this.intervel)
      if (isAlarming) {
        this.audio.play()
      }
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
    clearInterval(this.intervel)
    this.setState({ isPlaying: false })
  }

  resetTimer = (e, time = this.state.pomodoro, start = false) => {
    clearInterval(this.intervel)
    this.setState({ time, pomodoro: time, isPlaying: false }, () => {
      if (start) this.startTimer()
    })
  }

  toggleAlarm = () => {
    this.setState(({ isAlarming }) => {
      if (!this.audio.paused && isAlarming) {
        this.audio.pause()
        this.audio.currentTime = 0
      }
      return { isAlarming: !isAlarming }
    })
  }

  render() {
    const { time, pomodoro, isPlaying, isAlarming } = this.state
    const formatedTime = format(time)

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <main style={{ backgroundColor: theme.contentBg, flex: "auto" }}>
            <div className="content box">
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
              <div className="timer" style={{ color: theme.timerColor }}>
                {formatedTime}
              </div>
              <PomodoroActions
                theme={theme}
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
            </div>
          </main>
        )}
      </ThemeConsumer>
    )
  }
}
