import React, { PureComponent } from 'react'

import SelectItem from './SelectItem'

export default class Select extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClick = (e) => {
    const {
      isOpened,
      handleMelodyChangeMeasureSelectOpen,
      handleMelodyChangeMeasureSelectClose
    } = this.props

    console.log('handleClick', isOpened)

    if (isOpened) {
      console.log('True')
      handleMelodyChangeMeasureSelectClose(e)
    } else {
      console.log('False')
      handleMelodyChangeMeasureSelectOpen(e)
    }
  }

  handleChange = (value) => {
    const { property, handleChange } = this.props
    handleChange(property, value)
  }

  renderSelectItems = () => {
    const { options, value } = this.props
    const selectItems = []

    options.forEach((option, i) => {
      selectItems.push(
        <SelectItem
          text={option}
          isOn={option === value}
          handleClick={() => this.handleChange(option)}
          key={i}
        />
      )
    })

    return <div className="options">{selectItems}</div>
  }

  render() {
    const {
      name,
      isOpened,
      value,
      handleMelodyChangeMeasureSelectOpen,
      handleMelodyChangeMeasureSelectClose
    } = this.props

    return (
      <div className="Select">
        <div className="currentValue" onClick={this.handleClick}>
          {name}: {value}
        </div>

        {isOpened ? this.renderSelectItems() : ''}
      </div>
    )
  }
}
