import { isArray } from "lodash-es"
import { isStringOrNumber, updateNode } from "./utils"
import { createFiber } from "./ReactFiber"
import { renderWithHooks } from "./hooks"

// 协调（diff）
// 创建新 fiber
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

export function updateFunctionComponent(wip) {
  renderWithHooks(wip)
  
  const { type, props } = wip
  const children = type(props)
  reconcileChildren(wip, children)
}

export function updateClassComponent(wip) {
  const { type, props } = wip
  const instance = new type(props)
  const children = instance.render()
  reconcileChildren(wip, children)
}

export function updateHostTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.children)
}

export function updateFragmentComponent(wip) {
  // TODO: 这里有个bug, Fragment 仅有 一个文本子节点时，会出现问题
  reconcileChildren(wip, wip.props.children)
}
