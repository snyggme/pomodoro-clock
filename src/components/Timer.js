import React, { Component } from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: this.props.time,
      seconds: 0,
      timerId: 0
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.reset !== nextProps.reset) 
      this.setState({
        minutes: nextProps.time,
        seconds: 0
      })

    if (nextProps.toggle) {
      if (this.state.timerId === 0)
        this.setState({
          timerId: setInterval(this.handleTimeChange, 1000)
        })     
    }
    else 
      this.clearTimer()
  }
  clearTimer() {
    clearInterval(this.state.timerId)
    this.setState({
      timerId: 0
    })
  }
  handleTimeChange() {
    if (this.state.seconds === 0 && this.state.minutes === 0) {
      document.getElementById('beep').play()
      
      this.clearTimer()
      this.props.onEndOfSession()
      
      return
    }
    
    if (this.props.startBreak)
      document.getElementById('countdown').style.animation = `countdown ${this.props.time * 60}s linear running`
    
    if (this.state.seconds > 0) {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1
      }))
    } else {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59
      })) 
    }      
  }
  render() {
    return(
      <div className='timer-container'>
        <div id='timer-label'><h2>{this.props.name}</h2></div>
        <div id='time-left' style={{fontSize: '80px'}}>
          {twoDigits(this.state.minutes)}:{twoDigits(this.state.seconds)}
          <audio id='beep' src='https://raw.githubusercontent.com/snyggme/m3-solution/master/site/mp3_bank1/beep.mp3'></audio>
        </div>
        <svg> 
          <circle id='countdown' r="160" cx="165" cy="165"></circle>
        </svg>
      </div>
    )
  }
}

const twoDigits = (num) => num > 9 ? num : '0' + num

export default Timer