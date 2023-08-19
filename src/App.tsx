import { Component, useReducer } from "./WhichReact"

let n = 1

class ClassComp extends Component {
  render() {
    return (
      <div>
        <h1>ClassComp</h1>
      </div>
    )
  }
}

function FunctionComp() {
  const [cnt, dispatchCnt] = useReducer((state, action) => {
    console.log("sedationh action", action, n++)
    return state + 1
  }, 0)
  return (
    <div>
      <button
        onClick={() => {
          dispatchCnt("action")
        }}
      >
        dispatchCnt
      </button>
      {cnt}
      <h1>FunctionComp</h1>
    </div>
  )
}

function App() {
  return <FunctionComp />

  return (
    <div>
      <h1>App</h1>
      <a href="https://baidu.com">baidu</a>
      有其他同级元素的文本
      {/* @ts-ignore */}
      <ClassComp />
      <>
        hi
        {/* <h1>2</h1> */}
      </>
    </div>
  )
}

export default App
