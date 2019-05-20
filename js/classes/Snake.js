
class Snake extends Queue {

  /**
   * @param {number} initialSize Initial size of the snake.
   */
  constructor(initialPosX, initialPosY) {
    super()
    this.insert({
      x: initialPosX,
      y: initialPosY
    })
  }
}
