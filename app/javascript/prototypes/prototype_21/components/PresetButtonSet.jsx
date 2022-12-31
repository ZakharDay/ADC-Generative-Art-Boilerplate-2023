import React, { PureComponent } from 'react'

import SC_ToggleButton from './SC_ToggleButton'

export default class PresetButtonSet extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = (presetIndex) => {
    const { instrumentId, handleChange } = this.props
    handleChange(instrumentId, presetIndex)
  }

  render() {
    const { options, value } = this.props
    const buttonElements = []

    options.forEach((option, i) => {
      buttonElements.push(
        <SC_ToggleButton
          text={option}
          isOn={option === value}
          handleClick={() => this.handleChange(i)}
          key={i}
        />
      )
    })

    return (
      <div className="PresetButtonSet">
        <div>{buttonElements}</div>
      </div>
    )
  }
}
