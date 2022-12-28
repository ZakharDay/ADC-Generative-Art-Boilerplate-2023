import * as Tone from 'tone'
import React, { Component } from 'react'

import { generateHash } from './utilities'

import SC_Button from './components/SC_Button'

const nodes = {}

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  initDAW = () => {
    return new Promise((resolve, reject) => {
      const channels = this.initChannels()

      const instruments = this.initInstruments()
      this.initLoops(instruments)

      this.setState({
        instruments,
        channels
      })

      resolve(instruments)
    })
  }

  initInstruments = () => {
    const instruments = []

    this.props.instruments.forEach((instrument, i) => {
      const id = generateHash()
      const { settings, presets } = instrument
      const presetSettings = presets[settings.preset]
      const node = this.createInstrumentNode(presetSettings)
      const state = structuredClone(instrument)

      nodes[id] = node
      state.id = id

      instruments.push(state)
    })

    return instruments
  }

  createInstrumentNode = (settings) => {
    return new Tone.Synth(settings)
  }

  initLoops = (instruments) => {
    instruments.forEach((instrument, i) => {
      const { id, settings, sequences } = instrument
      const sequenceSettings = sequences[settings.sequence]
      const loopNodeId = generateHash()
      const instrumentNode = nodes[id]

      nodes[loopNodeId] = this.createLoopNode(instrumentNode, sequenceSettings)
      instrument.loopNodeId = loopNodeId
    })
  }

  createLoopNode = (instrument, settings) => {
    const loopNode = new Tone.Part((time, note) => {
      instrument.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, settings.sequence).start(0)

    loopNode.loopEnd = settings.duration
    loopNode.loop = settings.loop

    return loopNode
  }

  initChannels = () => {
    const channels = []

    this.props.channels.forEach((props, i) => {
      const id = generateHash()
      const node = this.createChannelNode(props.settings)
      const state = structuredClone(props)

      nodes[id] = node
      state.id = id

      channels.push(state)
    })

    return channels
  }

  createChannelNode = (settings) => {
    return new Tone.Channel(settings).toDestination()
  }

  connectInstruments = (instruments) => {
    return new Promise((resolve, reject) => {
      const channel = this.state.channels[0]

      instruments.forEach((instrument, i) => {
        const instrumentNode = nodes[instrument.id]
        const channelNode = nodes[channel.id]
        instrumentNode.connect(channelNode)
      })

      resolve()
    })
  }

  // initBuses = () => {}
  // initBuse = () => {}

  // initChains = () => {}
  // initChain = () => {}

  // initEffect = () => {}

  handleStartButtonClick = () => {
    this.initDAW()
      .then((instruments) => this.connectInstruments(instruments))
      .then(() => this.handleTransportChange('play', true))
  }

  handleTransportChange = (property, value) => {
    const { bpm } = this.state

    switch (property) {
      case 'play':
        Tone.Transport.start()
        Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')

        this.setState({
          isStarted: true
        })
        break
      case 'bpm':
        Tone.Transport.bpm.value = value

        this.setState({
          bpm: value
        })
        break
    }
  }

  renderStartButton = () => {
    return (
      <SC_Button
        text="Art Design & Coding Community"
        handleClick={this.handleStartButtonClick}
      />
    )
  }

  renderUI = () => {
    return <></>
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
