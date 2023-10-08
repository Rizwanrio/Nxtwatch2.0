import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minute: 25,
    sec: 0,
    valDef: 25,
    status: false,
  }

  plsBtn = () => {
    const {status} = this.state
    if (!status) {
      this.setState(prev => ({
        valDef: prev.valDef + 1,
        minute: prev.minute + 1,
      }))
    }
  }

  minBtn = () => {
    const {status} = this.state
    if (!status) {
      this.setState(prev => ({
        valDef: prev.valDef - 1,
        minute: prev.minute - 1,
      }))
    }
  }

  decMin = () => {
    const {minute} = this.state
    if (minute === 0) {
      clearInterval(this.id)
      this.setState({status: false, sec: 0, minute: 0})
    } else {
      this.setState(prev => ({minute: prev.minute - 1, sec: 59}))
    }
  }

  startTimer = () => {
    const {sec} = this.state
    if (sec === 0) {
      this.decMin()
    } else {
      this.setState(prev => ({sec: prev.sec - 1}))
    }
  }

  startBtn = () => {
    this.id = setInterval(this.startTimer, 1000)
    this.setState({
      status: true,
    })
  }

  pauseBtn = () => {
    clearInterval(this.id)
    this.setState({status: false})
  }

  resetBtn = () => {
    clearInterval(this.id)
    this.setState({
      minute: 25,
      sec: 0,
      valDef: 25,
      status: false,
    })
  }

  render() {
    const {sec, minute, status, valDef} = this.state
    const minutes = minute < 10 ? `0${minute}` : minute
    const seconds = sec < 10 ? `0${sec}` : sec
    const btn = status ? this.pauseBtn : this.startBtn
    const btnText = status ? 'Pause' : 'Start'
    const text = status ? 'Running' : 'Paused'
    const altT = status ? 'pause icon' : 'play icon'
    const imgT = status ? 'pause-icon' : 'play-icon'

    return (
      <div className="app">
        <h1>Digital Timer</h1>
        <div className="main">
          <div className="cont">
            <div className="time">
              <h1>
                {minutes}:{seconds}
              </h1>
              <p>{text}</p>
            </div>
          </div>
          <div className="console">
            <div className="right">
              <div className="control">
                <button type="button" onClick={btn}>
                  <img
                    className="icon"
                    src={`https://assets.ccbp.in/frontend/react-js/${imgT}-img.png`}
                    alt={altT}
                  />
                  {btnText}
                </button>
                <button type="button" onClick={this.resetBtn}>
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div>
              <p>Set Timer Limit</p>
            </div>
            <div className="setTime">
              <button type="button" className="btn1" onClick={this.minBtn}>
                -
              </button>
              <div className="num">
                <p>{valDef}</p>
              </div>
              <button type="button" className="btn1" onClick={this.plsBtn}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
