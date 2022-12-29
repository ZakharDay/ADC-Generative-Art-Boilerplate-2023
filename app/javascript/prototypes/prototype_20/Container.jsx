import * as Tone from 'tone'
import React, { Component } from 'react'

import { generateHash } from './utilities'

import SC_Button from './components/SC_Button'
import InstrumentColumn from './components/InstrumentColumn'
// import PresetButtonSet from './components/PresetButtonSet'

const nodes = {}
const connections = []

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  // bufferSamples = (samples) => {
  //   Object.keys(samples).forEach((note, i) => {
  //     const sample = new Tone.Buffer(`/samples/${samples[note]}.mp3`, () => {
  //       sample.get()
  //     })
  //
  //     samples[note] = sample
  //   })
  // }

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

  // К инструментам добавляем лупы

  initLoops = (instruments) => {
    instruments.forEach((instrument, i) => {
      const { id, settings, sequences } = instrument
      const sequenceSettings = sequences[settings.sequence]
      const instrumentNode = nodes[id]
      const loopNodeId = generateHash()
      nodes[loopNodeId] = this.createLoopNode(instrumentNode, sequenceSettings)
      instrument.loopNodeId = loopNodeId
    })
  }

  // Здесь создаются аудио-ноды разных типов

  createToneNode = (type, id, settings) => {
    let node

    switch (type) {
      case 'AutoFilter':
        node = new Tone.AutoFilter(settings).start()
        break
      case 'AutoPanner':
        node = new Tone.AutoPanner(settings).start()
        break
      case 'AutoWah':
        node = new Tone.AutoWah(settings)
        break
      case 'BitCrusher':
        node = new Tone.BitCrusher(settings)
        break
      case 'Channel':
        node = new Tone.Channel(settings).toDestination()
        break
      case 'Chebyshev':
        node = new Tone.Chebyshev(settings)
        break
      case 'Chorus':
        node = new Tone.Chorus(settings).start()
        break
      case 'Distortion':
        node = new Tone.Distortion(settings)
        break
      case 'FeedbackDelay':
        node = new Tone.FeedbackDelay(settings)
        break
      case 'Freeverb':
        node = new Tone.Freeverb(settings)
        break
      case 'FrequencyShifter':
        node = new Tone.FrequencyShifter(settings)
        break
      case 'JCReverb':
        node = new Tone.JCReverb(settings)
        break
      case 'MidSideEffect':
        node = new Tone.MidSideEffect(settings)
        break
      case 'Phaser':
        node = new Tone.Phaser(settings)
        break
      case 'PingPongDelay':
        node = new Tone.PingPongDelay(settings)
        break
      case 'PitchShift':
        node = new Tone.PitchShift(settings)
        break
      case 'Reverb':
        node = new Tone.Reverb(settings)
        break
      case 'Sampler':
        // this.bufferSamples(settings.samples)
        node = new Tone.Sampler({
          urls: settings.samples,
          baseUrl: 'http://localhost:3000/samples/'
        })
        break
      case 'StereoWidener':
        node = new Tone.StereoWidener(settings)
        break
      case 'ToneSynth':
        node = new Tone.Synth(settings)
        break
      case 'Tremolo':
        node = new Tone.Tremolo(settings)
        break
      case 'Vibrato':
        node = new Tone.Vibrato(settings)
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

  // И самое главное — соединение нод между собой.
  // В функциях выше наполняется список connections,
  // а здесь мы по нему идём и создаём подключения

  connectNodes = () => {
    return new Promise((resolve, reject) => {
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

        // console.log('connect', inputNode, outputNode)
        outputNode.connect(inputNode)
      })

      resolve()
    })
  }

  // Здесь описан алгоритм инициализации,
  // который построен на промисах

  handleStartButtonClick = () => {
    this.initDAW()
      .then(() => this.connectNodes())
      .then(() => {
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

  handlePresetSwitchClick = (instrumentId, presetIndex) => {
    const instruments = structuredClone(this.state.instruments)
    const chains = structuredClone(this.state.chains)

    const instrument = instruments.find(
      (instrument) => instrument.id === instrumentId
    )

    instruments.forEach((ins) => {
      if (ins.id === instrumentId) {
        ins.settings.preset = presetIndex
        ins.settings.sequence = presetIndex
      }
    })

    const chain = chains.find(
      (chain) => chain.name === instrument.settings.chain
    )

    chains.forEach((c) => {
      chain.settings.preset = presetIndex
    })

    const instrumentNode = nodes[instrumentId]
    const instrumentPreset = instrument.presets[presetIndex]
    const loopSequence = instrument.sequences[presetIndex]
    const loopNode = nodes[instrument.loopNodeId]

    this.changeNodeSettings(instrument.type, instrumentNode, instrumentPreset)
    this.changeLoopSequence(loopNode, loopSequence)

    chain.effectIds.forEach((effectId, i) => {
      const effectNode = nodes[effectId]
      const effectPreset = chain.presets[presetIndex][effectNode.name]
      this.changeNodeSettings(effectNode.name, effectNode, effectPreset)
    })

    this.setState({
      instruments,
      chains
    })
  }

  changeNodeSettings = (type, node, preset) => {
    switch (type) {
      case 'AutoFilter':
        node.wet.value = preset.wet
        node.type = preset.type
        node.frequency.value = preset.frequency
        node.depth.value = preset.depth
        node.baseFrequency = preset.baseFrequency
        node.octaves = preset.octaves
        node.filter.type = preset.filter.type
        node.filter.frequency.value = preset.filter.frequency
        node.filter.rolloff = preset.filter.rolloff
        node.filter.Q.value = preset.filter.Q
        break
      case 'AutoPanner':
        node.wet.value = preset.wet
        node.type = preset.type
        node.frequency.value = preset.frequency
        node.depth.value = preset.depth
        break
      case 'AutoWah':
        node.wet.value = preset.wet
        node.baseFrequency = preset.baseFrequency
        node.octaves = preset.octaves
        node.sensitivity = preset.sensitivity
        node.Q.value = preset.Q
        node.gain.value = preset.gain
        node.follower = preset.follower
        break
      case 'BitCrusher':
        node.wet.value = preset.wet
        node.bits = preset.bits
        break
      // case 'Channel':
      // node.volume.value = volume
      // node.pan.value = pan
      // node.mute = mute
      // node.solo = solo
      // break
      case 'Chebyshev':
        node.wet.value = preset.wet
        node.order = preset.order
        node.oversample = preset.oversample
        break
      case 'Chorus':
        node.wet.value = preset.wet
        node.type = preset.type
        node.frequency.value = preset.frequency
        node.delayTime = preset.delayTime
        node.depth = preset.depth
        node.spread = preset.spread
        break
      case 'Distortion':
        node.wet.value = preset.wet
        node.distortion = preset.distortion
        node.oversample = preset.oversample
        break
      case 'FeedbackDelay':
        node.wet.value = preset.wet
        node.delayTime.value = preset.delayTime
        node.maxDelay = preset.maxDelay
        break
      case 'Freeverb':
        node.wet.value = preset.wet
        node.roomSize.value = preset.roomSize
        node.dampening = preset.dampening
        break
      case 'FrequencyShifter':
        node.wet.value = preset.wet
        node.frequency = preset.frequency
        break
      case 'JCReverb':
        node.wet.value = preset.wet
        node.roomSize.value = preset.roomSize
        break
      // case 'MidSideEffect':
      //   node.wet.value = wet
      //   break
      case 'Phaser':
        node.wet.value = preset.wet
        node.frequency.value = preset.frequency
        node.octaves = preset.octaves
        node.stages = preset.stages
        node.Q.value = preset.Q
        node.baseFrequency = preset.baseFrequency
        break
      case 'PingPongDelay':
        node.wet.value = preset.wet
        node.delayTime.value = preset.delayTime
        node.maxDelayTime = preset.maxDelayTime
        break
      case 'PitchShift':
        node.wet.value = preset.wet
        node.pitch = preset.pitch
        node.windowSize = preset.windowSize
        node.delayTime.value = preset.delayTime
        node.feedback.value = preset.feedback
        break
      case 'Reverb':
        node.wet.value = preset.wet
        node.decay = preset.decay
        node.preDelay = preset.preDelay
        break
      // case 'Sampler':
      // node.volume.value = volume
      // node.attack = attack
      // node.release = release
      // node.curve = curve
      // break
      case 'StereoWidener':
        node.wet.value = preset.wet
        node.width.value = preset.width
        break
      case 'ToneSynth':
        node.volume.value = preset.volume
        node.detune.value = preset.detune
        node.portamento = preset.portamento
        node.envelope.attack = preset.envelope.attack
        node.envelope.attackCurve = preset.envelope.attackCurve
        node.envelope.decay = preset.envelope.decay
        node.envelope.decayCurve = preset.envelope.decayCurve
        node.envelope.sustain = preset.envelope.sustain
        node.envelope.release = preset.envelope.release
        node.envelope.releaseCurve = preset.envelope.releaseCurve
        node.oscillator.type = preset.oscillator.type
        node.oscillator.modulationType = preset.oscillator.modulationType
        node.oscillator.phase = preset.oscillator.phase

        // Read only
        // node.oscillator.harmonicity.value = preset.oscillator.harmonicity
        break
      case 'Tremolo':
        node.wet.value = preset.wet
        node.frequency.value = preset.frequency
        node.type = preset.type
        node.depth.value = preset.depth
        node.spread = preset.spread
        break
      case 'Vibrato':
        node.wet.value = preset.wet
        node.maxDelay = preset.maxDelay
        node.frequency.value = preset.frequency
        node.depth.value = preset.depth
        node.type = preset.type
        break
    }
  }

  changeLoopSequence = (node, sequence) => {
    node.clear()
    node.loopEnd = sequence.duration
    node.loop = sequence.loop

    sequence.sequence.forEach((step, i) => {
      node.add(step)
    })
  }

  // А это стандартные вещи,
  // которые нет необходимости объяснять

  renderStartButton = () => {
    return (
      <SC_Button
        text="Art Design & Coding Community"
        handleClick={this.handleStartButtonClick}
      />
    )
  }

  renderUI = () => {
    const { instruments, chains } = this.state
    const instrumentElements = []
    const chainElements = []

    instruments.forEach((instrument, i) => {
      instrumentElements.push(
        <InstrumentColumn
          instrument={instrument}
          handleChange={this.handlePresetSwitchClick}
          key={i}
        />
      )
    })

    return (
      <div className="BlasterControl">
        <div className="InstrumentsRack">{instrumentElements}</div>
      </div>
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
