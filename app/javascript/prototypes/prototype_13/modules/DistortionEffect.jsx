import React, { Component } from 'react'

import SC_Slider from '../components/SC_Slider.jsx'
import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'

export default class DistortionEffect extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { title, instrumentName, settings } = this.props
    const { wet, distortion, oversample } = settings.distortion
    const oversampleTypes = ['none', '2x', '4x']

    return (
      <div className="DistortionEffect">
        <h3>{title}</h3>

        <SC_Slider
          name="Wet"
          property="distortionWet"
          min={0}
          max={1}
          step={0.01}
          value={wet}
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Distortion"
          property="distortionDistortion"
          min={0}
          max={20}
          step={0.01}
          value={distortion}
          handleChange={this.handleValueChange}
        />

        <SC_ToggleButtonSet
          name="Oversample"
          property="distortionOversample"
          value={oversample}
          options={oversampleTypes}
          handleChange={this.handleValueChange}
        />
      </div>
    )
  }
}
