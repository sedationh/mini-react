import { Component, useReducer, useState } from "./WhichReact"

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

  const [cnt2, dispatchCnt2] = useReducer((state, action) => {
    console.log("sedationh action", action, n++)
    return state + 2
  }, 0)

  const [cnt3, setCnt3] = useState(0)

  return (
    <div>
      <h1>FunctionComp</h1>
      <button
        onClick={() => {
          dispatchCnt("action")
        }}
      >
        dispatchCnt cnt1
      </button>
      {cnt}
      <hr />
      <button
        onClick={() => {
          dispatchCnt2("action")
        }}
      >
        dispatchCnt cnt2
      </button>
      {cnt2}
      <hr />
      <button
        onClick={() => {
          setCnt3((v) => v + 1)
        }}
      >
        setCnt3(cnt3 + 1)
      </button>
      {cnt3}
      <hr />
    </div>
  )
}

function App() {
  // return <FunctionComp />

  return (
    <div>
      <h1>App</h1>
      <a href="https://baidu.com">baidu</a>
      有其他同级元素的文本
      {/* @ts-ignore */}
      <ClassComp />
      <FunctionComp />
      <FunctionComp />
      <>
        hi
        {/* <h1>2</h1> */}
      </>
    </div>
  )
}

export default App
