import p5 from 'p5'
import { getRandomArbitrary } from '../prototypes/utilities'

const canvasSize = { width: 600, height: 600 }
const frameRate = 60
const transitionTime = 5000
const frameTime = 1000 / frameRate

const startPosition = {
  x: 0,
  y: 0,
  d: 30
}

const transitionTo = {
  x: 500,
  y: 300,
  d: 60
}

const currentPosition = Object.assign({}, startPosition)

let movePerFrame = calcMovePerFrame(
  transitionTo,
  startPosition,
  transitionTime,
  frameTime
)

let transitionStartedAt = Date.now()
let transitionEndTime = transitionStartedAt + transitionTime
let currentTime = Date.now()

function calcMovePerFrame(
  transitionTo,
  startPosition,
  transitionTime,
  frameTime
) {
  const distanceX = transitionTo.x - startPosition.x
  const distanceY = transitionTo.y - startPosition.y
  const frames = transitionTime / frameTime

  return {
    x: distanceX / frames,
    y: distanceY / frames
  }
}

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
    canvas.parent('prototype_51')
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
    } else {
      const minX = 0
      const maxX = canvasSize.width - radius
      const minY = 0
      const maxY = canvasSize.height - radius

      startPosition.x = currentPosition.x
      startPosition.y = currentPosition.y

      transitionTo.x = Math.floor(getRandomArbitrary(minX, maxX))
      transitionTo.y = Math.floor(getRandomArbitrary(minY, maxY))

      movePerFrame = calcMovePerFrame(
        transitionTo,
        startPosition,
        transitionTime,
        frameTime
      )

      transitionStartedAt = Date.now()
      transitionEndTime = transitionStartedAt + transitionTime
      currentTime = Date.now()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
