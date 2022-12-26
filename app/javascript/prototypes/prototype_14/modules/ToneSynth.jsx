import React, { Component } from 'react'

import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { title, settings } = this.props
    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="ToneSynth">
        <h2>{title}</h2>

        <SC_ToggleButtonSet
          name="Synth Type"
          options={options}
          value={settings.oscillator.type}
          property="synthType"
          handleChange={this.handleValueChange}
        />

        <div>
          <SC_Slider
            name="Synth Envelope Attack"
            min={0}
            max={10}
            step={0.01}
            value={settings.envelope.attack}
            property="synthEnvelopeAttack"
            handleChange={this.handleValueChange}
          />

          <SC_Slider
            name="Synth Envelope Decay"
            min={0}
            max={10}
            step={0.01}
            value={settings.envelope.decay}
            property="synthEnvelopeDecay"
            handleChange={this.handleValueChange}
          />

          <SC_Slider
            name="Synth Envelope Sustain"
            min={0}
            max={1}
            step={0.01}
            value={settings.envelope.sustain}
            property="synthEnvelopeSustain"
            handleChange={this.handleValueChange}
          />

          <SC_Slider
            name="Synth Envelope Release"
            min={0}
            max={10}
            step={0.01}
            value={settings.envelope.release}
            property="synthEnvelopeRelease"
            handleChange={this.handleValueChange}
          />
        </div>
      </div>
    )
  }
}
