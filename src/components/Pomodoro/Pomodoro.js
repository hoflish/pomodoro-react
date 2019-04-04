import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { format } from "../../utils";
import Pomodoros from './Pomodoros';
import PomodoroTimer from './PomodoroTimer';
import PomodoroActions from './PomodoroActions';

import alarm from "../../assets/alarm.mp3";
import "./pomodoro.css";

const LEFT_SECONDS_TO_START_ALARM = 10;

export default class Pomodoro extends Component {
  static propTypes = {
    defaultPomodoro: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: props.defaultPomodoro,
      time: props.defaultPomodoro,
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

  startTimer = () => {
    this.setState({ isPlaying: true });
    const { time } = this.state;
    const currentTime = Date.now();
    const timeTillRun = currentTime + (time * 1000);
    
    this.intervel = setInterval(() => {
      const left = Math.round((timeTillRun - Date.now()) / 1000)
      if (left === LEFT_SECONDS_TO_START_ALARM) {
        this.audio.play();
      } 

      if (left < 0) {
        clearInterval(this.intervel);
        this.stopAlarm();
        if (this.state.notification) {
          new Notification('Timer is Up!', {
            body: 'Reset your timer now',
            icon: './tomato.png'
          });
        }
        return;
      }
      this.setState({ time: left });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.intervel);
    this.stopAlarm()
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
    }
  };

  resetTimer = (e, time = this.state.timer, start = false) => {
    clearInterval(this.intervel);
    this.stopAlarm();
    this.setState({ time, timer: time, isPlaying: false }, () => {
      if (start) this.startTimer();
    });
  };

  stopAlarm = () => {
    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  render() {
    const { time, timer, isPlaying } = this.state;
    return (
      <div>
        <Helmet>
          <title>
            {isPlaying ? `${format(time)} | Pomodoro Timer` : 'Pomodoro Timer'}
          </title>
        </Helmet>
        <Pomodoros timer={timer} resetTimer={this.resetTimer}/>
        <PomodoroTimer timeInSeconds={time}/>
        <PomodoroActions 
          isPlaying={isPlaying}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
        />
        <audio src={alarm} type="audio/mpeg" ref={audio => { this.audio = audio } } />
      </div>
    );
  }
}