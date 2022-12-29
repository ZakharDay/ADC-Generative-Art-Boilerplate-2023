import React, { PureComponent } from 'react'

import ColumnName from './ColumnName'

export default class ChainColumn extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { chain } = this.props
    const effectElements = []

    chain.settings.effects.forEach((effect, i) => {
      effectElements.push(
        <div className="ColumnRow" key={i}>
          {effect}
        </div>
      )
    })

    return (
      <div className="ChainColumn">
        <ColumnName name={chain.name} />
        {effectElements}
      </div>
    )
  }
}
