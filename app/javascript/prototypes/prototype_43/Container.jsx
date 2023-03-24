import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'

import SC_ToggleButton from './components/SC_ToggleButton'

let bassSynth
let bassChorus
let bassPingPongDelay
let bassPart

let melodySynth
let melodyChorus
let melodyDistortion
let melodyBitCrusher
let melodyPingPongDelay
let melodyPart

let sampler
let samplerChannel

export default class Container extends Component {
  constructor(props) {
    super(props)

    const { shift, enthropy, effect } = props

    this.state = {
      shift,
      enthropy,
      effect,
      isStarted: false,
      isUIShown: false,
      bpm: 80,
      melodyChangeMeasureSelect: false,
      melodyChangeMeasure: 8,
      melodyChangeRandom: false,
      melodyChange: false,
      random: false,
      bassSettings,
      melodySettings,
      drumsSettings
    }
  }

  componentDidMount() {
    this.props.initSketch('sketch')
  }

  handleMelodyChangeRandom = () => {
    const { melodyChangeRandom } = this.state

    this.setState({
      melodyChangeRandom: !melodyChangeRandom
    })
  }

  handleMelodySoundPresetChange = (property, value) => {
    const { melodySettings } = this.state
    const preset = melodySettings.presets[value]

    const instrument = melodySynth
    const chorus = melodyChorus
    const distortion = melodyDistortion
    const pingPongDelay = melodyPingPongDelay
    const bitCrusher = melodyBitCrusher
    const settings = melodySettings

    const { oscillator, envelope } = preset.synth

    instrument.oscillator.type = oscillator.type
    settings.synth.oscillator.type = oscillator.type

    instrument.envelope.attack = envelope.attack
    settings.synth.envelope.attack = envelope.attack

    instrument.envelope.decay = envelope.decay
    settings.synth.envelope.decay = envelope.decay

    instrument.envelope.sustain = envelope.sustain
    settings.synth.envelope.sustain = envelope.sustain

    instrument.envelope.release = envelope.release
    settings.synth.envelope.release = envelope.release

    chorus.wet.value = preset.chorus.wet
    settings.chorus.wet = preset.chorus.wet

    chorus.type = preset.chorus.type
    settings.chorus.type = preset.chorus.type

    chorus.frequency.value = preset.chorus.frequency
    settings.chorus.frequency = preset.chorus.frequency

    chorus.delayTime = preset.chorus.delayTime
    settings.chorus.delayTime = preset.chorus.delayTime

    chorus.depth = preset.chorus.depth
    settings.chorus.depth = preset.chorus.depth

    chorus.spread = preset.chorus.spread
    settings.chorus.spread = preset.chorus.spread

    distortion.wet.value = preset.distortion.wet
    settings.distortion.wet = preset.distortion.wet

    distortion.distortion = preset.distortion.distortion
    settings.distortion.distortion = preset.distortion.distortion

    distortion.oversample = preset.distortion.oversample
    settings.distortion.oversample = preset.distortion.oversample

    bitCrusher.wet.value = preset.bitCrusher.wet
    settings.bitCrusher.wet = preset.bitCrusher.wet

    bitCrusher.bits = preset.bitCrusher.bits
    settings.bitCrusher.bits = preset.bitCrusher.bits

    pingPongDelay.wet.value = preset.pingPongDelay.wet
    settings.pingPongDelay.wet = preset.pingPongDelay.wet

    pingPongDelay.delayTime.value = preset.pingPongDelay.delayTime
    settings.pingPongDelay.delayTime = preset.pingPongDelay.delayTime

    pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime
    settings.pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime

    settings.presets.current = value

    this.setState({
      melodySettings
    })
  }

  handleMelodySequenceChange = (property, value) => {
    const { melodySettings } = this.state
    const steps = melodySettings.sequence[value]

    melodySettings.sequence.current = value
    melodyPart.clear()

    steps.forEach((step, i) => {
      melodyPart.add(step)
    })

    this.setState({
      melodySettings
    })
  }

  handleStart = () => {
    const { bassSettings, melodySettings, drumsSettings } = this.state

    //
    //
    bassSynth = new Tone.Synth(bassSettings.synth)
    bassChorus = new Tone.Chorus(bassSettings.chorus).start()

    bassPingPongDelay = new Tone.PingPongDelay(
      bassSettings.pingPongDelay
    ).toDestination()

    bassSynth.chain(bassChorus, bassPingPongDelay)

    bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps1).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = bassSettings.sequence.loop
    //
    //
    melodySynth = new Tone.Synth(melodySettings.synth)
    melodyChorus = new Tone.Chorus(melodySettings.chorus).start()
    melodyDistortion = new Tone.Distortion(melodySettings.distortion)
    melodyBitCrusher = new Tone.BitCrusher(melodySettings.bitCrusher)

    melodyPingPongDelay = new Tone.PingPongDelay(
      melodySettings.pingPongDelay
    ).toDestination()

    melodySynth.chain(
      melodyChorus,
      melodyDistortion,
      melodyBitCrusher,
      melodyPingPongDelay
    )

    melodyPart = new Tone.Part((time, note) => {
      melodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, melodySettings.sequence[melodySettings.sequence.current]).start(0)

    melodyPart.loopEnd = melodySettings.sequence.duration
    melodyPart.loop = melodySettings.sequence.loop
    //
    //
    sampler = new Tone.Sampler({
      urls: {
        A1: '00001-Linn-9000-BassDrumrum1.mp3',
        A2: '00017-Linn-9000-Snare.mp3',
        A3: '00002-Linn-9000-Clhh-1.mp3',
        A4: '00064-Vermona-DRM1-MK3-Tom13.mp3'
      },
      baseUrl: 'http://localhost:3000/samples/'
      // onload: () => {
      //   sampler.triggerAttackRelease(['A1', 'A2', 'A1', 'A2'], 0.5)
      // }
    })

    samplerChannel = new Tone.Channel(drumsSettings.channel).toDestination()

    sampler.chain(samplerChannel)

    const drumsPart = new Tone.Part((time, note) => {
      sampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, drumsSettings.sequence.steps).start(0)

    drumsPart.loopEnd = drumsSettings.sequence.duration
    drumsPart.loop = drumsSettings.sequence.loop

    Tone.Transport.start()
  }

  handleShiftChange = () => {
    const { setStoreShift } = this.props
    const { shift } = this.state
    setStoreShift(!shift)

    this.handleStart()

    this.setState({
      shift: !shift
    })
  }

  handleEnthropyChange = () => {
    const { setStoreEnthropy } = this.props
    const { enthropy } = this.state
    setStoreEnthropy(!enthropy)

    this.setState({
      enthropy: !enthropy
    })
  }

  handleEffectChange = () => {
    const { setStoreEffect } = this.props
    const { effect } = this.state
    setStoreEffect(!effect)

    this.setState({
      effect: !effect
    })
  }

  render() {
    const { shift, enthropy, effect } = this.state

    return (
      <div className="Container">
        <div className="sketch" id="sketch"></div>

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
      </div>
    )
  }
}
