import React, { PureComponent } from 'react'

import ColumnName from './ColumnName'

export default class BusColumn extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { bus } = this.props
    const effectElements = []

    bus.settings.effects.forEach((effect, i) => {
      effectElements.push(
        <div className="ColumnRow" key={i}>
          {effect}
        </div>
      )
    })

    return (
      <div className="BusColumn">
        <ColumnName name={bus.name} />
        {effectElements}
      </div>
    )
  }
}
