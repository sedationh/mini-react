import { Heap } from "./heap"

let taskIdCounter = 0

const taskHeap = new Heap((parent, child) => {
  if (parent.expirationTime === child.expirationTime) {
    return parent.id < child.id
  }
  return parent.expirationTime < child.expirationTime
})

export function scheduleCallback(callback) {
  const currentTime = getCurrentTime()
  const timeout = -1

  const expirationTime = currentTime - timeout

  const newTask = {
    id: taskIdCounter,
    callback,
    expirationTime,
  }
  taskIdCounter += 1

  taskHeap.add(newTask)

  requestHostCallback()
}

const channel = new MessageChannel()
function requestHostCallback() {
  channel.port1.postMessage(null)
}
channel.port2.onmessage = function () {
  workLoop()
}

function workLoop() {
  let currentTask = taskHeap.pop()

  while (currentTask) {
    const callback = currentTask.callback
    callback()
    currentTask = taskHeap.pop()
  }
}

export function getCurrentTime() {
  return performance.now()
}
