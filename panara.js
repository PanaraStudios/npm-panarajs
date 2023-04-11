const { Store } = require("./store");
const { createElement, render } = require("./vdom");
const { renderToString } = require("./ssr");


class Panara {
  constructor(rootComponent, store) {
    this.rootComponent = rootComponent;
    this.store = store;
  }

  render(element) {
    this.rootComponent.mount(element);
  }

  renderToString() {
    const vnode = this.rootComponent.render();
    return renderToString(vnode);
  }
  }
  
  class Component {
    constructor(props) {
      this.props = props;
    }
  
    mount(element) {
      this.element = element;
      this.update();
    }
  
    update() {
      const newRender = this.render();
      this.element.innerHTML = "";
      this.element.appendChild(render(newRender));
    }
  }
  
  module.exports = { Panara, Component, createElement };
  