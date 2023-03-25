import React, { Component } from 'react'

import Sketch from './components/Sketch'
import SC_Slider from './components/SC_Slider'
import SC_Button from './components/SC_Button'

export default class Container extends Component {
  constructor(props) {
    super(props)

    const { waveAmplitude } = props

    this.state = {
      waveAmplitude,
      isStarted: false
    }
  }

  handleStart = () => {
    this.setState({
      isStarted: true
    })
  }

  handleWaveAmplitudeChange = (property, value) => {
    const { setStoreWaveAmplitude } = this.props
    setStoreWaveAmplitude(value)

    this.setState({
      waveAmplitude: value
    })
  }

  renderStartButton = () => {
    return (
      <SC_Button
        text="Art Design & Coding Community"
        handleClick={this.handleStart}
      />
    )
  }

  renderUI = () => {
    const { sketchId, initSketch } = this.props
    const { waveAmplitude } = this.state

    return (
      <>
        <Sketch id={sketchId} initSketch={initSketch}></Sketch>

        <div className="interface">
          <SC_Slider
            name="Amplitude"
            min={0}
            max={300}
            step={1}
            value={waveAmplitude}
            property="waveAmplitude"
            handleChange={this.handleWaveAmplitudeChange}
          />
        </div>
      </>
    )
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
