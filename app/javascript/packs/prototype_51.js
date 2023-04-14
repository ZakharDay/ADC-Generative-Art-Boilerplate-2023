import p5 from 'p5'
import { getRandomArbitrary } from '../prototypes/utilities'

const canvasSize = { width: 600, height: 600 }
const frameRate = 60
const frameTime = 1000 / frameRate

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

console.log(positionPerFrame)

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

  console.log(
    distanceX,
    distanceY,
    frames,
    distanceX / frames,
    distanceY / frames
  )

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

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
    canvas.parent('prototype_51')
    p.frameRate(frameRate)
  }

  p.draw = () => {
    const { d } = currentPosition
    const radius = calcRadius(d)
    const x = currentPosition.x + radius
    const y = currentPosition.y + radius

    // console.log(currentPosition)

    p.background(0)
    p.fill(255, 100, 150)
    p.ellipse(x, y, d, d)

    if (currentTime < transitionEndTime) {
      if (transitionTo.d > transitionFrom.d) {
        console.log('1 to greater then from')

        if (currentPosition.d < transitionTo.d) {
          console.log('1.1 current lower then to')

          currentPosition.d += diameterPerFrame.d
        } else if (currentPosition.d >= transitionTo.d) {
          console.log('1.2 current greater or equal to')

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
      } else if (transitionTo.d < transitionFrom.d) {
        console.log('2 to lower then from')

        if (currentPosition.d > transitionTo.d) {
          console.log('2.1 current greater then to')

          currentPosition.d += diameterPerFrame.d
          // console.log('dpf', diameterPerFrame.d)
        } else if (currentPosition.d <= transitionTo.d) {
          console.log('2.2 current lower or equel to')

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
      } else if (transitionTo.d === transitionFrom.d) {
        // nothing
        console.log('Equal')
      }

      // if (currentPosition.d >= transitionTo.d) {
      //   transition.direction = 'down'
      // } else if (currentPosition.d <= transitionFrom.d) {
      //   transition.direction = 'up'
      // }

      currentPosition.x += positionPerFrame.x
      currentPosition.y += positionPerFrame.y

      // console.log(positionPerFrame)

      // if (transition.direction === 'up') {
      //   currentPosition.d += diameterPerFrame.d
      // } else if (transition.direction === 'down') {
      //   currentPosition.d -= diameterPerFrame.d
      // }

      currentTime = Date.now()
    } else {
      // transitionFrom = Object.assign({}, currentPosition)
      // transitionTo.d =
      // const minX = 0
      // const maxX = canvasSize.width - radius
      // const minY = 0
      // const maxY = canvasSize.height - radius
      // const minD = 20
      // const maxD = 80
      // transitionFrom = Object.assign({}, currentPosition)
      // transitionTo.x = Math.floor(getRandomArbitrary(minX, maxX))
      // transitionTo.y = Math.floor(getRandomArbitrary(minY, maxY))
      // movePerFrame = calcMovePerFrame(
      //   transitionTo,
      //   transitionFrom,
      //   transitionTime,
      //   frameTime
      // )
      // transitionStartedAt = Date.now()
      // transitionEndTime = transitionStartedAt + transitionTime
      // currentTime = Date.now()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
