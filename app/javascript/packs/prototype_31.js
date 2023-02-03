import p5 from 'p5'

document.addEventListener('DOMContentLoaded', () => {
  const sketch = (p) => {
    const x = 100
    const y = 100

    p.setup = () => {
      const canvas = p.createCanvas(700, 410)
      canvas.parent('prototype_31')
    }

    p.draw = () => {
      p.background(0)
      p.fill(255)
      p.rect(x, y, 50, 50)
    }
  }

  new p5(sketch)
})
