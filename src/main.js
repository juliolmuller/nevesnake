import Nevesnake from './Nevesnake'
import './styles.css'

window.onload = () => {
  const CANVAS = '#the-snake'
  const SPEED = 160

  new Nevesnake(CANVAS, SPEED).start()
}
