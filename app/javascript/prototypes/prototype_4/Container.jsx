import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'

export default class Container extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const synthSettings = {
      volume: -20,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'sawtooth',
        modulationType: 'sine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const synth = new Tone.Synth(synthSettings)

    // const distortionSettings = {
    //   wet: 1,
    //   distortion: 1,
    //   oversample: '4x'
    // }

    // const distortion = new Tone.Distortion(distortionSettings).toDestination()

    const chorusSettings = {
      wet: 0.3,
      type: 'sine',
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      spread: 180
    }

    const chorus = new Tone.Chorus(chorusSettings).start()

    const pingPongDelaySettings = { wet: 0.2, delayTime: 0.25, maxDelayTime: 1 }

    const pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings)

    const jcReverbSettings = {
      wet: 1,
      roomSize: 0.3
    }

    const jcReverb = new Tone.JCReverb(jcReverbSettings).toDestination()

    // const freeverbSettings = {
    //   wet: 1,
    //   roomSize: 0.5,
    //   dampening: 10
    // }
    //
    // const freeverb = new Tone.Freeverb(freeverbSettings)

    const channelSettings = { volume: 0, pan: 0, mute: false, solo: false }
    const channel = new Tone.Channel(channelSettings).toDestination()

    synth.chain(chorus, pingPongDelay, jcReverb, channel)

    //
    //
    // Мелодия
    //
    //

    // Целые ноты
    // const sequence = [
    //   {
    //     time: '0:0:0',
    //     noteName: 'C3',
    //     duration: '1m',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:0:0',
    //     noteName: 'G4',
    //     duration: '1m',
    //     velocity: 1
    //   }
    // ]

    // Четвертные ноты играются в четвертные интервалы
    // const sequence = [
    //   {
    //     time: '0:0:0',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:1:0',
    //     noteName: 'E3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:2:0',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:3:0',
    //     noteName: 'B4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:0:0',
    //     noteName: 'G4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:1:0',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:2:0',
    //     noteName: 'C4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:3:0',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   }
    // ]

    // Шестнадцатые ноты
    // const sequence = [
    //   {
    //     time: '0:0:0',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:1',
    //     noteName: 'E3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:2',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:3',
    //     noteName: 'B4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:1:0',
    //     noteName: 'G4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:1:1',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:1:2',
    //     noteName: 'C4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:1:3',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:2:0',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:2:1',
    //     noteName: 'E3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:2:2',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:2:3',
    //     noteName: 'B4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:3:0',
    //     noteName: 'G4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:3:1',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:3:2',
    //     noteName: 'C4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:3:3',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   //
    //   {
    //     time: '1:0:0',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:0:1',
    //     noteName: 'E3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:0:2',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:0:3',
    //     noteName: 'B4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:1:0',
    //     noteName: 'G4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:1:1',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:1:2',
    //     noteName: 'C4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:1:3',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:2:0',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:2:1',
    //     noteName: 'E3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:2:2',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:2:3',
    //     noteName: 'B4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:3:0',
    //     noteName: 'G4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:3:1',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:3:2',
    //     noteName: 'C4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '1:3:3',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 1
    //   }
    // ]

    // Тестовая мелодия
    const sequence = [
      {
        time: '0:0:0',
        noteName: 'C3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:0:2',
        noteName: 'A3',
        duration: '1n',
        velocity: 1
      },
      {
        time: '0:1:0',
        noteName: 'E3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:2:0',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:0',
        noteName: 'C3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:1',
        noteName: 'E3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:2',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:0:0',
        noteName: 'D3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:0',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:2',
        noteName: 'E4',
        duration: '4n',
        velocity: 0.7
      },
      {
        time: '1:1:3',
        noteName: 'D4',
        duration: '4n',
        velocity: 0.8
      },
      {
        time: '1:2:0',
        noteName: 'C3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:0',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:2',
        noteName: 'C4',
        duration: '4n',
        velocity: 1
      }
    ]

    // Проверяем количество шестнадцатых
    // const sequence = [
    //   {
    //     time: '0:0:0',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:1',
    //     noteName: 'A3',
    //     duration: '1n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:2',
    //     noteName: 'E3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:3',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:4',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:5',
    //     noteName: 'E3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:6',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:7',
    //     noteName: 'D3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:8',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:9',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 0.7
    //   },
    //   {
    //     time: '0:0:10',
    //     noteName: 'D4',
    //     duration: '4n',
    //     velocity: 0.8
    //   },
    //   {
    //     time: '0:0:11',
    //     noteName: 'C3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:12',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:13',
    //     noteName: 'C4',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:14',
    //     noteName: 'G3',
    //     duration: '4n',
    //     velocity: 1
    //   },
    //   {
    //     time: '0:0:15',
    //     noteName: 'E4',
    //     duration: '4n',
    //     velocity: 0.7
    //   }
    // ]

    // Создаём партию, добавляем в неё секвенцию
    // и включаем проигрывание
    const part = new Tone.Part((time, note) => {
      synth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)

    // Указываем длительность партии
    part.loopEnd = '2m'

    // Включаем зацикливание
    part.loop = true

    // Включаем звук в браузере
    // sampler.context.resume()

    // Включаем отсчёт времени в Tone.js
    Tone.Transport.start()
  }

  render() {
    return (
      <div className="Container">
        <SC_Button
          text="Art Design & Coding Community"
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}
