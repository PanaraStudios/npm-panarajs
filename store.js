class Store {
    constructor(initialState = {}) {
      this.state = initialState;
      this.listeners = [];
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
    }
  
    updateState(updater) {
      this.state = updater(this.state);
      this.notify();
    }
  
    notify() {
      this.listeners.forEach((listener) => listener());
    }
  }
  
  module.exports = { Store };
  