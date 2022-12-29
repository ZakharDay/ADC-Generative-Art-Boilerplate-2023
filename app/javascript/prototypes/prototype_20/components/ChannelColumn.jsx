import React, { PureComponent } from 'react'

import ColumnName from './ColumnName'

export default class ChannelColumn extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { channel } = this.props

    return (
      <div className="ChannelColumn">
        <ColumnName name={channel.name} />
      </div>
    )
  }
}
