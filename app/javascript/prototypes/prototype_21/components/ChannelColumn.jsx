import React, { PureComponent } from 'react'

import ColumnName from './ColumnName'
import VerticalSlider from './VerticalSlider'
import Knob from './Knob'

export default class ChannelColumn extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleChannelVolumeChange = (property, value) => {
    const { channel, handleChannelVolumeChange } = this.props
    handleChannelVolumeChange(channel.id, property, value)
  }

  render() {
    const { channel, handleChannelVolumeChange } = this.props

    console.log(channel.settings.pan)

    return (
      <div className="ChannelColumn">
        <ColumnName name={channel.name} />

        <VerticalSlider
          name="Volume"
          min={-60}
          max={30}
          step={0.1}
          property="volume"
          value={channel.settings.volume}
          handleChange={this.handleChannelVolumeChange}
        />
      </div>
    )
  }
}
