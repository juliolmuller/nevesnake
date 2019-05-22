
/**
 * Class to build a snake for the game.
 * @class
 * @author Julio Muller & Aurelio Matsunaga
 * @version 1.2.0
 */
class Snake extends Queue {

  /**
   * Instances an object of snake, receiving its initial head coordinates.
   * @constructor
   * @param {number} blockSize Holds the size of each block of the game.
   * @param {number} initialPosX Initial position in X axis.
   * @param {number} initialPosY Initial position in Y axis.
   */
  constructor(blockSize, initialPosX, initialPosY) {
    super()
    this.blockSize = blockSize
    if (initialPosX && initialPosY) {
      this.insert({
        x: initialPosX * this.blockSize,
        y: initialPosY * this.blockSize
      })
    }
  }

  /**
   * Updates the position of the entire body of the snake, based on a direction and returning its last tail coordinates.
   * @returns {object}
   * @param {Direction} direction Indicates the direction the snake's head is going to.
   */
  walk(direction) {
    const size = this.size()
    const { x, y } = this.getByIndex(size - 1)
    for (let i = (size -1); i > 0; i--) {
      this.getByIndex(i).x = this.getByIndex(i - 1).x
      this.getByIndex(i).y = this.getByIndex(i - 1).y
    }
    switch (direction) {
      case Direction.UP:
        this.items.y -= this.blockSize
        break
      case Direction.DOWN:
        this.items.y += this.blockSize
        break
      case Direction.LEFT:
        this.items.x -= this.blockSize
        break
      case Direction.RIGHT:
        this.items.x += this.blockSize
        break
    }
    return { x, y }
  }

  /**
   * Returns the coordinates of the snake's head.
   * @returns {object}
   */
  getHead() {
    const { x, y } = this.items
    return { x, y }
  }
}
