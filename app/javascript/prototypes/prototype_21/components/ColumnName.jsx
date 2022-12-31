import React, { PureComponent } from 'react'

export default class ColumnName extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { name } = this.props
    return <div className="ColumnName">{name}</div>
  }
}
