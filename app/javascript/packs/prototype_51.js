import p5 from 'p5'
import { getRandomArbitrary } from '../prototypes/utilities'
import { func } from 'prop-types'

const canvasSize = { width: 600, height: 600 }
const frameRate = 60
const frameTime = 1000 / frameRate
const diameterSettings = { min: 20, max: 200 }

let transitionFrom = {
  x: 0,
  y: 0,
  d: 60
}

let transitionTo = {
  x: 500,
  y: 300,
  d: 30
}

let currentPosition = Object.assign({}, transitionFrom)

let transition = {
  time: 5000,
  frequency: 9
}

let positionPerFrame = calcPositionPerFrame(
  transitionFrom,
  transitionTo,
  transition
)

let diameterPerFrame = calcDiameterPerFrame(
  transitionFrom,
  transitionTo,
  transition
)

let transitionStartedAt = Date.now()
let transitionEndTime = transitionStartedAt + transition.time
let currentTime = Date.now()

function calcPositionPerFrame(transitionFrom, transitionTo, transition) {
  const distanceX = transitionTo.x - transitionFrom.x
  const distanceY = transitionTo.y - transitionFrom.y
  const frames = transition.time / frameTime

  return {
    x: distanceX / frames,
    y: distanceY / frames
  }
}

function calcDiameterPerFrame(transitionFrom, transitionTo, transition) {
  const distanceD = transitionTo.d - transitionFrom.d
  const frames = transition.time / frameTime / transition.frequency

  return {
    d: distanceD / frames
  }
}

function calcRadius(diameter) {
  return diameter / 2
}

function updateDitemeterTransitionParams() {
  const fromD = transitionFrom.d
  const toD = transitionTo.d
  transitionFrom.d = toD
  transitionTo.d = fromD

  diameterPerFrame = calcDiameterPerFrame(
    transitionFrom,
    transitionTo,
    transition
  )
}

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
    canvas.parent('prototype_51')
    p.frameRate(frameRate)
  }

  p.draw = () => {
    const { d } = currentPosition
    let radius = calcRadius(d)
    const x = currentPosition.x
    const y = currentPosition.y

    p.background(0)
    p.fill(255, 100, 150)
    p.ellipse(x, y, d, d)

    if (currentTime < transitionEndTime) {
      if (
        (transitionTo.d > transitionFrom.d &&
          currentPosition.d >= transitionTo.d) ||
        (transitionTo.d < transitionFrom.d &&
          currentPosition.d <= transitionTo.d)
      ) {
        updateDitemeterTransitionParams()
      }

      currentPosition.x += positionPerFrame.x
      currentPosition.y += positionPerFrame.y
      currentPosition.d += diameterPerFrame.d
    } else {
      transitionFrom = Object.assign({}, currentPosition)

      transitionTo.d = Math.floor(
        getRandomArbitrary(diameterSettings.min, diameterSettings.max)
      )

      radius =
        transitionFrom.d > transitionTo.d
          ? calcRadius(transitionTo.d)
          : calcRadius(transitionFrom.d)

      const minX = 0
      const maxX = canvasSize.width - radius
      const minY = 0
      const maxY = canvasSize.height - radius

      transitionTo.x = Math.floor(getRandomArbitrary(minX, maxX))
      transitionTo.y = Math.floor(getRandomArbitrary(minY, maxY))

      positionPerFrame = calcPositionPerFrame(
        transitionFrom,
        transitionTo,
        transition
      )

      diameterPerFrame = calcDiameterPerFrame(
        transitionFrom,
        transitionTo,
        transition
      )

      transitionStartedAt = Date.now()
      transitionEndTime = transitionStartedAt + transition.time
    }

    currentTime = Date.now()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
