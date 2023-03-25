import React, { PureComponent } from 'react'

export default class Sketch extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { id, initSketch } = this.props
    initSketch(id)
  }

  render() {
    const { id } = this.props
    return <div className="sketch" id={id}></div>
  }
}
