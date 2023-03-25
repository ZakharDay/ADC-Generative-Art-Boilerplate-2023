import * as Tone from 'tone'

import { shuffle } from '../utilities.js'

import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'

import { getStoreEffect } from './store'

let melodySequenceValue = 'steps1'

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

function initSound() {
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

  sampler = new Tone.Sampler({
    urls: {
      A1: '00001-Linn-9000-BassDrumrum1.mp3',
      A2: '00017-Linn-9000-Snare.mp3',
      A3: '00002-Linn-9000-Clhh-1.mp3',
      A4: '00064-Vermona-DRM1-MK3-Tom13.mp3'
    },
    baseUrl: 'http://localhost:3000/samples/'
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
  Tone.Transport.scheduleRepeat(handleNextMeasure, '1m')
}

function handleMelodySequenceChange(value) {
  melodySequenceValue = value
}

function handleMelodySoundPresetChange(value) {
  const preset = melodySettings.presets[value]

  const instrument = melodySynth
  const chorus = melodyChorus
  const distortion = melodyDistortion
  const pingPongDelay = melodyPingPongDelay
  const bitCrusher = melodyBitCrusher

  const { oscillator, envelope } = preset.synth

  instrument.oscillator.type = oscillator.type
  instrument.envelope.attack = envelope.attack
  instrument.envelope.decay = envelope.decay
  instrument.envelope.sustain = envelope.sustain
  instrument.envelope.release = envelope.release

  chorus.wet.value = preset.chorus.wet
  chorus.type = preset.chorus.type
  chorus.frequency.value = preset.chorus.frequency
  chorus.delayTime = preset.chorus.delayTime
  chorus.depth = preset.chorus.depth
  chorus.spread = preset.chorus.spread

  distortion.wet.value = preset.distortion.wet
  distortion.distortion = preset.distortion.distortion
  distortion.oversample = preset.distortion.oversample
  bitCrusher.wet.value = preset.bitCrusher.wet
  bitCrusher.bits = preset.bitCrusher.bits

  pingPongDelay.wet.value = preset.pingPongDelay.wet
  pingPongDelay.delayTime.value = preset.pingPongDelay.delayTime
  pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime
}

function handleNextMeasure() {
  if (getStoreEffect()) {
    melodyPart.clear()

    let notes = []

    melodySettings.sequence.steps2.forEach((item, i) => {
      notes.push(item.noteName)
    })

    notes = shuffle(notes)

    let randomizedSequence = [...melodySettings.sequence.steps2]

    randomizedSequence.forEach((step, i) => {
      let newStep = Object.assign({}, step)
      newStep.noteName = notes[i]
      melodyPart.add(newStep)
    })
  } else {
    melodyPart.clear()

    const steps = melodySettings.sequence[`${melodySequenceValue}`]

    steps.forEach((step, i) => {
      melodyPart.add(step)
    })
  }
}

export { initSound, handleMelodySequenceChange, handleMelodySoundPresetChange }
