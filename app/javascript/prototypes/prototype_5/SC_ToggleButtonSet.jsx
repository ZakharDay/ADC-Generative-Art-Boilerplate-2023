import React, { PureComponent } from 'react'

import SC_ToggleButton from './SC_ToggleButton'

export default class SC_ToggleButtonSet extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = (value) => {
    const { property, handleChange } = this.props
    handleChange(property, value)
  }

  render() {
    const { name, options, value } = this.props
    const buttonElements = []

    options.forEach((option, i) => {
      buttonElements.push(
        <SC_ToggleButton
          text={option}
          isOn={option === value}
          handleClick={() => this.handleChange(option)}
          key={i}
        />
      )
    })

    return (
      <div className="SC_ToggleButtonSet">
        <h3>{name}</h3>
        <div>{buttonElements}</div>
      </div>
    )
  }
}
