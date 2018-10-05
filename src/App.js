import React, { Component } from 'react'
import { Control } from './components/Control'
import Timer from './components/Timer'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {   
      breakLength: 5,
      tomatoLength: 25,
      timerToggle: false,
      timerReset: false,
      endOfSession: false
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleBreakLength = this.handleBreakLength.bind(this)
    this.handleTomatoLength = this.handleTomatoLength.bind(this)
    this.handleEndOfSession = this.handleEndOfSession.bind(this)
  }
  handleStart() { 
    document.body.style.animation = 'colorchange 1s forwards'

    let countdown = document.getElementById('countdown')
    
    if (!this.state.timerToggle) {
      if (!this.state.endOfSession)
        countdown.style.animation = `countdown ${this.state.tomatoLength * 60}s linear running`
      else
        countdown.style.animation = `countdown ${this.state.breakLength * 60}s linear running`
        
      countdown.style.stroke = 'white'      
    } else {
      countdown.style.animationPlayState = 'paused'
    }
    
    this.setState(prevState => ({
      timerToggle: !prevState.timerToggle
    }))
  } 
  handleReset() {
    this.setState(prevState => ({
      breakLength: 5,
      tomatoLength: 25,
      timerToggle: false,
      endOfSession: false,
      timerReset: !prevState.timerReset
    })) 
    document.getElementById('beep').currentTime = 0
    
    document.body.style.animation = 'colorback 1s forwards'
    
    document.getElementById('countdown').style.stroke = 'black'
    document.getElementById('countdown').style.animation = 'initial'
  }  
  handleBreakLength(length) {
    if (length <= 60 && length > 0) {
      document.getElementById('countdown').style.animation = 'initial'

      this.setState(prevState => ({
        breakLength: length,
        timerReset: !prevState.timerReset
      }))
    }     
  }
  handleTomatoLength(length) {
    if (length <= 60 && length > 0) {
      document.getElementById('countdown').style.animation = 'initial'
      
      this.setState(prevState => ({
        tomatoLength: length,
        timerReset: !prevState.timerReset
      }))
    }
  } 
  handleEndOfSession() {
    if (this.state.endOfSession)
      this.handleReset()
    else { 
      document.getElementById('countdown').style.animation = 'initial'
      
      this.setState(prevState => ({
        endOfSession: true,
        timerReset: !prevState.timerReset
      }))      
    }    
  }
  render() {
    const name = this.state.endOfSession ? 'Break' : 'Session'
    const time = this.state.endOfSession ? this.state.breakLength : this.state.tomatoLength
    const faClass = this.state.timerToggle ? 'fa fa-pause fa-3x' : 'fa fa-play fa-3x' 
    return(
      <div className='container'>
        <h1 className='title'>Pomodoro Cl<i className='fa fa-clock-o'/>ck</h1>
        <Control name='Break Length'
                 incId='break-increment'
                 decId='break-decrement'
                 trigger={this.state.timerToggle}
                 length={this.state.breakLength}
                 onClick={this.handleBreakLength}/>
        <Control name='Session Length'
                 incId='session-increment'
                 decId='session-decrement'
                 trigger={this.state.timerToggle}
                 length={this.state.tomatoLength}
                 onClick={this.handleTomatoLength}/>
        <Timer  time={time} 
                name={name}
                toggle={this.state.timerToggle}
                reset={this.state.timerReset}                
                onEndOfSession={this.handleEndOfSession}
                startBreak={this.state.endOfSession}/>        
        <div onClick={this.handleStart} className='btn' id='start_stop'><i className={faClass}/></div>
        <div onClick={this.handleReset} className='btn' id='reset'><i className='fa fa-refresh fa-3x'/></div>
      </div>
    )
  }
}

export default App;
