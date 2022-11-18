import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'

import ToneSynth from './modules/ToneSynth.jsx'
import Channel from './modules/Channel.jsx'

import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'
import SC_Knob from './components/SC_Knob'
import Surface from './components/Surface'

let bassSynth
let bassChorus
let bassPingPongDelay

let melodySynth
let melodyChorus
let melodyPingPongDelay

let samplerChannel

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isStarted: false,
      isUIShown: true,
      bassSettings,
      melodySettings,
      drumsSettings
    }
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

    const bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = bassSettings.sequence.loop
    //
    //
    melodySynth = new Tone.Synth(melodySettings.synth)
    melodyChorus = new Tone.Chorus(melodySettings.chorus).start()

    melodyPingPongDelay = new Tone.PingPongDelay(
      melodySettings.pingPongDelay
    ).toDestination()

    melodySynth.chain(melodyChorus, melodyPingPongDelay)

    const melodyPart = new Tone.Part((time, note) => {
      melodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, melodySettings.sequence.steps).start(0)

    melodyPart.loopEnd = melodySettings.sequence.duration
    melodyPart.loop = melodySettings.sequence.loop
    //
    //
    const sampler = new Tone.Sampler({
      urls: {
        A1: '00001-Linn-9000-BassDrumrum1.mp3',
        A2: '00017-Linn-9000-Snare.mp3'
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

    this.setState({
      isStarted: true
    })
  }

  handleValueChange = (instrumentName, property, value) => {
    const { bassSettings, melodySettings } = this.state

    let instrument
    let settings

    if (instrumentName === 'bass') {
      instrument = bassSynth
      settings = bassSettings
    } else if (instrumentName === 'melody') {
      instrument = melodySynth
      settings = melodySettings
    }

    switch (property) {
      case 'synthType':
        instrument.oscillator.type = value
        settings.synth.oscillator.type = value
        break
      case 'synthShowEnvelope':
        settings.synthUI.envelopeShow = value
        break
      case 'synthEnvelopeAttack':
        instrument.envelope.attack = value
        settings.synth.envelope.attack = value
        break
      case 'synthEnvelopeDecay':
        instrument.envelope.decay = value
        settings.synth.envelope.decay = value
        break
      case 'synthEnvelopeSustain':
        instrument.envelope.sustain = value
        settings.synth.envelope.sustain = value
        break
      case 'synthEnvelopeRelease':
        instrument.envelope.release = value
        settings.synth.envelope.release = value
        break
    }

    this.setState({
      bassSettings,
      melodySettings
    })
  }

  handleBassValueChange = (property, value) => {
    const { bassSettings } = this.state

    const instrument = bassSynth

    if (property === 'pingPongDelayWet') {
      bassPingPongDelay.wet.value = value
      bassSettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      bassChorus.wet.value = value
      bassSettings.chorus.wet = value
    } else if (property === 'synthShowEnvelope') {
      console.log(bassSettings, bassSettings.synthUI, value)
      bassSettings.synthUI.envelopeShow = value
    }

    this.setState({
      bassSettings
    })
  }

  handleMelodyValueChange = (property, value) => {
    const { melodySettings } = this.state

    if (property === 'pingPongDelayWet') {
      melodyPingPongDelay.wet.value = value
      melodySettings.pingPongDelay.wet = value
    } else if (property === 'melodyPingPongDelayDelayTime') {
      melodyPingPongDelay.delayTime.value = value
      melodySettings.pingPongDelay.delayTime = value
    } else if (property === 'melodyPingPongDelayMaxDelayTime') {
      melodyPingPongDelay.maxDelayTime = value
      melodySettings.pingPongDelay.maxDelayTime = value
    } else if (property === 'chorusWet') {
      melodyChorus.wet.value = value
      melodySettings.chorus.wet = value
    } else if (property === 'melodyChorusSpread') {
      melodyChorus.spread = value
      melodySettings.chorus.spread = value
    } else if (property === 'synthShowEnvelope') {
      melodySettings.synthUI.envelopeShow = value
    }

    this.setState({
      melodySettings
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

  handleToggleUIShow = () => {
    const { isUIShown } = this.state

    this.setState({
      isUIShown: !isUIShown
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
    const { bassSettings, melodySettings, drumsSettings } = this.state

    return (
      <div className="instrumentUI">
        <ToneSynth
          instrumentName="bass"
          settings={bassSettings}
          handleValueChange={this.handleValueChange}
        />

        <ToneSynth
          instrumentName="melody"
          settings={melodySettings}
          handleValueChange={this.handleValueChange}
        />

        <Surface
          minX="0"
          maxX="1"
          stepX="0.01"
          valueX={melodySettings.pingPongDelay.delayTime}
          propertyX="melodyPingPongDelayDelayTime"
          minY="0"
          maxY="1"
          stepY="0.01"
          valueY={melodySettings.pingPongDelay.maxDelayTime}
          propertyY="melodyPingPongDelayMaxDelayTime"
          handleValueChange={this.handleMelodyValueChange}
        />

        <SC_Slider
          name="Delay Wet"
          min={0}
          max={1}
          step={0.01}
          value={bassSettings.pingPongDelay.wet}
          property="pingPongDelayWet"
          handleChange={this.handleDrumsValueChange}
        />

        <SC_Slider
          name="Chorus Wet"
          min={0}
          max={1}
          step={0.01}
          value={bassSettings.chorus.wet}
          property="chorusWet"
          handleChange={this.handleDrumsValueChange}
        />

        <Channel
          settings={drumsSettings}
          handleValueChange={this.handleDrumsValueChange}
        />

        <SC_Knob
          name="Melody Chorus Spread"
          min={0}
          max={360}
          value={180}
          property="melodyChorusSpread"
          handleChange={this.handleMelodyValueChange}
        />
      </div>
    )
  }

  render() {
    const { isStarted, isUIShown } = this.state

    return (
      <div className="Container">
        {isStarted ? this.renderShowHideButton() : this.renderStartButton()}
        {isUIShown ? this.renderUI() : ''}
      </div>
    )
  }
}
