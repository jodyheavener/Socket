let Socketio = require("socket.io");

let Socket = class {

  constructor(server) {
    if (!server) return console.error("Socket instance requires `server` argument");

    this.events = {};
    this.connections = [];

    this.io = Socketio.listen(server);

    this.io.sockets.on("connection", (connection) => {
      let socket = new Socket.Connection(connection);

      this.connections.push(socket);

      connection.on("message", (data) => {
        socket.trigger("message", [ data, socket ]);
        this.trigger("message", [ data, socket ]);
      });

      connection.on("disconnect", () => {
        this.trigger("disconnect", [ socket.aliases ]);
        this.remove(socket);
      });

      this.trigger("connection", [ socket ]);
    });

    return this;
  };

  on(eventName, callback) {
    this.events[eventName] = callback;

    return this;
  };

  trigger(eventName, data) {
    if (this.events[eventName]) this.events[eventName].apply(this, data);

    return this;
  };

  find(key, value) {
    return this.connections.filter((connection) => {
      return connection.hasAlias(key, value);
    })[0];
  };

  remove(socket) {
    let socketIndex = this.connections.indexOf(socket);

    if (socketIndex !== -1) this.connections.splice(socketIndex, 1);

    return this;
  };

};

Socket.Connection = class {

  constructor(socket) {
    this.connection = socket;

    this.events = {};
    this.aliases = {};

    return this;
  };

  on(eventName, callback) {
    this.events[eventName] = callback;
    return this;
  };

  trigger(eventName, data) {
    if (this.events[eventName]) this.events[eventName].apply(this, data);

    return this;
  };

  addAlias(key, value) {
    this.aliases[key] = value;

    return this;
  };

  hasAlias(key, value) {
    return (this.aliases[key] != null && this.aliases[key] === value);
  };

  send(data) {
    this.connection.send(data);

    return this;
  };

  isConnected() {
    return this.connection.connected === true && this.connection.disconnected === false;
  };

};

module.exports = Socket;
