'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  once(event, callback) {
    const onceWrapper = this.buildOnceWrapper(event, callback);

    this.on(event, onceWrapper);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((c) => c !== callback);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((c) => {
        c(...args);
      });
    }
  }

  prependListener(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(callback);
  }

  prependOnceListener(event, callback) {
    const onceWrapper = this.buildOnceWrapper(event, callback);

    this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }

  buildOnceWrapper(event, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper);
    };

    return onceWrapper;
  }
}

module.exports = MyEventEmitter;
