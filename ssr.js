const { render } = require("./vdom");

function renderToString(vnode) {
  if (typeof vnode === "string") {
    return vnode;
  }

  let attributes = "";
  for (let prop in vnode.props) {
    if (prop === "children") {
      continue;
    } else {
      attributes += ` ${prop}="${vnode.props[prop]}"`;
    }
  }

  const children = vnode.props.children
    .map((child) => renderToString(child))
    .join("");

  return `<${vnode.type}${attributes}>${children}</${vnode.type}>`;
}

module.exports = { renderToString };
