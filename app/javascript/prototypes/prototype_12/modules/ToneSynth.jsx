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

  renderEnvelopeControls = () => {
    const { settings, handleValueChange } = this.props

    return (
      <div>
        <SC_Slider
          name="Synth Envelope Attack"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.attack}
          property="synthEnvelopeAttack"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Synth Envelope Decay"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.decay}
          property="synthEnvelopeDecay"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Synth Envelope Sustain"
          min={0}
          max={1}
          step={0.01}
          value={settings.synth.envelope.sustain}
          property="synthEnvelopeSustain"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Synth Envelope Release"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.release}
          property="synthEnvelopeRelease"
          handleChange={this.handleValueChange}
        />
      </div>
    )
  }

  render() {
    const { settings } = this.props
    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="ToneSynth">
        <SC_ToggleButtonSet
          name="Synth Type"
          options={options}
          value={settings.synth.oscillator.type}
          property="synthType"
          handleChange={this.handleValueChange}
        />

        <br />

        <SC_ToggleButton
          text="Envelope"
          isOn={settings.synthUI.envelopeShow}
          handleClick={() =>
            this.handleValueChange(
              'synthShowEnvelope',
              !settings.synthUI.envelopeShow
            )
          }
        />

        {settings.synthUI.envelopeShow ? this.renderEnvelopeControls() : ''}
      </div>
    )
  }
}
