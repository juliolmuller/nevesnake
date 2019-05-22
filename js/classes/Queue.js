
/**
 * Class to build a data sctructure of queue.
 * @class
 * @author Julio Muller & Aurelio Matsunaga
 * @version 1.2.0
 */
class Queue {

  /**
   * Instances an object structured as queue.
   * @constructor
   * @param {Iterable} items List of iterable items to be added to the queue.
   */
  constructor(...items) {
    this.items = undefined
    items.forEach(item => {
      this.insert(item)
    })
  }

  /**
   * Adds an object to the end of the queue.
   * @param {object} item Object to be added to the structure.
   */
  insert(item) {
    item._next = undefined
    if (this.items) {
      let aux = this.items
      while (aux._next !== undefined)
        aux = aux._next
      aux._next = item
    } else {
      this.items = item
    }
  }

  /**
   * Removes the first/oldest object from the queue, returning it.
   * @returns {object}
   */
  remove() {
    const { x, y } = this.items
    this.items = this.items._next
    return { x, y }
  }

  /**
   * Returns the quantity of items in the queue.
   * @returns {number}
   */
  size() {
    if (!this.items)
      return 0;
    let aux = this.items
    let count = 1
    while (aux._next !== undefined) {
      aux = aux._next
      count++
    }
    return count
  }

  /**
   * Returns the value in the (index+1)th position in the structure.
   * @param {number} index Index of the item in the structure (starting with 0)
   * @returns {object}
   */
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
