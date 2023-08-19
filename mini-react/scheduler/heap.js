const HEAP_TYPE = {
  MIN: "min",
  MAX: "max",
}
const BuiltInCompareFunction = {
  [HEAP_TYPE.MIN]: (parent, child) => parent <= child,
  [HEAP_TYPE.MAX]: (parent, child) => parent >= child,
}
export class Heap {
  compareFunction
  heap = []
  constructor(x = "min") {
    if (typeof x === "function") {
      this.compareFunction = x
    } else {
      this.compareFunction = BuiltInCompareFunction[x]
    }
  }
  add(value) {
    this.heap.push(value)
    this.heapifyUp()
  }
  pop() {
    if (this.heap.length === 0) return undefined
    if (this.heap.length === 1) return this.heap.pop()
    const top = this.heap[0]
    const lastItem = this.heap.pop()
    this.heap[0] = lastItem
    this.heapifyDown()
    return top
  }
  compare(parentIndex, childIndex) {
    if (!(parentIndex >= 0 && parentIndex < this.size)) {
      return false
    }
    if (!(childIndex >= 0 && childIndex < this.size)) {
      return false
    }
    if (parentIndex === childIndex) {
      return false
    }
    return !this.compareFunction(this.heap[parentIndex], this.heap[childIndex])
  }
  heapifyUp(i = this.heap.length - 1) {
    let index = i
    let parentIndex = this.getParentIndex(index)
    if (this.compare(parentIndex, index)) {
      this.swap(index, parentIndex)
      this.heapifyUp(parentIndex)
    }
  }
  swap(index, parentIndex) {
    const temp = this.heap[index]
    this.heap[index] = this.heap[parentIndex]
    this.heap[parentIndex] = temp
  }
  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }
  heapifyDown(i = 0) {
    let leftIndex = this.getLeftIndex(i)
    let rightIndex = this.getRightIndex(i)
    if (this.compare(i, leftIndex)) {
      this.swap(leftIndex, i)
      this.heapifyDown(leftIndex)
    }
    if (this.compare(i, rightIndex)) {
      this.swap(rightIndex, i)
      this.heapifyDown(rightIndex)
    }
  }
  getLeftIndex(index) {
    return index * 2 + 1
  }
  getRightIndex(index) {
    return index * 2 + 2
  }
  get size() {
    return this.heap.length
  }
  peek() {
    return this.heap[0]
  }
}
