import p5 from 'p5'
import { sample } from '../prototypes/utilities'

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(600, 600)
    canvas.parent('prototype_37')

    const types = ['none', 'left-to-right', 'right-to-left', 'cross']
    const type = sample(types)

    p.background(38)
    p.stroke(121, 255, 57)

    switch (type) {
      case 'left-to-right':
        p.line(0, 0, 600, 600)
        break
      case 'right-to-left':
        p.line(600, 0, 0, 600)
        break
      case 'cross':
        p.line(0, 0, 600, 600)
        p.line(600, 0, 0, 600)
        break
      default:
        break
    }
  }

  // p.draw = () => {}
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
