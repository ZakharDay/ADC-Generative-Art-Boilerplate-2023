import React, { Component } from 'react'

import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
import SC_Slider from '../components/SC_Slider.jsx'
import SC_Knob from '../components/SC_Knob.jsx'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { settings, handleValueChange } = this.props

    return (
      <div className="ToneSynth">
        <SC_Knob
          name="Channel Pan"
          min={-1}
          max={1}
          value={0}
          property="channelPan"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Channel Volume"
          min={-60}
          max={10}
          step={1}
          value={settings.channel.volume}
          property="channelVolume"
          handleChange={handleValueChange}
        />

        <SC_ToggleButton
          text="Mute"
          isOn={settings.channel.mute}
          handleClick={() =>
            handleValueChange('channelMute', !settings.channel.mute)
          }
        />
      </div>
    )
  }
}
