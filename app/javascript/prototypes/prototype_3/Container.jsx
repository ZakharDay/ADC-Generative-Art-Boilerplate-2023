import React, { Component } from 'react'

import SC_Button from './SC_Button'
import SC_ToggleButtonSet from './SC_ToggleButtonSet'
import SC_Slider from './SC_Slider'

export default class Container extends Component {
  constructor(props) {
    super(props)

    let audioCtx

    let oscillator = {
      settings: {
        type: 'square',
        frequency: 440
      },
      node: {}
    }

    this.state = {
      audioCtx,
      oscillator
    }
  }

  createNewOscillator = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillatorNode = audioCtx.createOscillator()
    const { oscillator } = this.state

    oscillatorNode.type = oscillator.settings.type

    oscillatorNode.frequency.setValueAtTime(
      oscillator.settings.frequency,
      audioCtx.currentTime
    )

    oscillatorNode.connect(audioCtx.destination)
    oscillatorNode.start()

    this.setState({
      audioCtx,
      oscillator: {
        settings: {
          type: oscillator.settings.type,
          frequency: oscillator.settings.frequency
        },
        node: oscillatorNode
      }
    })
  }

  handleOscillatorPropertyChange = (property, value) => {
    const { audioCtx, oscillator } = this.state

    if (property === 'type') {
      oscillator.node.type = value
      oscillator.settings.type = value
    }

    if (property === 'frequency') {
      oscillator.node.frequency.setValueAtTime(value, audioCtx.currentTime)
      oscillator.settings.frequency = value
    }

    this.setState({
      oscillator
    })
  }

  render() {
    const options = ['sine', 'square', 'sawtooth', 'triangle']
    const { oscillator } = this.state

    return (
      <div className="Container">
        <SC_Button
          text="Art Design & Coding Community"
          handleClick={this.createNewOscillator}
        />

        <SC_ToggleButtonSet
          name="Type"
          options={options}
          value={oscillator.settings.type}
          property="type"
          handleChange={this.handleOscillatorPropertyChange}
        />

        <SC_Slider
          name="Frequency"
          min={0}
          max={1000}
          step={1}
          value={oscillator.settings.frequency}
          property="frequency"
          handleChange={this.handleOscillatorPropertyChange}
        />
      </div>
    )
  }
}
