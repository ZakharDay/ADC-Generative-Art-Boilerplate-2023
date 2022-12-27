const drumsState = { currentSequence: 0 }

const drumsSettings = {
  presets: {
    default: {
      channel: {
        volume: 0,
        mute: false
      }
    }
  },
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
          time: '0:1:0',
          noteName: 'A2',
          duration: '4n',
          velocity: 0.2
        },
        {
          time: '0:2:0',
          noteName: 'A1',
          duration: '4n',
          velocity: 0.6
        },
        {
          time: '0:3:0',
          noteName: 'A2',
          duration: '4n',
          velocity: 0.2
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

const samples = {
  A1: '00001-Linn-9000-BassDrumrum1',
  A2: '00017-Linn-9000-Snare',
  A3: '00002-Linn-9000-Clhh-1',
  A4: '00064-Vermona-DRM1-MK3-Tom13'
  // A1: 'Linn-9000-Bass-Drum',
  // B1: 'Linn-9000-Kick',
  // C1: 'Linn-9000-Snare',
  // D1: 'Linn-AdrenaLinn-Snare',
  // E1: 'Linn-LinnDrum-Snare',
  // F1: 'Tama-RockStar-Ride',
  // G1: 'Vermona-DRM1-High-Hat-Closed',
  // A2: 'Vermona-DRM1-High-Hat-Open',
  // B2: 'Vermona-DRM1-MK3-Bass-Drum',
  // C2: 'Vermona-DRM1-MK3-High-Hat-Closed',
  // D2: 'Vermona-DRM1-MK3-High-Hat-Open'
}

export { presets, sequences, samples }
