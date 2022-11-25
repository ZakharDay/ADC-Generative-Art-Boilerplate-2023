import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'

import ToneSynth from './modules/ToneSynth.jsx'
import PingPongDelayEffect from './modules/PingPongDelayEffect.jsx'
import ChorusEffect from './modules/ChorusEffect.jsx'
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
    let pingPongDelay
    let chorus
    let settings

    if (instrumentName === 'bass') {
      instrument = bassSynth
      pingPongDelay = bassPingPongDelay
      chorus = bassChorus
      settings = bassSettings
    } else if (instrumentName === 'melody') {
      instrument = melodySynth
      pingPongDelay = melodyPingPongDelay
      chorus = melodyChorus
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
      case 'pingPongDelayWet':
        pingPongDelay.wet.value = value
        settings.pingPongDelay.wet = value
        break
      case 'pingPongDelayDelayTime':
        pingPongDelay.delayTime.value = value
        settings.pingPongDelay.delayTime = value
        break
      case 'pingPongDelayMaxDelayTime':
        pingPongDelay.maxDelayTime = value
        settings.pingPongDelay.maxDelayTime = value
        break
      case 'chorusWet':
        chorus.wet.value = value
        settings.chorus.wet = value
        break
      case 'chorusType':
        chorus.type = value
        settings.chorus.type = value
        break
      case 'chorusFrequency':
        chorus.frequency.value = value
        settings.chorus.frequency = value
        break
      case 'chorusDelayTime':
        chorus.delayTime = value
        settings.chorus.delayTime = value
        break
      case 'chorusDepth':
        chorus.depth = value
        settings.chorus.depth = value
        break
      case 'chorusSpread':
        chorus.spread = value
        settings.chorus.spread = value
        break
    }

    this.setState({
      bassSettings,
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

        <PingPongDelayEffect
          instrumentName="bass"
          settings={bassSettings}
          handleValueChange={this.handleValueChange}
        />

        <ChorusEffect
          instrumentName="bass"
          settings={bassSettings}
          handleValueChange={this.handleValueChange}
        />

        <ToneSynth
          instrumentName="melody"
          settings={melodySettings}
          handleValueChange={this.handleValueChange}
        />

        <PingPongDelayEffect
          instrumentName="melody"
          settings={melodySettings}
          handleValueChange={this.handleValueChange}
        />

        <ChorusEffect
          instrumentName="melody"
          settings={melodySettings}
          handleValueChange={this.handleValueChange}
        />

        <Channel
          settings={drumsSettings}
          handleValueChange={this.handleDrumsValueChange}
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
