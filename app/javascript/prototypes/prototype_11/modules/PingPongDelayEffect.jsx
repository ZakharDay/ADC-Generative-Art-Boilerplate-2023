import React, { Component } from 'react'

import SC_Slider from '../components/SC_Slider.jsx'

export default class PingPongDelayEffect extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { instrumentName, settings } = this.props
    const { wet, delayTime, maxDelayTime } = settings.pingPongDelay

    return (
      <div className="PingPongDelayEffect">
        <h1>{instrumentName}</h1>

        <SC_Slider
          name="Wet"
          property="pingPongDelayWet"
          min={0}
          max={1}
          step={0.01}
          value={wet}
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Delay Time"
          property="pingPongDelayDelayTime"
          min={0}
          max={1}
          step={0.01}
          value={delayTime}
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Max Delay Time"
          property="pingPongDelayMaxDelayTime"
          min={0}
          max={1}
          step={0.01}
          value={maxDelayTime}
          handleChange={this.handleValueChange}
        />
      </div>
    )
  }
}
