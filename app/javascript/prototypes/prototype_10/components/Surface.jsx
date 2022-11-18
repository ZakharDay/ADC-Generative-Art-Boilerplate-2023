import React, { PureComponent } from 'react'

export default class Surface extends PureComponent {
  constructor(props) {
    super(props)
    this.surface = React.createRef()
    this.pointer = React.createRef()

    this.state = {
      mouseDown: false
    }
  }

  componentDidMount() {
    const { minX, maxX, stepX, minY, maxY, stepY } = this.props

    const surface = this.surface.current
    const surfaceRect = surface.getBoundingClientRect()
    const pointer = this.pointer.current
    const pointerRect = pointer.getBoundingClientRect()

    const sizeX = surfaceRect.width
    const rangeX = maxX - minX
    const stepsX = rangeX / stepX

    const sizeY = surfaceRect.height
    const rangeY = maxY - minY
    const stepsY = rangeY / stepY

    this.setState({
      pointerRadius: pointerRect.width / 2,
      stepInPixelsX: sizeX / stepsX,
      stepInPixelsY: sizeY / stepsY,
      sizeX,
      sizeY
    })

    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown = () => {
    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp = () => {
    this.setState({
      mouseDown: false
    })
  }

  handleMouseMove = (e) => {
    const {
      minX,
      maxX,
      stepX,
      propertyX,
      minY,
      maxY,
      stepY,
      propertyY,
      handleValueChange
    } = this.props

    const { mouseDown, stepInPixelsX, stepInPixelsY } = this.state

    if (mouseDown) {
      const surface = this.surface.current
      const surfaceRect = surface.getBoundingClientRect()
      const pointerX = e.clientX - surfaceRect.x
      const pointerY = e.clientY - surfaceRect.y

      let valueX = (pointerX / stepInPixelsX) * stepX
      let valueY = (pointerY / stepInPixelsY) * stepY

      if (valueX <= minX) {
        valueX = minX
      } else if (valueX >= maxX) {
        valueX = maxX
      }

      if (valueY <= minY) {
        valueY = minY
      } else if (valueY >= maxY) {
        valueY = maxY
      }

      handleValueChange(propertyX, valueX)
      handleValueChange(propertyY, valueY)
    }
  }

  render() {
    const { stepX, valueX, stepY, valueY } = this.props
    const { pointerRadius, stepInPixelsX, stepInPixelsY } = this.state
    const pointerY = (valueY / stepY) * stepInPixelsY - pointerRadius
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
