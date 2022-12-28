// If you use BitCrusher you can't use
// some reverbs at the same time

// MidSideEffect doesn't work

const props = {
  instruments: [
    {
      name: 'Bass',
      type: 'ToneSynth',
      settings: {
        preset: 0,
        sequence: 0,
        chain: 'Chain 1',
        lockedToChain: true
      },
      presets: [
        {
          volume: -10,
          detune: 0,
          portamento: 0.05,
          envelope: {
            attack: 0.4,
            attackCurve: 'exponential',
            decay: 0.6,
            decayCurve: 'exponential',
            sustain: 0.8,
            release: 0,
            releaseCurve: 'exponential'
          },
          oscillator: {
            type: 'triangle',
            modulationType: 'square',
            phase: 2,
            harmonicity: 0.5
          }
        }
      ],
      sequences: [
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'C2',
              duration: '1n',
              velocity: 1
            },
            {
              time: '1:0:0',
              noteName: 'E2',
              duration: '1n',
              velocity: 1
            },
            {
              time: '2:0:0',
              noteName: 'A2',
              duration: '1n',
              velocity: 1
            },
            {
              time: '3:0:0',
              noteName: 'G2',
              duration: '1n',
              velocity: 1
            }
          ],
          duration: '4m',
          loop: true
        }
      ]
    },
    {
      name: 'Drums',
      type: 'Sampler',
      settings: {
        preset: 0,
        sequence: 1,
        chain: 'Chain 2',
        lockedToChain: true
      },
      presets: [
        {
          samples: {
            A1: '00001-Linn-9000-BassDrumrum1.mp3',
            A2: '00017-Linn-9000-Snare.mp3',
            A3: '00002-Linn-9000-Clhh-1.mp3',
            A4: '00064-Vermona-DRM1-MK3-Tom13.mp3'
          }
        }
      ],
      sequences: [
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '0:2:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            }
          ],
          duration: '1m',
          loop: true
        },
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '0:0:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '0:1:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '0:1:2',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '0:2:0',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '0:2:2',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '0:3:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '0:3:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '1:0:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '1:0:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '1:1:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '1:1:2',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '1:2:0',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '1:2:2',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '1:3:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '1:3:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '1:3:3',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '2:0:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '2:0:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '2:1:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '2:1:2',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '2:2:0',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '2:2:2',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '2:3:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '2:3:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '3:0:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '3:0:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '3:1:0',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.6
            },
            {
              time: '3:1:2',
              noteName: 'A1',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '3:2:0',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '3:2:1',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.2
            },
            {
              time: '3:2:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.3
            },
            {
              time: '3:2:3',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.3
            },
            {
              time: '3:3:0',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.4
            },
            {
              time: '3:3:1',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.4
            },
            {
              time: '3:3:2',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.5
            },
            {
              time: '3:3:3',
              noteName: 'A2',
              duration: '4n',
              velocity: 0.6
            }
          ],
          duration: '4m',
          loop: true
        }
      ]
    }
  ],
  chains: [
    {
      name: 'Chain 1',
      settings: {
        preset: 0,
        effects: [
          'AutoFilter',
          'AutoPanner',
          'AutoWah',
          // 'BitCrusher',
          'Chebyshev',
          'Chorus',
          'Distortion',
          'FrequencyShifter',
          'Phaser',
          'PitchShift',
          'Tremolo',
          'Vibrato'
        ],
        bus: 'Bus 1'
      },
      presets: [
        {
          AutoFilter: {
            wet: 0.3,
            type: 'sine',
            frequency: 1,
            depth: 1,
            baseFrequency: 200,
            octaves: 2.6,
            filter: {
              type: 'lowpass',
              frequency: 100,
              rolloff: -12,
              Q: 1
            }
          },
          AutoPanner: {
            wet: 0.3,
            type: 'sine',
            frequency: 1,
            depth: 1
          },
          AutoWah: {
            wet: 0.3,
            baseFrequency: 100,
            octaves: 6,
            sensitivity: 0,
            Q: 2,
            gain: 2,
            follower: 0.1
          },
          // BitCrusher: {
          //   wet: 0.3,
          //   bits: 4
          // },
          Chebyshev: {
            wet: 0.3,
            order: 50,
            oversample: 'none'
          },
          Chorus: {
            wet: 0.3,
            type: 'sine',
            frequency: 1.5,
            delayTime: 3.5,
            depth: 0.7,
            spread: 180
          },
          Distortion: {
            wet: 0.3,
            distortion: 0,
            oversample: '4x'
          },
          FrequencyShifter: {
            wet: 0.3,
            frequency: 42
          },
          Phaser: {
            wet: 0.3,
            frequency: 0.5,
            octaves: 3,
            stages: 10,
            Q: 10,
            baseFrequency: 350
          },
          PitchShift: {
            wet: 0.3,
            pitch: 0,
            windowSize: 0.1,
            delayTime: 0,
            feedback: 0
          },
          Tremolo: {
            wet: 0.3,
            frequency: 10,
            type: 'sine',
            depth: 0.5,
            spread: 180
          },
          Vibrato: {
            wet: 0.3,
            maxDelay: 0.005,
            frequency: 5,
            depth: 0.1,
            type: 'sine'
          }
        }
      ]
    },
    {
      name: 'Chain 2',
      settings: {
        preset: 0,
        effects: ['Distortion'],
        bus: 'Bus 2'
      },
      presets: [
        {
          Distortion: {
            wet: 0.3,
            distortion: 0,
            oversample: '4x'
          }
        }
      ]
    }
  ],
  busses: [
    {
      name: 'Bus 1',
      settings: {
        preset: 0,
        effects: [
          'FeedbackDelay',
          'Freeverb',
          'JCReverb',
          // 'MidSideEffect',
          'PingPongDelay',
          'Reverb',
          'StereoWidener'
        ],
        channel: 'Channel 1'
      },
      presets: [
        {
          FeedbackDelay: {
            wet: 0.3,
            delayTime: 0.8,
            maxDelay: 0.8
          },
          Freeverb: {
            wet: 0.3,
            roomSize: 0.08,
            dampening: 40
          },
          JCReverb: {
            wet: 0.3,
            roomSize: 0.5
          },
          // MidSideEffect: {
          //   wet: 0.3
          // },
          PingPongDelay: {
            wet: 0.3,
            delayTime: 0.25,
            maxDelayTime: 1
          },
          Reverb: {
            wet: 0.3,
            decay: 1.5,
            preDelay: 0.01
          },
          StereoWidener: {
            wet: 0.3,
            width: 0.5
          }
        }
      ]
    },
    {
      name: 'Bus 2',
      settings: {
        preset: 0,
        effects: ['Reverb'],
        channel: 'Channel 2'
      },
      presets: [
        {
          Reverb: {
            wet: 0.3,
            decay: 1.5,
            preDelay: 0.01
          }
        }
      ]
    }
  ],
  channels: [
    {
      name: 'Channel 1',
      settings: {
        volume: 0,
        pan: 0,
        mute: false,
        solo: false
      }
    },
    {
      name: 'Channel 2',
      settings: {
        volume: -10,
        pan: 0,
        mute: false,
        solo: false
      }
    }
  ]
}

export { props }
