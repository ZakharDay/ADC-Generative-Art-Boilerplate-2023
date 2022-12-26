import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'

import ToneSynth from './modules/ToneSynth.jsx'
import ChorusEffect from './modules/ChorusEffect.jsx'
import DistortionEffect from './modules/DistortionEffect.jsx'
import BitCrusherEffect from './modules/BitCrusherEffect.jsx'
import PingPongDelayEffect from './modules/PingPongDelayEffect.jsx'
import Channel from './modules/Channel.jsx'

import SC_ToggleButtonSet from './components/SC_ToggleButtonSet.jsx'
import SC_ToggleButton from './components/SC_ToggleButton'
import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'
import SC_Knob from './components/SC_Knob'
import Surface from './components/Surface'
import Select from './components/Select'

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

    this.state = {
      isStarted: false,
      bpm: 80,
      melodyChangeMeasureSelect: false,
      melodyChangeMeasure: 8,
      melodyChangeRandom: false,
      melodyChange: false,
      random: false,
      bassSettings: this.setCurrentFromDefaultPresetSettings(bassSettings),
      melodySettings: this.setCurrentFromDefaultPresetSettings(melodySettings),
      drumsSettings: this.setCurrentFromDefaultPresetSettings(drumsSettings)
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)

    document.addEventListener(
      'click',
      this.handleMelodyChangeMeasureSelectClose
    )
  }

  setCurrentFromDefaultPresetSettings = (settings) => {
    settings.current = structuredClone(settings.presets.default)
    return settings
  }

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      // prettier-ignore
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ]
    }

    return array
  }

  handleMelodyChangeMeasureSelectClose = (e) => {
    console.log('handleMelodyChangeMeasureSelectClose')
    // const { isUIShown } = this.state

    // console.log(e.target.classList[0] == 'currentValue')
    //
    // if (isUIShown && e.target.classList[0] == 'currentValue') {
    //   this.setState({
    //     melodyChangeMeasureSelect: false
    //   })
    // } else {
    if (e.target.classList[0] != 'currentValue') {
      this.setState({
        melodyChangeMeasureSelect: false
      })
    }
    // }
  }

  handleMelodyChangeMeasureSelectOpen = () => {
    console.log('handleMelodyChangeMeasureSelectOpen')

    this.setState({
      melodyChangeMeasureSelect: true
    })
  }

  handleMelodyChangeMeasure = (property, value) => {
    this.setState({
      melodyChangeMeasureSelect: false,
      melodyChangeMeasure: value
    })
  }

  handleMelodyChangeRandom = () => {
    const { melodyChangeRandom } = this.state

    this.setState({
      melodyChangeRandom: !melodyChangeRandom
    })
  }

  handleMelodyChange = () => {
    const { melodyChange } = this.state

    this.setState({
      melodyChange: !melodyChange
    })
  }

  handleKeydown = (e) => {
    console.log(e.key, e.code, e.keyCode)

    switch (e.keyCode) {
      case 49:
        this.handleMelodySequenceChange('', 'steps1')
        break
      case 50:
        this.handleMelodySequenceChange('', 'steps2')
        break
      case 81:
        sampler.triggerAttackRelease('A3', '1n')
        break
    }
  }

  handleStart = () => {
    this.startBass()
    this.startLead()
    this.startBeat()

    this.handleTransportChange('play', true)
  }

  startBass = () => {
    const { bassSettings } = this.state
    const { synth, chorus, pingPongDelay } = bassSettings.current

    bassSynth = new Tone.Synth(synth)
    bassChorus = new Tone.Chorus(chorus).start()
    bassPingPongDelay = new Tone.PingPongDelay(pingPongDelay).toDestination()

    bassSynth.chain(bassChorus, bassPingPongDelay)

    bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence[bassSettings.sequence.current]).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = bassSettings.sequence.loop
  }

  startLead = () => {
    const { melodySettings } = this.state

    const {
      synth,
      chorus,
      distortion,
      bitCrusher,
      pingPongDelay
    } = melodySettings.current

    melodySynth = new Tone.Synth(synth)
    melodyChorus = new Tone.Chorus(chorus).start()
    melodyDistortion = new Tone.Distortion(distortion)
    melodyBitCrusher = new Tone.BitCrusher(bitCrusher)
    melodyPingPongDelay = new Tone.PingPongDelay(pingPongDelay).toDestination()

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
  }

  startBeat = () => {
    const { drumsSettings } = this.state
    const { channel } = drumsSettings.current

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

    samplerChannel = new Tone.Channel(channel).toDestination()

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
  }

  nextMeasure = () => {
    const { melodyChangeMeasure, melodyChangeRandom, melodyChange } = this.state

    if (melodyChange) {
      const position = Tone.Transport.position
      const regexBefore = /([\w]+)/
      let measure = parseInt(position.match(regexBefore)[1]) + 1
      console.log('next measure', measure)

      const squaresPassed = Math.floor(measure / melodyChangeMeasure)

      if (
        measure == melodyChangeMeasure ||
        measure - squaresPassed * melodyChangeMeasure == 0
      ) {
        console.log('change')
        melodyPart.clear()

        if (melodyChangeRandom) {
          console.log('random')

          let notes = []

          melodySettings.sequence.steps2.forEach((item, i) => {
            notes.push(item.noteName)
          })

          notes = this.shuffle(notes)

          let randomizedSequence = [...melodySettings.sequence.steps2]

          randomizedSequence.forEach((step, i) => {
            let newStep = Object.assign({}, step)
            newStep.noteName = notes[i]
            melodyPart.add(newStep)
          })
        } else {
          melodySettings.sequence.steps2.forEach((step, i) => {
            melodyPart.add(step)
          })
        }
      } else if (
        measure == melodyChangeMeasure + 1 ||
        measure - squaresPassed * melodyChangeMeasure == 1
      ) {
        console.log('change back')
        melodyPart.clear()

        melodySettings.sequence.steps1.forEach((step, i) => {
          melodyPart.add(step)
        })
      }
    }
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

  handleValueChange = (instrumentName, property, value) => {
    const { bassSettings, melodySettings } = this.state

    let instrument
    let chorus
    let distortion
    let pingPongDelay
    let bitCrusher
    let settings

    if (instrumentName === 'bass') {
      instrument = bassSynth
      chorus = bassChorus
      pingPongDelay = bassPingPongDelay
      settings = bassSettings
    } else if (instrumentName === 'melody') {
      instrument = melodySynth
      chorus = melodyChorus
      distortion = melodyDistortion
      pingPongDelay = melodyPingPongDelay
      bitCrusher = melodyBitCrusher
      settings = melodySettings
    }

    switch (property) {
      case 'synthShowEnvelope':
        settings.synthUI.envelopeShow = value
        break
      case 'synthType':
        instrument.oscillator.type = value
        settings.current.synth.oscillator.type = value
        break
      case 'synthEnvelopeAttack':
        instrument.envelope.attack = value
        settings.current.synth.envelope.attack = value
        break
      case 'synthEnvelopeDecay':
        instrument.envelope.decay = value
        settings.current.synth.envelope.decay = value
        break
      case 'synthEnvelopeSustain':
        instrument.envelope.sustain = value
        settings.current.synth.envelope.sustain = value
        break
      case 'synthEnvelopeRelease':
        instrument.envelope.release = value
        settings.current.synth.envelope.release = value
        break
      case 'chorusWet':
        chorus.wet.value = value
        settings.current.chorus.wet = value
        break
      case 'chorusType':
        chorus.type = value
        settings.current.chorus.type = value
        break
      case 'chorusFrequency':
        chorus.frequency.value = value
        settings.current.chorus.frequency = value
        break
      case 'chorusDelayTime':
        chorus.delayTime = value
        settings.current.chorus.delayTime = value
        break
      case 'chorusDepth':
        chorus.depth = value
        settings.current.chorus.depth = value
        break
      case 'chorusSpread':
        chorus.spread = value
        settings.current.chorus.spread = value
        break
      case 'distortionWet':
        distortion.wet.value = value
        settings.current.distortion.wet = value
        break
      case 'distortionDistortion':
        distortion.distortion = value
        settings.current.distortion.distortion = value
        break
      case 'distortionOversample':
        distortion.oversample = value
        settings.current.distortion.oversample = value
        break
      case 'bitCrusherWet':
        bitCrusher.wet.value = value
        settings.current.bitCrusher.wet = value
        break
      case 'bitCrusherBits':
        bitCrusher.bits = value
        settings.current.bitCrusher.bits = value
        break
      case 'pingPongDelayWet':
        pingPongDelay.wet.value = value
        settings.current.pingPongDelay.wet = value
        break
      case 'pingPongDelayDelayTime':
        pingPongDelay.delayTime.value = value
        settings.current.pingPongDelay.delayTime = value
        break
      case 'pingPongDelayMaxDelayTime':
        pingPongDelay.maxDelayTime = value
        settings.current.pingPongDelay.maxDelayTime = value
        break
    }

    this.setState({
      bassSettings,
      melodySettings
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
    settings.current.synth.oscillator.type = oscillator.type

    instrument.envelope.attack = envelope.attack
    settings.current.synth.envelope.attack = envelope.attack

    instrument.envelope.decay = envelope.decay
    settings.current.synth.envelope.decay = envelope.decay

    instrument.envelope.sustain = envelope.sustain
    settings.current.synth.envelope.sustain = envelope.sustain

    instrument.envelope.release = envelope.release
    settings.current.synth.envelope.release = envelope.release

    chorus.wet.value = preset.chorus.wet
    settings.current.chorus.wet = preset.chorus.wet

    chorus.type = preset.chorus.type
    settings.current.chorus.type = preset.chorus.type

    chorus.frequency.value = preset.chorus.frequency
    settings.current.chorus.frequency = preset.chorus.frequency

    chorus.delayTime = preset.chorus.delayTime
    settings.current.chorus.delayTime = preset.chorus.delayTime

    chorus.depth = preset.chorus.depth
    settings.current.chorus.depth = preset.chorus.depth

    chorus.spread = preset.chorus.spread
    settings.current.chorus.spread = preset.chorus.spread

    distortion.wet.value = preset.distortion.wet
    settings.current.distortion.wet = preset.distortion.wet

    distortion.distortion = preset.distortion.distortion
    settings.current.distortion.distortion = preset.distortion.distortion

    distortion.oversample = preset.distortion.oversample
    settings.current.distortion.oversample = preset.distortion.oversample

    bitCrusher.wet.value = preset.bitCrusher.wet
    settings.current.bitCrusher.wet = preset.bitCrusher.wet

    bitCrusher.bits = preset.bitCrusher.bits
    settings.current.bitCrusher.bits = preset.bitCrusher.bits

    pingPongDelay.wet.value = preset.pingPongDelay.wet
    settings.current.pingPongDelay.wet = preset.pingPongDelay.wet

    pingPongDelay.delayTime.value = preset.pingPongDelay.delayTime
    settings.current.pingPongDelay.delayTime = preset.pingPongDelay.delayTime

    pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime
    // prettier-ignore
    settings.current.pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime

    settings.presets.current = value

    this.setState({
      melodySettings
    })
  }

  handleBassSoundPresetChange = (property, value) => {
    const { bassSettings } = this.state
    const preset = bassSettings.presets[value]

    const instrument = bassSynth
    const chorus = bassChorus
    const pingPongDelay = bassPingPongDelay
    const settings = bassSettings

    const { oscillator, envelope } = preset.synth

    instrument.oscillator.type = oscillator.type
    settings.current.synth.oscillator.type = oscillator.type

    instrument.envelope.attack = envelope.attack
    settings.current.synth.envelope.attack = envelope.attack

    instrument.envelope.decay = envelope.decay
    settings.current.synth.envelope.decay = envelope.decay

    instrument.envelope.sustain = envelope.sustain
    settings.current.synth.envelope.sustain = envelope.sustain

    instrument.envelope.release = envelope.release
    settings.current.synth.envelope.release = envelope.release

    chorus.wet.value = preset.chorus.wet
    settings.current.chorus.wet = preset.chorus.wet

    chorus.type = preset.chorus.type
    settings.current.chorus.type = preset.chorus.type

    chorus.frequency.value = preset.chorus.frequency
    settings.current.chorus.frequency = preset.chorus.frequency

    chorus.delayTime = preset.chorus.delayTime
    settings.current.chorus.delayTime = preset.chorus.delayTime

    chorus.depth = preset.chorus.depth
    settings.current.chorus.depth = preset.chorus.depth

    chorus.spread = preset.chorus.spread
    settings.current.chorus.spread = preset.chorus.spread

    pingPongDelay.wet.value = preset.pingPongDelay.wet
    settings.current.pingPongDelay.wet = preset.pingPongDelay.wet

    pingPongDelay.delayTime.value = preset.pingPongDelay.delayTime
    settings.current.pingPongDelay.delayTime = preset.pingPongDelay.delayTime

    pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime
    // prettier-ignore
    settings.current.pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime

    settings.presets.current = value

    this.setState({
      bassSettings
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

  handleBassSequenceChange = (property, value) => {
    const { bassSettings } = this.state
    const steps = bassSettings.sequence[value]

    bassSettings.sequence.current = value
    bassPart.clear()

    steps.forEach((step, i) => {
      bassPart.add(step)
    })

    this.setState({
      bassSettings
    })
  }

  handleDrumsValueChange = (property, value) => {
    const { drumsSettings } = this.state

    if (property === 'channelVolume') {
      samplerChannel.volume.value = value
      drumsSettings.channel.volume = value
    } else if (property === 'channelMute') {
      console.log(
        '=====BEFORE=====',
        drumsSettings.channel.mute,
        samplerChannel.mute,
        drumsSettings.channel.mute,
        samplerChannel
      )

      const mute = !drumsSettings.channel.mute
      samplerChannel.mute = mute
      drumsSettings.channel.mute = mute

      console.log(
        '=====AFTER=====',
        mute,
        samplerChannel.mute,
        drumsSettings.channel.mute,
        samplerChannel
      )
    } else if (property === 'channelPan') {
      samplerChannel.pan.value = value
      drumsSettings.channel.pan = value
    }

    this.setState({
      drumsSettings
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

  renderShowHideButton = () => {
    return (
      <div className="toggleUIButton" onClick={this.handleToggleUIShow}>
        Show/Hide UI
      </div>
    )
  }

  renderUI = () => {
    const {
      bpm,
      melodyChangeMeasureSelect,
      melodyChangeMeasure,
      melodyChangeRandom,
      melodyChange,
      bassSettings,
      melodySettings,
      drumsSettings
    } = this.state

    const melodyChangeButtonText = melodyChange ? 'On' : 'Off'

    return (
      <>
        <div className="topBar">
          <SC_Slider
            name="BPM"
            min={0}
            max={300}
            step={1}
            value={bpm}
            property="bpm"
            handleChange={(property, value) => {
              this.handleTransportChange(property, value)
            }}
          />
        </div>

        <div className="instrumentsWrapper">
          <div className="instrumentUI">
            <h1>Bass</h1>

            <div className="controlsGroup">
              <SC_ToggleButtonSet
                name="Sound Preset"
                options={['default', 'preset1', 'preset2']}
                value={bassSettings.presets.current}
                property="bassSoundPreset"
                handleChange={this.handleBassSoundPresetChange}
              />
            </div>

            <div className="controlsGroup">
              <SC_ToggleButtonSet
                name="Sequence"
                options={['steps1', 'steps2']}
                value={bassSettings.sequence.current}
                property="bassSequence"
                handleChange={this.handleBassSequenceChange}
              />
            </div>

            <ToneSynth
              title="Synth"
              instrumentName="bass"
              settings={bassSettings.current.synth}
              handleValueChange={this.handleValueChange}
            />

            <PingPongDelayEffect
              title="Ping Pong Delay"
              instrumentName="bass"
              settings={bassSettings.current.pingPongDelay}
              handleValueChange={this.handleValueChange}
            />

            <ChorusEffect
              title="Chorus"
              instrumentName="bass"
              settings={bassSettings.current.chorus}
              handleValueChange={this.handleValueChange}
            />
          </div>

          <div className="instrumentUI">
            <h1>Lead</h1>

            <div className="controlsGroup">
              <SC_ToggleButtonSet
                name="Sound Preset"
                options={['default', 'preset1', 'preset2']}
                value={melodySettings.presets.current}
                property="melodySoundPreset"
                handleChange={this.handleMelodySoundPresetChange}
              />
            </div>

            <div className="controlsGroup">
              <SC_ToggleButtonSet
                name="Sequence"
                options={['steps1', 'steps2']}
                value={melodySettings.sequence.current}
                property="melodySequence"
                handleChange={this.handleMelodySequenceChange}
              />

              <Select
                name="Change melody on measure"
                options={[2, 4, 8, 16, 32]}
                isOpened={melodyChangeMeasureSelect}
                value={melodyChangeMeasure}
                property=""
                handleMelodyChangeMeasureSelectOpen={
                  this.handleMelodyChangeMeasureSelectOpen
                }
                handleMelodyChangeMeasureSelectClose={
                  this.handleMelodyChangeMeasureSelectClose
                }
                handleChange={this.handleMelodyChangeMeasure}
              />

              <SC_ToggleButton
                text={melodyChangeButtonText}
                isOn={melodyChange}
                handleClick={this.handleMelodyChange}
              />

              <SC_ToggleButton
                text="Random"
                isOn={melodyChangeRandom}
                handleClick={this.handleMelodyChangeRandom}
              />
            </div>

            <ToneSynth
              title="Synth"
              instrumentName="melody"
              settings={melodySettings.current.synth}
              handleValueChange={this.handleValueChange}
            />

            <ChorusEffect
              title="Chorus"
              instrumentName="melody"
              settings={melodySettings.current.chorus}
              handleValueChange={this.handleValueChange}
            />

            <DistortionEffect
              title="Distortion"
              instrumentName="melody"
              settings={melodySettings.current.distortion}
              handleValueChange={this.handleValueChange}
            />

            <BitCrusherEffect
              title="BitCrusher"
              instrumentName="melody"
              settings={melodySettings.current.bitCrusher}
              handleValueChange={this.handleValueChange}
            />

            <PingPongDelayEffect
              title="Ping Pong Delay"
              instrumentName="melody"
              settings={melodySettings.current.pingPongDelay}
              handleValueChange={this.handleValueChange}
            />
          </div>

          <div className="instrumentUI">
            <h1>Beat</h1>

            <div className="sampleButtonWrapper">
              <SC_Button
                text="Sample"
                handleClick={() => {
                  sampler.triggerAttackRelease('A4', '1n')
                }}
              />
            </div>

            <Channel
              settings={drumsSettings.current.channel}
              handleValueChange={this.handleDrumsValueChange}
            />
          </div>
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
