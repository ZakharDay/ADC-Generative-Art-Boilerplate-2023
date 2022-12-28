import * as Tone from 'tone'
import React, { Component } from 'react'

import { generateHash } from './utilities'

import SC_Button from './components/SC_Button'

const nodes = {}
const connections = []

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  initDAW = () => {
    return new Promise((resolve, reject) => {
      const channels = this.initChannels()
      const busses = this.initBusses(channels)
      const chains = this.initChains(busses)

      const instruments = this.initInstruments(chains)
      this.initLoops(instruments)

      this.setState({
        instruments,
        chains,
        busses,
        channels
      })

      // setTimeout(() => resolve(), 1000)
      resolve()
    })
  }

  // Сначала инитим каналы, так как это всегда
  // последняя нода в цепи

  initChannels = () => {
    const channels = []

    this.props.channels.forEach((c) => {
      const id = generateHash()
      const channel = structuredClone(c)
      this.createToneNode('Channel', id, c.settings)
      channel.id = id
      channels.push(channel)
    })

    return channels
  }

  // Далее нужно собрать басы, так как они
  // подключаются в каналы

  initBusses = (channels) => {
    const busses = []

    this.props.busses.forEach((b) => {
      const bus = structuredClone(b)
      const presetSettings = b.presets[b.settings.preset]
      const effectIds = []

      bus.id = generateHash()

      channels.forEach((channel, i) => {
        if (channel.name === bus.settings.channel) {
          console.log('connection added to queue', channel.id)

          connections.push({
            from: {
              type: 'Bus',
              id: bus.id
            },
            to: {
              type: 'Channel',
              id: channel.id
            }
          })
        }
      })

      b.settings.effects.forEach((effectClassName) => {
        const effectId = generateHash()
        const effectPresetSettings = presetSettings[effectClassName]
        this.createToneNode(effectClassName, effectId, effectPresetSettings)
        effectIds.push(effectId)
      })

      bus.effectIds = effectIds
      busses.push(bus)
    })

    return busses
  }

  // Далее нужно собрать цепочки эффектов,
  // так как они подключаются в каналы и басы,
  // а в них следом подключаются инструменты

  initChains = (busses) => {
    const chains = []

    this.props.chains.forEach((c) => {
      const chain = structuredClone(c)
      const presetSettings = c.presets[c.settings.preset]
      const effectIds = []

      chain.id = generateHash()

      busses.forEach((bus, i) => {
        if (bus.name === chain.settings.bus) {
          console.log('connection added to queue', bus.id)

          connections.push({
            from: {
              type: 'Chain',
              id: chain.id
            },
            to: {
              type: 'Bus',
              id: bus.id
            }
          })
        }
      })

      c.settings.effects.forEach((effectClassName) => {
        const effectId = generateHash()
        const effectPresetSettings = presetSettings[effectClassName]
        this.createToneNode(effectClassName, effectId, effectPresetSettings)
        effectIds.push(effectId)
      })

      chain.effectIds = effectIds
      chains.push(chain)
    })

    return chains
  }

  // Далее собираем инструменты

  initInstruments = (chains) => {
    const instruments = []

    this.props.instruments.forEach((i) => {
      const id = generateHash()
      const instrument = structuredClone(i)
      const presetSettings = i.presets[i.settings.preset]
      this.createToneNode(i.type, id, presetSettings)
      instrument.id = id
      instruments.push(instrument)

      chains.forEach((chain, i) => {
        if (chain.name === instrument.settings.chain) {
          connections.push({
            from: {
              type: 'Instrument',
              id: instrument.id
            },
            to: {
              type: 'Chain',
              id: chain.id
            }
          })
        }
      })
    })

    return instruments
  }

  initLoops = (instruments) => {
    console.log('INSTRUMENTS', instruments)

    instruments.forEach((instrument, i) => {
      const { id, settings, sequences } = instrument
      const sequenceSettings = sequences[settings.sequence]
      const instrumentNode = nodes[id]
      const loopNodeId = generateHash()
      console.log('instrumentNode', instrumentNode, sequenceSettings)
      nodes[loopNodeId] = this.createLoopNode(instrumentNode, sequenceSettings)
      instrument.loopNodeId = loopNodeId
    })
  }

  createToneNode = (type, id, settings) => {
    let node

    switch (type) {
      case 'Chorus':
        node = new Tone.Chorus(settings).start()
        break
      case 'BitCrusher':
        node = new Tone.BitCrusher(settings)
        break
      case 'Distortion':
        node = new Tone.Distortion(settings)
        break
      case 'FeedbackDelay':
        node = new Tone.FeedbackDelay(settings)
        break
      case 'PingPongDelay':
        node = new Tone.PingPongDelay(settings)
        break
      case 'Reverb':
        node = new Tone.Reverb(settings)
        break
      case 'ToneSynth':
        node = new Tone.Synth(settings)
        break
      case 'Tremolo':
        node = new Tone.Tremolo(settings)
        break
      case 'Channel':
        node = new Tone.Channel(settings).toDestination()
        break
    }

    nodes[id] = node
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

  connectNodes = () => {
    return new Promise((resolve, reject) => {
      console.log('connect nodes', connections)

      connections.forEach((connection, i) => {
        let outputNode
        let inputNode

        if (connection.from.type === 'Instrument') {
          outputNode = nodes[connection.from.id]
        } else if (connection.from.type === 'Chain') {
          this.state.chains.forEach((chain, i) => {
            if (chain.id === connection.from.id) {
              outputNode = nodes[chain.effectIds[chain.effectIds.length - 1]]
            }
          })
        } else if (connection.from.type === 'Bus') {
          this.state.busses.forEach((bus, i) => {
            if (bus.id === connection.from.id) {
              outputNode = nodes[bus.effectIds[bus.effectIds.length - 1]]
            }
          })
        }

        if (connection.to.type === 'Channel') {
          inputNode = nodes[connection.to.id]
        } else if (connection.to.type === 'Chain') {
          this.state.chains.forEach((chain, i) => {
            if (chain.id === connection.to.id) {
              if (chain.effectIds.length > 1) {
                console.log('more then 1')

                chain.effectIds.forEach((effectId, i) => {
                  if (i + 1 < length) {
                    const effectOutputNode = nodes[effectId]
                    const effectInputNode = nodes[chain.effectIds[i + 1]]
                    effectOutputNode.connect(effectInputNode)
                  } else {
                    inputNode = nodes[effectId]
                  }
                })
              } else {
                inputNode = nodes[chain.effectIds[0]]
              }
            }
          })
        } else if (connection.to.type === 'Bus') {
          this.state.busses.forEach((bus, i) => {
            if (bus.id === connection.to.id) {
              if (bus.effectIds.length > 1) {
                console.log('more then 1')

                bus.effectIds.forEach((effectId, i) => {
                  if (i + 1 < length) {
                    const effectOutputNode = nodes[effectId]
                    const effectInputNode = nodes[bus.effectIds[i + 1]]
                    effectOutputNode.connect(effectInputNode)
                  } else {
                    inputNode = nodes[effectId]
                  }
                })
              } else {
                inputNode = nodes[bus.effectIds[0]]
              }
            }
          })
        }

        console.log('connect', inputNode, outputNode)
        outputNode.connect(inputNode)
      })

      resolve()
    })
  }

  handleStartButtonClick = () => {
    this.initDAW()
      .then(() => this.connectNodes())
      .then(() => {
        console.log(nodes)
        this.handleTransportChange('play', true)
      })
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
