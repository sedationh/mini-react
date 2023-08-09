import { isArray } from "lodash-es"
import { isStringOrNumber, updateNode } from "./utils"
import { createFiber } from "./ReactFiber"

// 协调（diff）
function reconcileChildren(wip, children) {
  if (isStringOrNumber(children)) {
    return
  }

  const newChildren = isArray(children) ? children : [children]
  let previousNewFiber = null
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i]
    if (newChild == null) {
      continue
    }
    const newFiber = createFiber(newChild, wip)

    if (previousNewFiber === null) {
      // head node
      wip.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }

    previousNewFiber = newFiber
  }
}

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, wip.props)
  }

  reconcileChildren(wip, wip.props.children)
}
