import React, { Component } from 'react'

import Sketch from './components/Sketch'
import SC_Button from './components/SC_Button'
import SC_ToggleButton from './components/SC_ToggleButton'

export default class Container extends Component {
  constructor(props) {
    super(props)

    const { shift, enthropy, effect } = props

    this.state = {
      shift,
      enthropy,
      effect,
      isStarted: false
    }
  }

  handleStart = () => {
    this.setState({
      isStarted: true
    })
  }

  // handleMelodySequenceChange
  handleShiftChange = () => {
    const { setStoreShift, handleMelodySequenceChange } = this.props
    let shift = !this.state.shift

    setStoreShift(shift)

    if (shift) {
      handleMelodySequenceChange('steps2')
    } else {
      handleMelodySequenceChange('steps1')
    }

    this.setState({
      shift
    })
  }

  // handleMelodySoundPresetChange
  handleEnthropyChange = () => {
    const { setStoreEnthropy, handleMelodySoundPresetChange } = this.props
    const enthropy = !this.state.enthropy

    setStoreEnthropy(enthropy)

    if (enthropy) {
      handleMelodySoundPresetChange('preset1')
    } else {
      handleMelodySoundPresetChange('default')
    }

    this.setState({
      enthropy
    })
  }

  // handleMelodyChangeRandom
  handleEffectChange = () => {
    const { setStoreEffect } = this.props
    const effect = !this.state.effect
    setStoreEffect(effect)

    this.setState({
      effect
    })
  }

  renderStartButton = () => {
    return (
      <SC_Button
        text="Art Design & Coding Community"
        handleClick={this.handleStart}
      />
    )
  }

  renderUI = () => {
    const { sketchId, initSketch } = this.props
    const { shift, enthropy, effect } = this.state

    return (
      <>
        <Sketch id={sketchId} initSketch={initSketch}></Sketch>

        <div className="interface">
          <SC_ToggleButton
            text="shift"
            isOn={shift}
            handleClick={this.handleShiftChange}
          />

          <SC_ToggleButton
            text="enthropy"
            isOn={enthropy}
            handleClick={this.handleEnthropyChange}
          />

          <SC_ToggleButton
            text="effect"
            isOn={effect}
            handleClick={this.handleEffectChange}
          />
        </div>
      </>
    )
  }

  render() {
    const { isStarted } = this.state

    return (
      <div className="Container">
        {isStarted ? this.renderUI() : this.renderStartButton()}
      </div>
    )
  }
}
