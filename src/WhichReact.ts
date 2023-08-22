// @ts-nocheck

import _ReactDOM from "react-dom/client"
import MiniReactDOM from "../mini-react/react-dom"
import { Component as _Component, useReducer as _useReducer, useState as _useState } from "react"
import { Component as MiniComponent, useReducer as MiniUseReducer, useState as MiniUseState } from "../mini-react/react"

const useMini = true

const ReactDOM = useMini ? MiniReactDOM : _ReactDOM
const Component = useMini ? MiniComponent : _Component

const useReducer = useMini ? MiniUseReducer : _useReducer
const useState = useMini ? MiniUseState : _useState

export { ReactDOM, Component, useReducer, useState }
