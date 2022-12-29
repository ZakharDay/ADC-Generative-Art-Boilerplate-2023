import React, { PureComponent } from 'react'

import ColumnName from './ColumnName'
import PresetButtonSet from './PresetButtonSet'

export default class InstrumentColumn extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = (presetIndex) => {
    const { instrument, handleChange } = this.props
    handleChange(instrument.id, presetIndex)
  }

  render() {
    const { instrument, handleChange } = this.props
    const options = instrument.presets.map((preset, i) => 'Preset ' + (i + 1))

    return (
      <div className="InstrumentColumn">
        <ColumnName name={instrument.name} />

        <PresetButtonSet
          instrumentId={instrument.id}
          options={options}
          value={'Preset ' + (instrument.settings.preset + 1)}
          handleChange={handleChange}
        />
      </div>
    )
  }
}
