import React, { PureComponent } from 'react'

export default class InstrumentName extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { name } = this.props
    return <div className="InstrumentName">{name}</div>
  }
}
