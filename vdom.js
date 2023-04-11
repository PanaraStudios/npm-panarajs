function createElement(type, props, ...children) {
    return {
      type,
      props: { ...props, children },
    };
  }
  
  function render(vnode) {
    if (typeof vnode === "string") {
      return document.createTextNode(vnode);
    }
  
    const element = document.createElement(vnode.type);
    for (let prop in vnode.props) {
      if (prop === "children") {
        vnode.props.children.forEach((child) => {
          element.appendChild(render(child));
        });
      } else {
        element.setAttribute(prop, vnode.props[prop]);
      }
    }
  
    return element;
  }
  
  module.exports = { createElement, render };
  