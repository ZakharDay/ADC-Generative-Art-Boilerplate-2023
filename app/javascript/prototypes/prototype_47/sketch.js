import p5 from 'p5'
import { getRandomArbitrary } from '../utilities'
import { getStoreWaveAmplitude } from './store'

let canvasContainerId

let waveHue = 50
let waveSaturation = 50
let waveBrightness = 127

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(700, 410)
    canvas.parent(canvasContainerId)
    p.colorMode(p.HSB, 100, 100, 100, 255)
    p.frameRate(60)
  }

  p.draw = () => {
    p.clear()
    p.background('rgba(255, 255, 255, 0)')
    const waveCount = 10
    const waveSpacing = p.width / (waveCount - 1)

    for (let i = 0; i < waveCount; i++) {
      const x = i * waveSpacing

      const y =
        p.height / 2 +
        p.sin(p.frameCount * 0.05 + i * 0.5) * getStoreWaveAmplitude()

      p.fill(waveHue, waveSaturation, waveBrightness)
      p.noStroke()
      p.ellipse(x, y, p.random(20, 50), p.random(60, 150))
    }

    p.drawingContext.filter = 'blur(60px)'
  }
}

function initSketch(id) {
  canvasContainerId = id
  new p5(sketch)
}

export { initSketch }
