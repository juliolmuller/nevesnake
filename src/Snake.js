import Queue from './Queue'
import Direction from './Direction'

class Snake extends Queue {
  constructor(initialPosX, initialPosY) {
    super()

    if (initialPosX && initialPosY) {
      this.insert({
        x: initialPosX,
        y: initialPosY,
      })
    }
  }

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

      default:
        /* do nothing */
    }

    return { x, y }
  }

  walk(direction, blockSize = 1) {
    const size = this.size()
    const { x, y } = this.getByIndex(size - 1)

    for (let i = (size - 1); i > 0; i--) {
      this.getByIndex(i).x = this.getByIndex(i - 1).x
      this.getByIndex(i).y = this.getByIndex(i - 1).y
    }

    const head = this.nextStep(direction, blockSize)
    this.items.x = head.x
    this.items.y = head.y

    return { x, y }
  }

  getHead() {
    return {
      x: this.items.x,
      y: this.items.y,
    }
  }
}

export default Snake
