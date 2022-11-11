import React, { PureComponent } from 'react'

export default class Surface extends PureComponent {
  constructor(props) {
    super(props)
    this.surface = React.createRef()
    this.pointer = React.createRef()

    this.state = {
      sizeX: 0,
      sizeY: 0,
      pointerSize: 0,
      pointerRadius: 0
    }
  }

  componentDidMount() {
    const surface = this.surface.current
    const surfaceRect = surface.getBoundingClientRect()
    const pointer = this.pointer.current
    const pointerRect = pointer.getBoundingClientRect()

    this.setState({
      sizeX: surfaceRect.width,
      sizeY: surfaceRect.height,
      pointerSize: pointerRect.width,
      pointerRadius: pointerRect.width / 2
    })
  }

  handleMouseDown = () => {
    console.log('handleMouseDown')
  }

  handleMouseMove = (e) => {
    const surface = this.surface.current
    const surfaceRect = surface.getBoundingClientRect()
    const x = e.clientX - surfaceRect.x
    const y = e.clientY - surfaceRect.y
    const value = { x, y }

    this.props.handleValueChange('delaySurface', value)

    console.log('handleMouseMove')
  }

  handleMouseUp = () => {
    console.log('handleMouseUp')
  }

  render() {
    const { minX, maxX, stepX, valueX, minY, maxY, stepY, valueY } = this.props
    const { sizeX, sizeY, pointerSize, pointerRadius } = this.state

    const rangeY = maxY - minY
    const stepsY = rangeY / stepY
    const stepInPixelsY = sizeY / stepsY
    const pointerY = (valueY / stepY) * stepInPixelsY - pointerRadius

    const rangeX = maxX - minX
    const stepsX = rangeX / stepX
    const stepInPixelsX = sizeX / stepsX
    const pointerX = (valueX / stepX) * stepInPixelsX - pointerRadius

    const pointerStyle = {
      transform: `translate(${pointerX}px, ${pointerY}px)`
    }

    return (
      <div
        className="Surface"
        ref={this.surface}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <div className="pointer" style={pointerStyle} ref={this.pointer} />
      </div>
    )
  }
}
