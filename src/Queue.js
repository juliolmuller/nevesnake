
class Queue {
  constructor(...items) {
    this.items = undefined

    items.forEach((item) => this.insert(item))
  }

  insert(item) {
    item._next = undefined

    if (this.items) {
      let aux = this.items
      while (aux._next !== undefined) { aux = aux._next }
      aux._next = item
    } else {
      this.items = item
    }
  }

  remove() {
    const aux = this.items
    this.items = this.items._next

    delete aux._next

    return aux
  }

  size() {
    if (!this.items) {
      return 0
    }

    let aux = this.items
    let count = 1

    while (aux._next !== undefined) {
      aux = aux._next
      count++
    }

    return count
  }

  getByIndex(index) {
    let aux = this.items
    let count = 0

    while (count < index) {
      aux = aux._next
      count++
    }

    return aux
  }
}

export default Queue
