import Direction from './Direction'
import Snake from './Snake'
import Food from './Food'

import background from './assets/images/background.png'
import lessNevesAudio from './assets/audio/less-neves.mp3'
import moreNevesAudio from './assets/audio/more-neves.mp3'
import gameOverAudio from './assets/audio/game-over.mp3'
import fadeOutAudio from './assets/audio/fade-out.mp3'
import rightAudio from './assets/audio/go-right.mp3'
import leftAudio from './assets/audio/go-left.mp3'
import downAudio from './assets/audio/go-down.mp3'
import upAudio from './assets/audio/go-up.mp3'

class Nevesnake {
  constructor(canvasSelector, speed) {
    this._context = document.querySelector(canvasSelector).getContext('2d')
    this._speed = speed

    this._score = 0
    this._blockSize = 32
    this._direction = null
    this._snake = new Snake(9 * this._blockSize, 10 * this._blockSize)
    this._food = new Food(this._blockSize)

    this._configureBackground()
    this._configureControls()
    this._configureSounds()
  }

  _configureBackground() {
    this._background = new Image()
    this._background.src = background
  }

  _configureControls() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' && this._direction !== Direction.RIGHT && this._direction !== Direction.LEFT) {
        this._direction = Direction.LEFT
        this._leftAudio.play()
      } else if (event.key === 'ArrowUp' && this._direction !== Direction.DOWN && this._direction !== Direction.UP) {
        this._direction = Direction.UP
        this._upAudio.play()
      } else if (event.key === 'ArrowRight' && this._direction !== Direction.LEFT && this._direction !== Direction.RIGHT) {
        this._direction = Direction.RIGHT
        this._rightAudio.play()
      } else if (event.key === 'ArrowDown' && this._direction !== Direction.UP && this._direction !== Direction.DOWN) {
        this._direction = Direction.DOWN
        this._downAudio.play()
      }
    })
  }

  _configureSounds() {
    this._lessNevesAudio = new Audio(lessNevesAudio)
    this._moreNevesAudio = new Audio(moreNevesAudio)
    this._gameOverAudio = new Audio(gameOverAudio)
    this._fadeOutAudio = new Audio(fadeOutAudio)
    this._rightAudio = new Audio(rightAudio)
    this._leftAudio = new Audio(leftAudio)
    this._downAudio = new Audio(downAudio)
    this._upAudio = new Audio(upAudio)
  }

  _renderScoreboard() {
    this._context.fillStyle = 'white'
    this._context.font = '45px Changa one'
    this._context.fillText(this._score, 2 * this._blockSize, 1.6 * this._blockSize)
  }

  _renderSnake() {
    for (let i = 0; i < this._snake.size(); i++) {
      const bodyPart = this._snake.getByIndex(i)
      this._context.fillStyle = i === 0 ? 'green' : 'white'
      this._context.fillRect(bodyPart.x, bodyPart.y, this._blockSize, this._blockSize)
      this._context.strokeStyle = 'red'
      this._context.strokeRect(bodyPart.x, bodyPart.y, this._blockSize, this._blockSize)
    }
  }

  _evaluateCollision(nextStep) {
    if (this._hasCollided(nextStep)) {
      this.end(this._gameOverAudio)
    }
  }

  _evaluateFoodCaught(nextStep) {
    if (nextStep.x === this._food.x && nextStep.y === this._food.y) {
      this._score++
      if (this._food.willGrow()) {
        this._snake.insert(this._snake.walk(this._direction, this._blockSize))
        this._moreNevesAudio.play()
      } else {
        this._snake.walk(this._direction, this._blockSize)
        this._snake.remove()
        if (this._snake.size()) {
          this._lessNevesAudio.play()
        } else {
          this.end(this._fadeOutAudio)
        }
      }
      this._food.regenerate()
    } else {
      this._snake.walk(this._direction, this._blockSize)
    }
  }

  _hasCollided(nextStep) {
    // Validate collision at the border of the board
    if (
      nextStep.x < this._blockSize || nextStep.x > 17 * this._blockSize
      || nextStep.y < 3 * this._blockSize || nextStep.y > 17 * this._blockSize
    ) {
      return true
    }

    // Validate collision at snake's body
    for (let i = 1; i < this._snake.size(); i++) {
      const bodyPart = this._snake.getByIndex(i)
      if (nextStep.x === bodyPart.x && nextStep.y === bodyPart.y) {
        return true
      }
    }

    return false
  }

  render() {
    this._context.drawImage(this._background, 0, 0)
    this._context.drawImage(this._food.image, this._food.x, this._food.y)
    this._renderScoreboard()
    this._renderSnake()

    const nextStep = this._snake.nextStep(this._direction, this._blockSize)
    this._evaluateCollision(nextStep)
    this._evaluateFoodCaught(nextStep)
  }

  start() {
    this._interval = setInterval((self) => self.render(), this._speed, this)
  }

  end(sound) {
    clearInterval(this._interval)
    if (sound) {
      sound.play()
    }
  }
}

export default Nevesnake
