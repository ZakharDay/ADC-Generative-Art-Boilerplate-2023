import p5 from 'p5'
import { sample, getRandomArbitrary } from '../prototypes/utilities'

import image1Url from '../../assets/images/Randomatizm-fc7cb2.png'
import image2Url from '../../assets/images/Randomatizm-d57abb.png'
import image3Url from '../../assets/images/Randomatizm-fc7cb2.png'

const images = []

function sketch(p) {
  p.preload = () => {
    images.push(p.loadImage(image1Url))
    images.push(p.loadImage(image2Url))
    images.push(p.loadImage(image3Url))
  }

  p.setup = () => {
    const canvas = p.createCanvas(776, 1200)
    canvas.parent('prototype_43')
    p.frameRate(1)
    // p.background(0)
  }

  p.draw = () => {
    // p.image(sample(images), 0, 0, 200)
    const image = sample(images)
    const x = getRandomArbitrary(0, 500)
    const y = getRandomArbitrary(0, 800)

    p.background(0)

    p.image(
      image,
      x,
      y,
      image.width / 3,
      image.height / 3,
      0,
      0,
      image.width,
      image.height,
      p.CONTAIN
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
