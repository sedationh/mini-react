import { Component } from "./WhichReact"

class ClassComp extends Component {
  render() {
    return (
      <div>
        <h1>ClassComp</h1>
      </div>
    )
  }
}

function App() {
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
