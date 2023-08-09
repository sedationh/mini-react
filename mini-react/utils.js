import { isString, isNumber } from "lodash-es"

export function updateNode(node, nextVal) {
  Object.keys(nextVal).forEach((key) => {
    if (key === "children") {
      if (isStringOrNumber(nextVal[key])) {
        // STUDY: seda 文本节点处理
        node.textContent = nextVal[key]
      }
    } else {
      node[key] = nextVal[key]
    }
  })
}

export function isStringOrNumber(val) {
  return isString(val) || isNumber(val)
}
