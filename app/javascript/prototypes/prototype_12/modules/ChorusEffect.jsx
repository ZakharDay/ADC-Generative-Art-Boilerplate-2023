import React, { Component } from 'react'

import SC_Slider from '../components/SC_Slider.jsx'
import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'

export default class ChorusEffect extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { instrumentName, settings } = this.props
    const { wet, type, frequency, delayTime, depth, spread } = settings.chorus
    const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

    return (
      <div className="ChorusEffect">
        <h1>{instrumentName}</h1>

        <SC_Slider
          name="Wet"
          property="chorusWet"
          min={0}
          max={1}
          step={0.01}
          value={wet}
          handleChange={this.handleValueChange}
        />

        <SC_ToggleButtonSet
          name="Type"
          property="chorusType"
          value={type}
          options={oscillatorTypes}
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Frequency"
          property="chorusFrequency"
          min={0}
          max={100}
          step={0.01}
          value={frequency}
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Delay Time"
          property="chorusDelayTime"
          min={0}
          max={30}
          step={1}
          value={delayTime}
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Depth"
          property="chorusDepth"
          min={0}
          max={1}
          step={0.01}
          value={depth}
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Spread"
          property="chorusSpread"
          min={0}
          max={360}
          step={1}
          value={spread}
          handleChange={this.handleValueChange}
        />
      </div>
    )
  }
}
