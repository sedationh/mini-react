import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from "./ReactWorkTags"
import {
  updateClassComponent,
  updateFragmentComponent,
  updateFunctionComponent,
  updateHostComponent,
} from "./ReactFiberReconciler"
import { Placement, Update } from "./ReactFiberFlags"
import { scheduleCallback } from "./scheduler"
import { updateNode } from "./utils"

let wip = null // work in progress 当前正在工作中的
let wipRoot = null

export function scheduleUpdateOnFiber(fiber) {
  wip = fiber
  wipRoot = fiber

  scheduleCallback(workLoop)
}

function performUnitOfWork() {
  const { tag } = wip

  switch (tag) {
    case HostComponent:
      updateHostComponent(wip)
      break
    case FunctionComponent:
      updateFunctionComponent(wip)
      break
    case ClassComponent:
      updateClassComponent(wip)
      break
    case HostText:
      updateHostComponent(wip)
      break
    case Fragment:
      updateFragmentComponent(wip)
      break

    default:
      break
  }

  // dfs
  if (wip.child) {
    wip = wip.child
    return
  }

  let next = wip
  while (next) {
    if (next.sibling) {
      wip = next.sibling
      return
    }

    next = next.return
  }

  wip = null
}

function commitRoot() {
  commitWorker(wipRoot)
  wipRoot = null
}

function getParentNode(wip) {
  let p = wip
  while (p) {
    if (p.stateNode) {
      return p.stateNode
    }

    p = p.return
  }
}

function commitWorker(wip) {
  if (!wip) {
    return
  }

  // 1. 提交自己
  const parentNode = getParentNode(wip.return)
  const { flags, stateNode } = wip
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode)
  }
  if (flags & Update && stateNode) {
    updateNode(stateNode, wip.alternate.props, wip.props)
  }
  // 2. 提交子节点
  commitWorker(wip.child)
  // 3. 提交兄弟
  commitWorker(wip.sibling)
}

function workLoop() {
  while (wip) {
    performUnitOfWork()
  }

  if (!wip && wipRoot) {
    commitRoot()
  }
}

// requestIdleCallback(workLoop)
