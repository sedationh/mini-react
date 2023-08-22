export { useReducer, useState } from "./hooks"

export class Component {
  constructor(props) {
    this.props = props
  }

  static isReactComponent = true
}
