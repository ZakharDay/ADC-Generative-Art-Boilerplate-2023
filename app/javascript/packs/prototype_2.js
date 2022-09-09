let audioCtx
let oscillator

function createOscillator() {
  // create web audio api context
  audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  // create Oscillator node
  oscillator = audioCtx.createOscillator()

  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime) // value in hertz
  oscillator.connect(audioCtx.destination)
  oscillator.start()
}

function changeOscillatorFrequency() {
  const slider = document.getElementById('slider')
  oscillator.frequency.setValueAtTime(slider.value, audioCtx.currentTime) // value in hertz
}

function createSlider() {
  const container = document.getElementById('prototype_2')
  const slider = document.createElement('input')
  slider.type = 'range'
  slider.min = 0
  slider.max = 1000
  slider.value = 440
  slider.id = 'slider'
  container.appendChild(slider)

  slider.addEventListener('input', () => {
    changeOscillatorFrequency()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_2')
  const frame = document.createElement('div')
  frame.innerText = 'Art Design & Coding Community'
  frame.classList.add('frame')
  container.appendChild(frame)

  createSlider()

  frame.addEventListener('click', () => {
    createOscillator()
  })
})
