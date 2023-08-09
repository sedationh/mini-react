// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import _ReactDOM from "react-dom/client"
import MiniReactDOM from '../mini-react/react-dom'

const useMini = true

const ReactDOM = useMini ? MiniReactDOM : _ReactDOM

export {ReactDOM}
