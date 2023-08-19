import { isString, isNumber } from "lodash-es"

export function updateNode(node, prev, nextVal) {
  Object.keys(prev).forEach((key) => {
    if (key === "children") {
      if (isStringOrNumber(nextVal[key])) {
        node.textContent = ""
      }
    } else if (key.slice(0, 2) === "on") {
      const eventName = key.slice(2).toLowerCase()
      node.removeEventListener(eventName, prev[key])
    } else {
      node[key] = ""
    }
  })

  Object.keys(nextVal).forEach((key) => {
    if (key === "children") {
      if (isStringOrNumber(nextVal[key])) {
        // STUDY: seda 文本节点处理
        node.textContent = nextVal[key]
      }
    } else if (key.slice(0, 2) === "on") {
      const eventName = key.slice(2).toLowerCase()
      node.addEventListener(eventName, nextVal[key])
    } else {
      node[key] = nextVal[key]
    }
  })
}


export function isStringOrNumber(val) {
  return isString(val) || isNumber(val)
}
