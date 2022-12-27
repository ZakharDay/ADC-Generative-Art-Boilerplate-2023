import classnames from 'classnames'
import React, { PureComponent } from 'react'

export default class SC_ToggleButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick } = this.props

    const classes = classnames({
      SC_ToggleButton: true,
      active: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}
