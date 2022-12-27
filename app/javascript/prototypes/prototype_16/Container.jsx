import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './components/SC_Button'

const nodes = {}

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  initDAW = () => {
    // setup instruments from settings
  }

  handleStartButtonClick = () => {
    this.initDAW()
    this.handleTransportChange('play', true)
  }

  handleTransportChange = (property, value) => {
    const { bpm } = this.state

    switch (property) {
      case 'play':
        Tone.Transport.start()
        Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')

        this.setState({
          isStarted: true
        })
        break
      case 'bpm':
        Tone.Transport.bpm.value = value

        this.setState({
          bpm: value
        })
        break
    }
  }

  renderStartButton = () => {
    return (
      <SC_Button
        text="Art Design & Coding Community"
        handleClick={this.handleStartButtonClick}
      />
    )
  }

  renderUI = () => {
    return <></>
  }

  render() {
    const { isStarted } = this.state

    return (
      <div className="Container">
        {isStarted ? this.renderUI() : this.renderStartButton()}
      </div>
    )
  }
}
