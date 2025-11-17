import '@testing-library/jest-dom'

// Polyfill for Request/Response in Node.js test environment
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init = {}) {
      this.url = typeof input === 'string' ? input : input.url;
      this.method = init.method || 'GET';
      this.headers = new Map(Object.entries(init.headers || {}));
      this._body = init.body;
    }
    
    async json() {
      if (this._body) {
        return typeof this._body === 'string' ? JSON.parse(this._body) : this._body;
      }
      return {};
    }
  };
}

