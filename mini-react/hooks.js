import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"
let currentlyRenderingFiber = null
let workInProgressHook = null

export const renderWithHooks = (wip) => {
  currentlyRenderingFiber = wip
  currentlyRenderingFiber.memoriedState = null
  workInProgressHook = null
}

function updateWorkInProgressHook() {
  let hook

  const current = currentlyRenderingFiber.alternate
  if (!current) {
    // 初次渲染
    hook = {
      memoriedState: null,
      next: null,
    }

    if (!workInProgressHook) {
      // hook0
      workInProgressHook = currentlyRenderingFiber.memoriedState = hook
    } else {
      // hook1, hook2, hook3 ...
      workInProgressHook = workInProgressHook.next = hook
    }
  } else {
    // 更新
    currentlyRenderingFiber.memoriedState = current.memoriedState
    if (!workInProgressHook) {
      // hook0
      hook = workInProgressHook = currentlyRenderingFiber.memoriedState
    } else {
      // hook1, hook2, hook3 ...
      hook = workInProgressHook = workInProgressHook.next
    }
  }

  return hook
}

export const useReducer = (reducer, initialState) => {
  const hook = updateWorkInProgressHook()
  console.log("sedationh useReducer", hook)

  if (!currentlyRenderingFiber.alternate) {
    // 初次渲染
    hook.memoriedState = initialState
  }

  const dispatch = (action) => {
    hook.memoriedState = reducer(hook.memoriedState, action)
    currentlyRenderingFiber.alternate = { ...currentlyRenderingFiber }
    scheduleUpdateOnFiber(currentlyRenderingFiber)
  }

  return [hook.memoriedState, dispatch]
}
