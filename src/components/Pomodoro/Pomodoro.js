import React, { Component } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import { format, buildUrl } from "../../utils"
import { ThemeConsumer } from "../../contexts/theme"
import PomodoroHeader from "./PomodoroHeader"
import PomodoroFooter from "./PomodoroFooter"

import "./pomodoro.css"

export default class Pomodoro extends Component {
  static propTypes = {
    defaultPomodoro: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      time: props.defaultPomodoro,
      pomodoro: props.defaultPomodoro,
      isPlaying: false,
      isAlarming: true,
      isNotifying: false,
    }
  }

  componentDidMount() {
    this.notify()
  }

  componentWillUnmount = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
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
    const timeTillRun = Date.now() + time * 1000

    if (time === -0) {
      return
    }

    this.setState({ isPlaying: true }, () => {
      this.interval = setInterval(() => this.tick(timeTillRun), 1000)
    })
  }

  tick = time => {
    const left = Math.round((time - Date.now()) / 1000)
    if (left < 0 && !this.state.isPlaying) {
      return
    }

    if (left < 0) {
      const { isAlarming, isNotifying } = this.state
      this.stopTimer()

      if (isAlarming) {
        this.audio.play()
      }

      if (isNotifying) {
        const options = {
          body: "Reset your timer now",
          icon: buildUrl("tomato.png"),
          vibrate: isAlarming ? [] : [200, 100, 200],
        }

        return new Notification("Timer is Up!", options)
      }

      return
    }
    this.setState({ time: left })
  }

  stopTimer = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.setState({ isPlaying: false })
  }

  resetTimer = (e, time = this.state.pomodoro, start = false) => {
    if (this.interval) {
      clearInterval(this.interval)
    }

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
          <main style={{ backgroundColor: theme.background, flex: "auto" }}>
            <div className="content box">
              <Helmet>
                <title>
                  {isPlaying
                    ? `${formatedTime} | Pomodoro Timer`
                    : "Pomodoro Timer"}
                </title>
              </Helmet>
              <PomodoroHeader
                currentPomodoro={pomodoro}
                resetTimer={this.resetTimer}
                theme={theme}
              />
              <div className="timer" style={{ color: theme.timerColor }}>
                {formatedTime}
              </div>
              <PomodoroFooter
                isPlaying={isPlaying}
                isAlarming={isAlarming}
                toggleAlarm={this.toggleAlarm}
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                resetTimer={this.resetTimer}
              />
              <audio
                src={buildUrl("alarm.mp3", "video")}
                ref={audio => (this.audio = audio)}
              />
            </div>
          </main>
        )}
      </ThemeConsumer>
    )
  }
}
