import p5 from 'p5'

const frameRate = 60
const diameter = 30
const radius = diameter / 2
const startPosition = { x: 0, y: 0 }
const currentPosition = { x: startPosition.x, y: startPosition.y }
const transitionTo = { x: 500, y: 300 }
const transitionTime = 5000
const frameTime = 1000 / frameRate
const frames = transitionTime / frameTime
const distanceX = transitionTo.x - startPosition.x
const distanceY = transitionTo.y - startPosition.y

const movePerFrame = {
  x: distanceX / frames,
  y: distanceY / frames
}

const transitionStartedAt = Date.now()
const transitionEndTime = transitionStartedAt + transitionTime
let currentTime = Date.now()

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(600, 600)
    canvas.parent('prototype_49')
    p.frameRate(frameRate)
  }

  p.draw = () => {
    const x = currentPosition.x + radius
    const y = currentPosition.y + radius

    p.background(0)
    p.fill(255, 100, 150)
    p.ellipse(x, y, diameter, diameter)

    if (currentTime < transitionEndTime) {
      currentPosition.x += movePerFrame.x
      currentPosition.y += movePerFrame.y
      currentTime = Date.now()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
