import { Placement } from "./ReactFiberFlags"
import { isFunction, isString } from "lodash-es"
import { FunctionComponent, HostComponent } from "./ReactWorkTags"

export function createFiber(vnode, returnFiber) {
  console.log("sedationh createFiber", vnode, returnFiber)
  const fiber = {
    // 类型
    type: vnode.type,
    key: vnode.key,
    // 属性
    props: vnode.props,
    // 不同类型的组件， stateNode也不同
    // 原生标签 dom节点
    // class 实例
    stateNode: null,

    // 第一个子fiber
    child: null,
    // 下一个兄弟节点
    sibling: null,
    return: returnFiber,

    flags: Placement,

    // 记录节点在当前层级下的位置
    index: null,
  }

  if (isString(vnode.type)) {
    fiber.tag = HostComponent
  }
  if (isFunction(vnode.type)) {
    fiber.tag = FunctionComponent
  }

  return fiber
}
