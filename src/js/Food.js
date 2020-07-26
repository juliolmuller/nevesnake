import moreNeves from '../img/more-neves.png'
import lessNeves from '../img/less-neves.png'

/**
 * Class to store coordinates for the snake's food in the game.
 *
 * @class
 * @author Julio Muller & Aurelio Matsunaga
 * @version 1.2.0
 */
export default class Food {

  /**
   * Instances an object of food with a random coordinate to be placed in the board.
   *
   * @constructor
   * @param {number} initialPosX Initial position in X axis.
   */
  constructor(blockSize) {
    this._blockSize = blockSize
    this.image = new Image()

    this.regenerate(0)
  }

  /**
   * Regenerate the random coordinates for axis X and Y.
   */
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
