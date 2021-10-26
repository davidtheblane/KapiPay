const soap = require('soap');

class Soap {
  constructor(url) {
    this.url = url;
  }

  async connection() {
    const url = this.url;
    return soap.createClientAsync(url)
  }

  async request(connection, method, body) {
    return await connection[method](body)
  }
}

module.exports = Soap;