function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot
}

ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot
  console.log("sedationh render", root, children)
}

function createRoot(container) {
  const root = { containerInfo: container }

  return new ReactDOMRoot(root)
}

export default { createRoot }
