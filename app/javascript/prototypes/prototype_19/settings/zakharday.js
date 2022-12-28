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
        },
        {
          volume: -10,
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
            phase: 0,
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
        },
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'C2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '0:0:2',
              noteName: 'D2',
              duration: '3n',
              velocity: 1
            },
            {
              time: '0:2:0',
              noteName: 'G2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '0:2:2',
              noteName: 'A2',
              duration: '3n',
              velocity: 1
            },
            {
              time: '1:0:0',
              noteName: 'E2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '1:0:2',
              noteName: 'D2',
              duration: '3n',
              velocity: 1
            },
            {
              time: '1:2:0',
              noteName: 'A2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '1:2:2',
              noteName: 'E2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '1:3:0',
              noteName: 'G2',
              duration: '4n',
              velocity: 1
            },
            {
              time: '2:0:0',
              noteName: 'C2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '2:0:2',
              noteName: 'D2',
              duration: '3n',
              velocity: 1
            },
            {
              time: '2:2:0',
              noteName: 'G2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '2:2:2',
              noteName: 'A2',
              duration: '3n',
              velocity: 1
            },
            {
              time: '3:0:0',
              noteName: 'E2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '3:0:2',
              noteName: 'D2',
              duration: '3n',
              velocity: 1
            },
            {
              time: '3:2:0',
              noteName: 'A2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '3:2:2',
              noteName: 'E2',
              duration: '8n',
              velocity: 1
            },
            {
              time: '3:3:0',
              noteName: 'G2',
              duration: '4n',
              velocity: 1
            }
          ],
          duration: '4m',
          loop: true
        }
      ]
    },
    {
      name: 'Melody',
      type: 'ToneSynth',
      settings: {
        preset: 0,
        sequence: 2,
        chain: 'Chain 2',
        lockedToChain: true
      },
      presets: [
        {
          volume: -15,
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
            type: 'triangle',
            modulationType: 'sine',
            phase: 0,
            harmonicity: 0.5
          }
        },
        {
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
            phase: 0,
            harmonicity: 0.5
          }
        }
      ],
      sequences: [
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'C4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:0:2',
              noteName: 'A4',
              duration: '1n',
              velocity: 1
            },
            {
              time: '0:1:0',
              noteName: 'E4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:2:0',
              noteName: 'G4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:3:0',
              noteName: 'C4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:3:1',
              noteName: 'E4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:3:2',
              noteName: 'G4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:0:0',
              noteName: 'D4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:1:0',
              noteName: 'G4',
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
              noteName: 'D5',
              duration: '4n',
              velocity: 0.8
            },
            {
              time: '1:2:0',
              noteName: 'C4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:3:0',
              noteName: 'G4',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:3:2',
              noteName: 'C5',
              duration: '4n',
              velocity: 1
            }
          ],
          duration: '2m',
          loop: true
        },
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'C5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:0:2',
              noteName: 'A5',
              duration: '1n',
              velocity: 1
            },
            {
              time: '0:1:0',
              noteName: 'E5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:2:0',
              noteName: 'G5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:3:0',
              noteName: 'C5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:3:1',
              noteName: 'E5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '0:3:2',
              noteName: 'G5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:0:0',
              noteName: 'D5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:1:0',
              noteName: 'G5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:1:2',
              noteName: 'E5',
              duration: '4n',
              velocity: 0.7
            },
            {
              time: '1:1:3',
              noteName: 'D6',
              duration: '4n',
              velocity: 0.8
            },
            {
              time: '1:2:0',
              noteName: 'C5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:3:0',
              noteName: 'G5',
              duration: '4n',
              velocity: 1
            },
            {
              time: '1:3:2',
              noteName: 'C6',
              duration: '4n',
              velocity: 1
            }
          ],
          duration: '2m',
          loop: true
        },
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'C5',
              duration: '1n',
              velocity: 1
            },
            {
              time: '1:0:0',
              noteName: 'E5',
              duration: '1n',
              velocity: 1
            },
            {
              time: '2:0:0',
              noteName: 'A5',
              duration: '1n',
              velocity: 1
            },
            {
              time: '3:0:0',
              noteName: 'G5',
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
      name: 'Ambient',
      type: 'ToneSynth',
      settings: {
        preset: 0,
        sequence: 0,
        chain: 'Chain 3',
        lockedToChain: true
      },
      presets: [
        {
          volume: -16,
          detune: 0,
          portamento: 0.05,
          envelope: {
            attack: 0.05,
            attackCurve: 'exponential',
            decay: 0.2,
            decayCurve: 'exponential',
            sustain: 0.4,
            release: 0.5,
            releaseCurve: 'exponential'
          },
          oscillator: {
            type: 'triangle',
            modulationType: 'sine',
            phase: 6,
            harmonicity: 0.5
          }
        },
        {
          volume: -10,
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
            phase: 0,
            harmonicity: 0.5
          }
        }
      ],
      sequences: [
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '0:0:1',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '0:0:2',
              noteName: 'C5',
              duration: '16n',
              velocity: 1
            },
            {
              time: '0:0:3',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            //
            //
            {
              time: '0:1:0',
              noteName: 'A5',
              duration: '16n',
              velocity: 1
            },
            {
              time: '0:1:2',
              noteName: 'C7',
              duration: '16n',
              velocity: 0.6
            },
            //
            //
            {
              time: '1:0:0',
              noteName: 'E4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '1:0:1',
              noteName: 'E5',
              duration: '16n',
              velocity: 1
            },
            {
              time: '1:0:2',
              noteName: 'C3',
              duration: '16n',
              velocity: 1
            },
            {
              time: '1:0:3',
              noteName: 'E4',
              duration: '16n',
              velocity: 1
            },
            //
            //
            {
              time: '1:1:0',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '1:1:2',
              noteName: 'C3',
              duration: '16n',
              velocity: 1
            },
            {
              time: '1:2:2',
              noteName: 'A5',
              duration: '16n',
              velocity: 1
            },
            {
              time: '1:3:2',
              noteName: 'G6',
              duration: '16n',
              velocity: 1
            },
            //
            //
            {
              time: '2:0:0',
              noteName: 'A5',
              duration: '16n',
              velocity: 1
            },
            {
              time: '2:0:1',
              noteName: 'A4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '2:0:2',
              noteName: 'A3',
              duration: '16n',
              velocity: 1
            },
            {
              time: '2:0:3',
              noteName: 'A4',
              duration: '16n',
              velocity: 1
            },
            //
            //
            {
              time: '2:1:0',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '2:1:2',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            //
            //
            {
              time: '3:0:0',
              noteName: 'G4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '3:0:1',
              noteName: 'G4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '3:0:2',
              noteName: 'G4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '3:0:3',
              noteName: 'G4',
              duration: '16n',
              velocity: 1
            },
            //
            //
            {
              time: '3:1:0',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '3:1:2',
              noteName: 'C4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '3:2:2',
              noteName: 'A4',
              duration: '16n',
              velocity: 1
            },
            {
              time: '3:3:2',
              noteName: 'E5',
              duration: '16n',
              velocity: 1
            }
          ],
          duration: '4m',
          loop: true
        },
        {
          sequence: [
            {
              time: '0:0:0',
              noteName: 'C4',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:0:1',
              noteName: 'C4',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:0:2',
              noteName: 'C5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:0:3',
              noteName: 'C4',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:1:0',
              noteName: 'A5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:1:1',
              noteName: 'C7',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:1:2',
              noteName: 'A5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:1:3',
              noteName: 'A5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:2:0',
              noteName: 'A5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:2:1',
              noteName: 'C7',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:2:2',
              noteName: 'A5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:2:3',
              noteName: 'A5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:3:0',
              noteName: 'E4',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:3:1',
              noteName: 'E5',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:3:2',
              noteName: 'C3',
              duration: '16n',
              velocity: 0.2
            },
            {
              time: '0:3:3',
              noteName: 'E4',
              duration: '16n',
              velocity: 0.2
            }
          ],
          duration: '1m',
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
        effects: ['Chorus'],
        bus: 'Bus 1'
      },
      presets: [
        {
          Chorus: {
            wet: 0.3,
            type: 'sine',
            frequency: 1.5,
            delayTime: 3.5,
            depth: 0.7,
            spread: 180
          }
        },
        {
          Chorus: {
            wet: 0.6,
            type: 'square',
            frequency: 30,
            delayTime: 3.5,
            depth: 0.7,
            spread: 180
          }
        }
      ]
    },
    {
      name: 'Chain 2',
      settings: {
        preset: 0,
        effects: ['Distortion', 'BitCrusher'],
        bus: 'Bus 2'
      },
      presets: [
        {
          Distortion: {
            wet: 0,
            distortion: 0,
            oversample: '4x'
          },
          BitCrusher: {
            wet: 0,
            bits: 4
          }
        },
        {
          Distortion: {
            wet: 0.4,
            distortion: 0,
            oversample: '4x'
          },
          BitCrusher: {
            wet: 0,
            bits: 4
          }
        }
      ]
    },
    {
      name: 'Chain 3',
      settings: {
        preset: 0,
        effects: ['Chorus', 'Tremolo', 'FeedbackDelay'],
        bus: 'Bus 3'
      },
      presets: [
        {
          Chorus: {
            wet: 0.6,
            type: 'square',
            frequency: 4,
            delayTime: 0.3,
            depth: 0.3,
            spread: 180
          },
          Tremolo: {
            wet: 0.6,
            frequency: 10,
            type: 'square',
            depth: 0.5,
            spread: 180
          },
          FeedbackDelay: {
            wet: 0.8,
            delayTime: '16n',
            maxDelay: 16
          }
        },
        {
          Chorus: {
            wet: 0.6,
            type: 'square',
            frequency: 4,
            delayTime: 0.3,
            depth: 0.3,
            spread: 180
          },
          Tremolo: {
            wet: 0.6,
            frequency: 40,
            type: 'square',
            depth: 0.9,
            spread: 180
          },
          FeedbackDelay: {
            wet: 0.8,
            delayTime: '16n',
            maxDelay: 16
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
        effects: ['PingPongDelay'],
        channel: 'Channel 1'
      },
      presets: [
        {
          PingPongDelay: {
            wet: 0.2,
            delayTime: 0.25,
            maxDelayTime: 1
          }
        },
        {
          PingPongDelay: {
            wet: 0.4,
            delayTime: 0.5,
            maxDelayTime: 1
          }
        }
      ]
    },
    {
      name: 'Bus 2',
      settings: {
        preset: 0,
        effects: ['PingPongDelay', 'Reverb'],
        channel: 'Channel 2'
      },
      presets: [
        {
          PingPongDelay: {
            wet: 0.6,
            delayTime: 1,
            maxDelayTime: 4
          },
          Reverb: {
            wet: 0.3,
            decay: 3,
            preDelay: 0.2
          }
        },
        {
          PingPongDelay: {
            wet: 0.2,
            delayTime: 0.6,
            maxDelayTime: 1
          },
          Reverb: {
            wet: 0.6,
            decay: 1.5,
            preDelay: 0.01
          }
        }
      ]
    },
    {
      name: 'Bus 3',
      settings: {
        preset: 0,
        effects: ['Reverb'],
        channel: 'Channel 2'
      },
      presets: [
        {
          Reverb: {
            wet: 0.4,
            decay: 3,
            preDelay: 0.6
          }
        },
        {
          Reverb: {
            wet: 0.6,
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
        volume: 0,
        pan: 0,
        mute: false,
        solo: false
      }
    }
  ]
}

export { props }
