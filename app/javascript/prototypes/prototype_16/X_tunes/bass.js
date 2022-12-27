const synthUI = {
  envelopeShow: false
}

const presets = {
  default: {
    synth: {
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
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    },
    chorus: {
      wet: 0.3,
      type: 'sine',
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      spread: 180
    },
    pingPongDelay: { wet: 0.2, delayTime: 0.25, maxDelayTime: 1 }
  },
  preset1: {
    synth: {
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
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    },
    chorus: {
      wet: 0.6,
      type: 'square',
      frequency: 30,
      delayTime: 3.5,
      depth: 0.7,
      spread: 180
    },
    pingPongDelay: { wet: 0.4, delayTime: 0.5, maxDelayTime: 1 }
  },
  preset2: {
    synth: {
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
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    },
    chorus: {
      wet: 0.6,
      type: 'sine',
      frequency: 50,
      delayTime: 3.5,
      depth: 0.7,
      spread: 180
    },
    pingPongDelay: { wet: 0.4, delayTime: 0.25, maxDelayTime: 1 }
  },
  current: 'default'
}

const sequence = {
  steps1: [
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
  steps2: [
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
  loop: true,
  current: 'steps1'
}

export { synthUI, presets, sequence }
