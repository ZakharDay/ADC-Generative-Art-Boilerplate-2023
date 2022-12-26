import classnames from 'classnames'
import React, { PureComponent } from 'react'

export default class SelectItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick } = this.props

    const classes = classnames({
      SelectItem: true,
      active: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}
