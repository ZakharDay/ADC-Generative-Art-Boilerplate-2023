import React, { PureComponent } from 'react'

export default class VerticalSlider extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  handleChange = () => {
    const { property, handleChange } = this.props
    const value = this.input.current.valueAsNumber
    handleChange(property, value)
  }

  render() {
    const { name, min, max, step, value } = this.props

    return (
      <div className="VerticalSlider">
        <h3>
          {name} {value}
        </h3>

        <div className="wrapper">
          <input
            className="range vertical-heighest-first"
            ref={this.input}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onInput={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
