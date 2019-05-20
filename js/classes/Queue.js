
class Queue {

  constructor() {
    this.items = {}
  }

  /**
   * Adds an object to the stack.
   * @param {any} item Object to add to the end of the queue.
   */
  insert(item) {
    let aux = this.items
    while (!aux.next)
      aux = aux.next
    aux.next = item
  }

  /**
   * Removes the first object from the queue
   */
  remove() {
    let item = this.items
    this.items = this.items.next
    item.next = undefined
    return item
  }

  /**
   * Returns the quantity of items in the queue.
   */
  size() {
    let aux = this.items
    let count = 0
    while (!aux.next) {
      aux = aux.next
      count++
    }
    return count
  }
}
