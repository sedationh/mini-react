// @ts-nocheck

import _ReactDOM from "react-dom/client"
import MiniReactDOM from "../mini-react/react-dom"
import { Component as _Component } from "react"
import { Component as MiniComponent } from "../mini-react/react"

const useMini = true

const ReactDOM = useMini ? MiniReactDOM : _ReactDOM
const Component = useMini ? MiniComponent : _Component

export { ReactDOM, Component }
