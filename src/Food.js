import moreNeves from './assets/images/more-neves.png'
import lessNeves from './assets/images/less-neves.png'

class Food {
  constructor(blockSize) {
    this._blockSize = blockSize
    this.image = new Image()

    this.regenerate(0)
  }

  regenerate(index) {
    const PROBABILITY = 1.4   // Probability to return <1 is 133% greater tahn >=1
    this._imageIndex = index === 0 ? index : Math.floor(Math.random() * PROBABILITY)
    this.image.src = [moreNeves, lessNeves][this._imageIndex]
    this.x = Math.floor(Math.random() * 17 + 1) * this._blockSize
    this.y = Math.floor(Math.random() * 15 + 3) * this._blockSize
  }

  willGrow() {
    return (this._imageIndex === 0)
  }
}

export default Food
