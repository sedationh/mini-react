// @ts-nocheck

import _ReactDOM from "react-dom/client"
import MiniReactDOM from "../mini-react/react-dom"
import { Component as _Component, useReducer as _useReducer } from "react"
import { Component as MiniComponent, useReducer as MiniUseReducer } from "../mini-react/react"

const useMini = true

const ReactDOM = useMini ? MiniReactDOM : _ReactDOM
const Component = useMini ? MiniComponent : _Component

const useReducer = useMini ? MiniUseReducer : _useReducer

export { ReactDOM, Component, useReducer }
