const channel = {
  volume: 0,
  mute: false
}

const sequence = {
  steps: [
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
  duration: '1m'
}

export { channel, sequence }
