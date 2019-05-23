
/**
 * Class to build a snake for the game.
 * @class
 * @author Julio Muller & Aurelio Matsunaga
 * @version 1.2.3
 */
class Snake extends Queue {

  /**
   * Instances an object of snake, receiving its initial head coordinates.
   * @constructor
   * @param {number} initialPosX Initial position in X axis.
   * @param {number} initialPosY Initial position in Y axis.
   */
  constructor(initialPosX, initialPosY) {
    super()
    if (initialPosX && initialPosY) {
      this.insert({
        x: initialPosX,
        y: initialPosY
      })
    }
  }

  /**
   * Returns the coordinates of the next step the snake is heading to, based on a direction.
   * @returns {object}
   * @param {Direction} direction Indicates the direction the snake's head is going to.
   * @param {number} blockSize Indicates the size of each block and how much the snake walks on each step.
   */
  nextStep(direction, blockSize) {
    let { x, y } = this.items
    switch (direction) {
      case Direction.UP:
        y -= blockSize
        break
      case Direction.DOWN:
        y += blockSize
        break
      case Direction.LEFT:
        x -= blockSize
        break
      case Direction.RIGHT:
        x += blockSize
        break
    }
    return { x, y }
  }

  /**
   * Updates the position of the entire body of the snake, based on a direction and returning its last tail coordinates.
   * @returns {object}
   * @param {Direction} direction Indicates the direction the snake's head is going to.
   * @param {number} blockSize Indicates the size of each block and how much the snake walks on each step.
   */
  walk(direction, blockSize = 1) {
    const size = this.size()
    const { x, y } = this.getByIndex(size - 1)
    for (let i = (size -1); i > 0; i--) {
      this.getByIndex(i).x = this.getByIndex(i - 1).x
      this.getByIndex(i).y = this.getByIndex(i - 1).y
    }
    const head = this.nextStep(direction, blockSize)
    this.items.x = head.x
    this.items.y = head.y
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
