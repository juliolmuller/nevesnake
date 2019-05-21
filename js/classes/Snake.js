
class Snake extends Queue {

  /**
   * @param {number} initialPosX Initial position in X axis
   * @param {number} initialPosY Initial position in Y axis
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
   * Updates the position of the entire body of the snake, returning its last tail coordinates.
   * @param {number} toX New coordinates for the head
   * @param {number} toY New coordinates for the head
   * @returns {object}
   */
  walk(coordinates) {
    const size = this.size()
    const { x, y } = this.getByIndex(i - 1)
    for (let i = (size -1); i > 0; i--) {
      this.getByIndex(i).x = this.getByIndex(i - 1).x
      this.getByIndex(i).y = this.getByIndex(i - 1).y
    }
    this.head = coordinates
    return { x, y }
  }

  get head() {
    const { x, y } = this.items
    return { x, y }
  }

  set head(coordinates) {
    this.items.x = coordinates.x
    this.items.y = coordinates.y
  }
}
