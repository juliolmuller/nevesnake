
/**
 * Class to store coordinates for the snake's food in the game.
 * @class
 * @author Julio Muller & Aurelio Matsunaga
 * @version 1.0.0
 */
class Food {

  /**
   * Instances an object of food with a random coordinate to be placed in the board.
   * @constructor
   * @param {number} initialPosX Initial position in X axis.
   */
  constructor(blockSize) {
    this.blockSize = blockSize
    this.regenerate()
  }

  /**
   * Regenerate the random coordinates for axis X and Y.
   */
  regenerate() {
    this.x = Math.floor(Math.random() * 17 + 1) * this.blockSize
    this.y = Math.floor(Math.random() * 15 + 3) * this.blockSize
  }
}
