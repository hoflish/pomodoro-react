import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import alarm from "../assets/alarm.mp3";
import "./main.css";

export default class Timer extends Component {
  static propTypes = {
    initialPomodoro: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: props.initialPomodoro,
      time: props.initialPomodoro,
      isPlaying: false,
      notification: false
    };
  }

  componentDidMount() {
    this.startTimer();
    this.notify();
  }

  componentWillUnmount = () => {
    clearInterval(this.intervel);
  };

  notify() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        this.setState({ notification: true });
    } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function (permission) {
              if (permission === "granted") {
                  this.setState({ notification: true });
              }
        });
    }
}

  format = seconds => {
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 3600 % 60);
    const timeFormated = this.leftPad(mins) + ":" + this.leftPad(secs);
    return timeFormated;
  }

  leftPad = val => {
    return (val < 10 ? "0" : "") + val;
  }

  startTimer = () => {
    this.setState({ isPlaying: true });
    const { time } = this.state;
    const currentTime = Date.now();
    const timeTillRun = currentTime + (time * 1000);
    
    this.intervel = setInterval(() => {
      const left = Math.round((timeTillRun - Date.now()) / 1000)
      if (left <= 15) this.audio.play();
      if (left < 0 && this.state.notification) {
        new Notification('Timer is Up!', {
          body: 'Reset you timer now',
          badge: ''
        });
      }
      if (left < 0 || !this.state.isPlaying) {
        this.audio.pause();
        clearInterval(this.intervel);
        return;
      }
      this.setState({ time: left });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.intervel);
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
    }
  };

  resetTimer = (e, time = this.state.timer, start = false) => {
    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.intervel);
    this.setState({ time, isPlaying: false }, () => {
      if (start) this.startTimer();
    });
  };

  render() {
    const { time, isPlaying } = this.state;
    return (
      <div>
        <Helmet>
          <title>
            {isPlaying
              ? `(${this.format(time)}) | Pomodoro Timer`
              : 'Pomodoro Timer'}
          </title>
        </Helmet>
        <div className="btn-wrapper">
          <button
            className="btn btn-start-time"
            onClick={e => this.resetTimer(e, 1500, true)}
          >
            Pomodoro
          </button>
          <button
            className="btn btn-start-time"
            onClick={e => this.resetTimer(e, 600, true)}
          >
            Long Break
          </button>
          <button
            className="btn btn-start-time"
            onClick={e => this.resetTimer(e, 300, true)}
          >
            Short Break
          </button>
        </div>
        <div className="timer">
          <span>{this.format(time)}</span>
        </div>
        <div className="btn-wrapper">
          <button className="btn btn-bottom btn-start" disabled={isPlaying} onClick={this.startTimer}>
            Start
          </button>
          <button className="btn btn-bottom btn-stop" onClick={this.stopTimer}>
            Stop
          </button>
          <button className="btn btn-bottom btn-reset" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
        <audio src={alarm} ref={audio => (this.audio = audio)} />
      </div>
    );
  }
}